import re
import os
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.models import Document, DocumentChunk, Standard, StandardClause

class DocumentParser:
    @staticmethod
    def extract_text_from_file(file_path: str) -> str:
        """Extract plain text from file (TXT, MD, or raw stream)."""
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()
        except Exception as e:
            return f"Error reading file: {str(e)}"

    @staticmethod
    def parse_clauses(text: str) -> List[Dict[str, Any]]:
        """
        Detects standard clauses using regex patterns like:
        Clause 4.1, 5.2, Section 3.1, or numbering like 5.1.2
        """
        clauses = []
        clause_pattern = re.compile(r'(?:(?:Clause|Section)\s+)?(\d+\.\d+(?:\.\d+)?)\s*[:\-\—]?\s*([^\n\r]+)', re.IGNORECASE)
        lines = text.split('\n')
        
        current_clause = "General"
        current_title = "Introductory Provisions"
        current_content = []
        page = 1

        for line in lines:
            line_str = line.strip()
            if not line_str:
                continue
            
            # Simple page marker detection
            if "Page" in line_str and re.search(r'Page\s+\d+', line_str):
                try:
                    page = int(re.search(r'\d+', line_str).group())
                except:
                    pass
                continue

            match = clause_pattern.match(line_str)
            if match:
                if current_content:
                    clauses.append({
                        "clause_number": current_clause,
                        "title": current_title,
                        "content": " ".join(current_content),
                        "page": page
                    })
                    current_content = []
                current_clause = f"Clause {match.group(1)}"
                current_title = match.group(2)[:100]
            else:
                current_content.append(line_str)

        if current_content:
            clauses.append({
                "clause_number": current_clause,
                "title": current_title,
                "content": " ".join(current_content),
                "page": page
            })

        return clauses

    @classmethod
    def ingest_document(
        cls,
        title: str,
        document_type: str,
        file_path: str,
        is_number: Optional[str],
        db: Session
    ) -> Document:
        file_size = os.path.getsize(file_path) if os.path.exists(file_path) else 0
        doc = Document(
            title=title,
            document_type=document_type,
            is_number=is_number,
            file_path=file_path,
            file_size=file_size,
            status="Processing"
        )
        db.add(doc)
        db.commit()
        db.refresh(doc)

        text = cls.extract_text_from_file(file_path)
        clauses = cls.parse_clauses(text)

        # Create chunks
        for idx, cl in enumerate(clauses):
            chunk = DocumentChunk(
                document_id=doc.id,
                clause_number=cl["clause_number"],
                page_number=cl["page"],
                chunk_index=idx,
                content=f"{cl['clause_number']}: {cl['title']}\n{cl['content']}",
                embedding_json=None
            )
            db.add(chunk)

        doc.status = "Processed"
        db.commit()
        db.refresh(doc)
        return doc

document_parser = DocumentParser()
