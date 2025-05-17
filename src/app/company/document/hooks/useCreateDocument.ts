// hooks/useCreateDocument.ts
import { useState } from "react";
import {CompanyDocumentType} from "@/app/company/document/type/CompanyDocumentType";

export const useCreateDocument = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createDocument = async (documentData: Omit<CompanyDocumentType, 'id' | 'created_at'> & {
        id?: number,
        created_at?: string
    }) => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate API call with file upload
            console.log("Preparing to upload document...");
            console.log("Document data:", {
                ...documentData,
                file: documentData.file ? documentData.file.name : "No file",
            });

            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real app, this would be:
            // const formData = new FormData();
            // formData.append('document_name', documentData.document_name);
            // formData.append('document_type', documentData.document_type);
            // if (documentData.file) {
            //   formData.append('file', documentData.file);
            // }
            //
            // const response = await fetch('/api/documents', {
            //   method: 'POST',
            //   body: formData,
            // });
            //
            // if (!response.ok) throw new Error('Upload failed');
            //
            // const data = await response.json();

            const newDocument: CompanyDocumentType = {
                ...documentData,
                id: documentData.id || Math.floor(Math.random() * 10000),
                created_at: documentData.created_at || new Date().toISOString(),
                file_url: URL.createObjectURL(documentData.file!), // For demo purposes
            };

            console.log("Document uploaded successfully:", newDocument);
            return newDocument;
        } catch (err) {
            setError("Failed to upload document");
            console.error("Error uploading document:", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { createDocument, isLoading, error };
};