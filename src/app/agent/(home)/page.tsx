"use client";
import DocumentationSection from "@/app/agent/(home)/documentation/DocumentationSection";
import CallTranscription from "@/app/agent/(home)/transcription/CallTranscription";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function Home() {
    const [refreshDocs, setRefreshDocs] = useState(false);
    const [lastJobId, setLastJobId] = useState<string | null>(null);

    const handleUploadSuccess = (job_id: string) => {
        setLastJobId(job_id);
        setRefreshDocs(prev => !prev);
    };

    return (
        <div className="flex flex-row h-screen p-2 gap-2">
            <div className="flex flex-col gap-2 w-3/4 h-full">
                <ScrollArea className="h-screen border border-gray-200 rounded-md">
                    <DocumentationSection refreshTrigger={refreshDocs} lastJobId={lastJobId} />
                </ScrollArea>
            </div>

            <ScrollArea className="flex-grow border border-gray-200 rounded-md">
                <CallTranscription onUploadSuccess={handleUploadSuccess} />
            </ScrollArea>
        </div>
    );
}