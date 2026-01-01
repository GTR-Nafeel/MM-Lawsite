import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button, InputGroup, FormControl, Spinner, Alert } from "react-bootstrap";
import { FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFPreview({ selectedDoc }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState(1);
  const [inputError, setInputError] = useState(false);
  const [scale, setScale] = useState(1.0);
  const pageInputRef = useRef();

  useEffect(() => {
    setPageNumber(1);
    setPageInput(1);
    setInputError(false);
    setScale(1.0);
  }, [selectedDoc]);

  const handleGoToPage = () => {
    if (!numPages) return;
    const page = Number(pageInput);
    if (Number.isInteger(page) && page >= 1 && page <= numPages) {
      setPageNumber(page);
      setInputError(false);
    } else {
      setInputError(true);
      setTimeout(() => setInputError(false), 500);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  };

  if (!selectedDoc) {
    return (
      <Alert variant="info" className="text-center">
        Select a document to preview 📄
      </Alert>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3 flex-wrap">
        <InputGroup style={{ width: 120 }} hasValidation>
          <FormControl
            type="number"
            min={1}
            max={numPages || 1}
            value={pageInput}
            onChange={e => setPageInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            ref={pageInputRef}
            isInvalid={inputError}
          />
          <Button variant="primary" onClick={handleGoToPage}>
            Go
          </Button>
        </InputGroup>

        <span className="text-muted">/ {numPages || 1}</span>

        <Button
          variant="outline-secondary"
          onClick={() => window.open(selectedDoc.url, "_blank")}
        >
          Open Full PDF
        </Button>

        <Button variant="outline-primary" onClick={handleZoomIn}>
          <FaSearchPlus />
        </Button>

        <Button variant="outline-primary" onClick={handleZoomOut}>
          <FaSearchMinus />
        </Button>
      </div>

      <h5 className="mb-3 text-primary">Preview: {selectedDoc.title}</h5>

      <div className="d-flex justify-content-center mb-3">
        <Document
          file={selectedDoc.url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<Spinner animation="border" variant="primary" />}
          error={<Alert variant="danger">Failed to load PDF 😢</Alert>}
        >
          <Page
            pageNumber={pageNumber}
            width={320}
            scale={scale}
            loading={<Spinner animation="border" variant="secondary" />}
          />
        </Document>
      </div>
    </div>
  );
}
