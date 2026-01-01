import React, { useEffect, useState } from "react";
import PDFPreview from "../components/PDFPreview";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Spinner, Card } from "react-bootstrap";

function PDFCard({ doc, onSelect, isSelected }) {
  return (
    <Card
      className={`mb-3 shadow-sm ${isSelected ? "border-primary" : ""}`}
      onClick={() => onSelect(doc)}
      style={{ cursor: "pointer", animation: "fadeIn 0.5s ease-in" }}
    >
      <Card.Body>
        <Card.Title>{doc.title}</Card.Title>
        <Card.Text>
          <small className="text-muted">{doc.category}</small>
        </Card.Text>
        <button
          className="btn btn-outline-primary"
          onClick={(e) => {
            e.stopPropagation();
            window.open(doc.url, "_blank");
          }}
        >
          View
        </button>
      </Card.Body>
    </Card>
  );
}

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("alphabetical");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/documents/")
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
        const uniqueCategories = [...new Set(data.map((doc) => doc.category))];
        setCategories(uniqueCategories);
        setSelectedCategory(uniqueCategories[0] || "");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const docs = documents.filter((doc) => doc.category === selectedCategory);
    let filteredDocs = docs.filter((doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortBy === "alphabetical") {
      filteredDocs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "date") {
      filteredDocs.sort((a, b) => {
        if (!a.date || !b.date) return a.title.localeCompare(b.title);
        return new Date(b.date) - new Date(a.date);
      });
    }
    setFiltered(filteredDocs);
    setSelectedDoc(null);
  }, [searchTerm, documents, sortBy, selectedCategory]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="py-4"></div>
        {/* Search and Sort Controls */}
        <div className="row mb-4 g-3 align-items-center">
          <div className="col-md-4">
            <select
              className="form-select border-primary shadow-sm rounded-pill"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: "0.5rem", fontSize: "1rem" }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control border-primary shadow-sm rounded-pill"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: "0.5rem", fontSize: "1rem" }}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select border-primary shadow-sm rounded-pill"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: "0.5rem", fontSize: "1rem" }}
            >
              <option value="alphabetical">Sort A-Z</option>
              <option value="date">Newest First</option>
            </select>
          </div>
        </div>

        {/* Spinner or Content */}
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="row">
            {/* PDF List */}
            <div className="col-md-3">
              {filtered.length > 0 ? (
                filtered.map((doc) => (
                  <PDFCard
                    key={doc.title}
                    doc={doc}
                    onSelect={setSelectedDoc}
                    isSelected={selectedDoc && selectedDoc.title === doc.title}
                    className="border-primary"
                  />
                ))
              ) : (
                <p>No documents found.</p>
              )}
            </div>

            {/* Preview Panel */}
            <div className="col-md-9 primary">
              <div
                className="bg-white rounded-4 shadow border border-primary p-4 overflow-auto"
                style={{ minHeight: 300, maxHeight: 500 }}
              >
                <h5 className="mb-3 text-muted border-bottom pb-2">📄 Document Preview</h5>
                <PDFPreview selectedDoc={selectedDoc} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
