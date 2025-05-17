// hooks/useFetchCallSession.ts
import { useEffect, useState } from 'react';
import {CallSessionType} from "@/app/company/call_session/type/CallSessionType";
import {callSessionData} from "@/app/company/call_session/data/callSessionData";

export const useFetchCallSession = () => {
    const [sessions, setSessions] = useState<CallSessionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                setSessions(callSessionData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load call sessions');
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    return { sessions, loading, error };
};