// hooks/useDocuments.ts
import { useEffect, useState } from 'react';
import { documentData } from '../data/documentData';
import {CompanyDocumentType} from "@/app/company/document/type/CompanyDocumentType";

export const useFetchDocuments = () => {
    const [documents, setDocuments] = useState<CompanyDocumentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                setDocuments(documentData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load documents');
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    return { documents, loading, error };
};