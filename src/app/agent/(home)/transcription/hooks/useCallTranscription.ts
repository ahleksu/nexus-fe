// hooks/useCallTranscription.ts
import { useEffect, useState } from 'react';
import {CallTranscriptionType} from "@/app/agent/(home)/transcription/type/CallTranscriptionType";
import {callTranscriptionData} from "@/app/agent/(home)/transcription/data/callTranscriptionData";

export const useCallTranscription = () => {
    const [transcriptions, setTranscriptions] = useState<CallTranscriptionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTranscriptions = async () => {
            try {
                setLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                setTranscriptions(callTranscriptionData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load transcriptions');
                setLoading(false);
            }
        };

        fetchTranscriptions();
    }, []);

    return { transcriptions, loading, error };
};