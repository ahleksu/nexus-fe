"use client";
import DocumentCard from "@/app/agent/(home)/documentation/component/DocumentCard";
import { useEffect, useState } from "react";
import { useFetchDocumentHooks } from "@/app/agent/(home)/documentation/hooks/useFetchDocumentHooks";

type Document = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    type: string;
    jobId?: string;
};

type DocumentationSectionProps = {
    refreshTrigger?: boolean;
    lastJobId?: string | null;
};

const DocumentationSection = ({ refreshTrigger, lastJobId }: DocumentationSectionProps) => {
    const { documents, loading, error, refetch } = useFetchDocumentHooks();
    const [pollingJobId, setPollingJobId] = useState<string | null>(null);
    const [isPolling, setIsPolling] = useState(false);
    const [savedDocs, setSavedDocs] = useState<Document[]>([]);

    // Handle initial refresh trigger and load saved docs
    useEffect(() => {
        if (refreshTrigger && lastJobId) {
            setPollingJobId(lastJobId);
            setIsPolling(true);

            // Load from localStorage
            try {
                const saved = localStorage.getItem(`docs-${lastJobId}`);
                if (saved) {
                    const parsed = JSON.parse(saved) as Document[];
                    setSavedDocs(parsed);
                }
            } catch (e) {
                console.error("Failed to load from localStorage", e);
            }

            refetch(lastJobId);
        }
    }, [refreshTrigger, lastJobId, refetch]);

    // Save new documents to state and localStorage
    useEffect(() => {
        if (documents.length > 0 && pollingJobId) {
            const newDoc = {
                ...documents[0],
                jobId: pollingJobId // Include jobId in the document
            };

            setSavedDocs(prev => {
                // Check if this content already exists
                const exists = prev.some(doc => doc.content === newDoc.content);
                if (exists) return prev;

                // Save to localStorage
                try {
                    const updated = [...prev, newDoc];
                    localStorage.setItem(`docs-${pollingJobId}`, JSON.stringify(updated));
                    return updated;
                } catch (e) {
                    console.error("Failed to save to localStorage", e);
                    return prev;
                }
            });
        }
    }, [documents, pollingJobId]);

    // Polling effect
    useEffect(() => {
        if (!pollingJobId || !isPolling) return;

        const interval = setInterval(async () => {
            try {
                await refetch(pollingJobId);
            } catch (error) {
                console.error("Polling error:", error);
                setIsPolling(false);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [pollingJobId, isPolling, refetch]);

    // Combine and filter documents
    const allDocuments = [...savedDocs];
    if (documents.length > 0) {
        const newDoc = documents[0];
        if (!allDocuments.some(doc => doc.content === newDoc.content)) {
            allDocuments.push(newDoc);
        }
    }

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col w-full rounded-md gap-2 text-4xl p-4">
            <h4 className="text-sm px-2 py-1 text-slate-700 font-bold bg-blue-50 w-fit rounded-2xl">
                Documentation
            </h4>
            {
                loading ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <p className="text-sm text-gray-500">Loading...</p>
                    </div>
                ) : allDocuments.length === 0 ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <p className="text-gray-500">No documents available</p>
                    </div>
                ) : null
            }
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-4">
                {allDocuments.map((doc, index) => (
                    <DocumentCard
                        key={`${doc.id}-${index}-${doc.jobId || ''}`}
                        doc={doc}
                    />
                ))}
            </div>
        </div>
    );
};

export default DocumentationSection;