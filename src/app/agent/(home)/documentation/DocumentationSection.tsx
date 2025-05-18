"use client";
import DocumentCard from "@/app/agent/(home)/documentation/component/DocumentCard";
import { useEffect, useState } from "react";
import { useFetchDocumentHooks } from "@/app/agent/(home)/documentation/hooks/useFetchDocumentHooks";

type DocumentationSectionProps = {
    refreshTrigger?: boolean;
    lastJobId?: string | null;
};

const DocumentationSection = ({ refreshTrigger, lastJobId }: DocumentationSectionProps) => {
    const { documents, loading, error, refetch } = useFetchDocumentHooks();
    const [pollingJobId, setPollingJobId] = useState<string | null>(null);
    const [isPolling, setIsPolling] = useState(false);
    const [hasResponse, setHasResponse] = useState(false);

    // Handle initial refresh trigger
    useEffect(() => {
        if (refreshTrigger && lastJobId) {
            setPollingJobId(lastJobId);
            setIsPolling(true);
            setHasResponse(false);
            refetch(lastJobId);
        }
    }, [refreshTrigger, lastJobId, refetch]);

    // Polling effect
    useEffect(() => {
        if (!pollingJobId || !isPolling) return;

        const interval = setInterval(async () => {
            try {
                await refetch(pollingJobId);

                // Check if we have a valid document now
                if (documents.length > 0 && documents[0].content) {
                    setHasResponse(true);
                    setIsPolling(false);
                }
            } catch (error) {
                console.error("Polling error:", error);
                setIsPolling(false);
            }
        }, 5000);

        // Clean up interval if we have response or component unmounts
        if (hasResponse) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [pollingJobId, isPolling, refetch, documents, hasResponse]);

    // Stop polling when we have a response
    useEffect(() => {
        if (hasResponse) {
            setIsPolling(false);
        }
    }, [hasResponse]);

    if (loading) return <div>Loading documents...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col w-full rounded-md gap-2 text-4xl p-4">
            <h4 className="text-sm px-2 py-1 text-slate-700 font-bold bg-blue-50 w-fit rounded-2xl">
                Documentation
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-4">
                {documents.map((doc) => (
                    <DocumentCard key={doc.id} doc={doc} />
                ))}
            </div>
        </div>
    );
};

export default DocumentationSection;