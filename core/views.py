# core/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.http import JsonResponse
import os
from django.conf import settings
from django.http import HttpResponse
from urllib.parse import unquote

# Superadmin Dashboard View
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def superadmin_dashboard(request):
    if request.user.is_superuser:
        data = {
            "total_users": User.objects.count(),
            "active_users": User.objects.filter(is_active=True).count(),
            "pending_documents": 45,  # Example static data
            "reported_issues": 12,   # Example static data
        }
        return Response({"success": True, "message": "Welcome to the Super Admin Dashboard!", "data": data})
    return Response({"success": False, "message": "Unauthorized access."}, status=403)

# Admin Dashboard View
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):
    if request.user.is_staff:
        data = {
            "total_documents": 320,  # Example static data
            "documents_under_review": 28,  # Example static data
            "support_tickets": 5,  # Example static data
        }
        return Response({"success": True, "message": "Welcome to the Admin Dashboard!", "data": data})
    return Response({"success": False, "message": "Unauthorized access."}, status=403)

# User Dashboard View
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_dashboard(request):
    user = request.user
    data = {
        "username": user.username,
        "email": user.email,
        "is_superuser": user.is_superuser,
        "is_staff": user.is_staff,
    }
    return Response({"success": True, "data": data})

# Get All Documents
@api_view(['GET'])
def get_all_documents(request):
    documents = []
    uploads_folder = 'uploads/'  # assuming the uploads folder is in the same directory as your Django project

    for category in os.listdir(uploads_folder):
        category_folder = os.path.join(uploads_folder, category)
        if os.path.isdir(category_folder):
            for filename in os.listdir(category_folder):
                if filename.endswith('.pdf'):
                    document = {
                        'title': filename,
                        'url': f'http://localhost:8000/api/documents/serve/{category}/{filename}',
                        'category': category,
                    }
                    documents.append(document)

    return JsonResponse(documents, safe=False)

def serve_document(request, category, filename):
    filename = unquote(filename)  # Decode URL-encoded filename
    document_path = os.path.join(settings.BASE_DIR, 'uploads', category, filename)
    if not os.path.exists(document_path):
        return JsonResponse({"success": False, "message": "File not found."}, status=404)
    with open(document_path, 'rb') as document:
        response = HttpResponse(document.read(), content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response