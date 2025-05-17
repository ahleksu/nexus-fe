// components/CallTranscription.tsx
"use client"


import {useCallTranscription} from "@/app/agent/(home)/transcription/hooks/useCallTranscription";
import {Skeleton} from "@/components/ui/skeleton";
import CallTranscriptionCard from "@/app/agent/(home)/transcription/component/CallTranscriptionCard";

const CallTranscription = () => {
    const { transcriptions, loading, error } = useCallTranscription();

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-4 space-y-2 overflow-y-auto">
            <h2 className="text-sm px-2 py-1 bg-blue-100 w-fit rounded-2xl font-bold mb-4">Call Transcription</h2>

            {loading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-lg" />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col space-y-3">
                    {transcriptions.map((item) => (
                        <CallTranscriptionCard data={item} key={item.id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CallTranscription;