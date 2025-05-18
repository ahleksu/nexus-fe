"use client";
import { useState, useEffect, useCallback } from "react";

type Document = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    type: 'assistant';
    status?: 'processing' | 'completed'; // Add status field for polling
};

export const useFetchDocumentHooks = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [assistantResponse, setAssistantResponse] = useState<string | null>(null);

    const fetchAssistantResponse = useCallback(async (jobId: string): Promise<{response: string, status?: string}> => {
        try {
            const response = await fetch(`https://nexus.hwork.ph/transcribe/helper/${jobId}`);
            if (!response.ok) throw new Error('Failed to fetch assistant response');
            const data = await response.json();
            return {
                response: data.assistant_response,
                status: data.status // Assuming API returns status
            };
        } catch (err) {
            throw err;
        }
    }, []);

    const fetchDocuments = useCallback(async (jobId?: string) => {
        try {
            setLoading(true);

            let assistantDoc: Document | null = null;
            if (jobId) {
                try {
                    const { response } = await fetchAssistantResponse(jobId);
                    assistantDoc = {
                        id: `assistant-${jobId}`,
                        title: 'AI Suggestions',
                        content: response,
                        createdAt: new Date().toISOString(),
                        type: 'assistant',
                    };
                    setAssistantResponse(response);
                } catch (err) {
                    console.error("Failed to fetch assistant response:", err);
                }
            }

            setDocuments(assistantDoc ? [assistantDoc] : []);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [fetchAssistantResponse]);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    return {
        documents,
        loading,
        error,
        assistantResponse,
        refetch: fetchDocuments
    };
};