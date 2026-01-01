# core/urls.py
from django.urls import path
from . import views


urlpatterns = [
    path('superadmin/dashboard/', views.superadmin_dashboard, name='superadmin_dashboard'),
    path('admin/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('user/', views.user_dashboard, name='user_dashboard'),  
    path('documents/', views.get_all_documents, name='get_all_documents'),
    path('documents/serve/<str:category>/<str:filename>', views.serve_document, name='serve_document'),
]

