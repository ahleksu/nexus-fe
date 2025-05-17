import {useEffect, useState} from "react";
import {documentData} from "@/app/agent/(home)/documentation/data/DocumentData";

export const usefetchDocumentHooks = () => {
    const [documents, setDocuments] = useState<Documentation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllDocs = async () => {
            try {
                setLoading(true);
                // In a real implementation:
                // const response = await fetch('/api/documents');
                // const data = await response.json();

                // Using hardcoded data:
                setDocuments(documentData);
            } catch (err) {
                setError('Failed to fetch documents');
            } finally {
                setLoading(false);
            }
        };

        fetchAllDocs();
    }, []);

    return { documents, loading, error };
};