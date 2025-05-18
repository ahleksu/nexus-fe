// components/CallTranscription.tsx
"use client"

import { Skeleton } from "@/components/ui/skeleton";
import CallTranscriptionCard from "@/app/agent/(home)/transcription/component/CallTranscriptionCard";
import { UploadAudioDialog } from "@/app/agent/(home)/transcription/component/UploadAudioDialog";
import { useEffect, useState } from "react";
import { CallTranscriptionType } from "@/app/agent/(home)/transcription/type/CallTranscriptionType";

const CallTranscription = () => {
    const [transcriptions, setTranscriptions] = useState<CallTranscriptionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeJobId, setActiveJobId] = useState<string | null>(null);
    const [isPolling, setIsPolling] = useState(false);

    const handleUploadSuccess = (job_id: string) => {
        setActiveJobId(job_id);
        setIsPolling(true);
    };

    useEffect(() => {
        if (!activeJobId) return;

        const checkTranscriptionStatus = async () => {
            try {
                const response = await fetch(
                    `https://nexus.hwork.ph/transcribe/transcription-status/${activeJobId}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    // This is the final transcription data
                    setTranscriptions(prev => [...data, ...prev]);
                    setActiveJobId(null);
                    setLoading(false);
                    setIsPolling(false);
                } else if (data.status === 'in_progress') {
                    // Still processing, continue polling
                    console.log('Transcription in progress...');
                    setLoading(true);
                    return;
                } else {
                    throw new Error('Unexpected response format');
                }
            } catch (error) {
                console.error('Transcription status check error:', error);
                setError(error instanceof Error ? error.message : 'Failed to check status');
                setActiveJobId(null);
                setIsPolling(false);
            }
        };

        const interval = setInterval(checkTranscriptionStatus, 5000);
        checkTranscriptionStatus(); // Immediate first check

        return () => clearInterval(interval);
    }, [activeJobId]);

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const showSkeleton = loading || isPolling;

    return (
        <div className="flex flex-col h-full p-4 space-y-2 overflow-y-auto">
            <div className="w-full flex justify-between">
                <h2 className="text-sm px-2 py-1 bg-blue-100 w-fit rounded-2xl font-bold mb-4">
                    Call Transcription
                </h2>
                <UploadAudioDialog onUploadSuccess={handleUploadSuccess} />
            </div>

            {showSkeleton ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-lg" />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col space-y-3">
                    {transcriptions.length > 0 ? (
                        transcriptions.map((item) => (
                            <CallTranscriptionCard data={item} key={item.id} />
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-32">
                            <p className="text-gray-500">No transcriptions available</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CallTranscription;