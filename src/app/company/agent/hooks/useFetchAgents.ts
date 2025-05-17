import { useEffect, useState } from 'react';
import {agentData} from "@/app/company/agent/data/agentData";
export const useFetchAgents = () => {
    const [agents, setAgents] = useState<AgentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                setLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                setAgents(agentData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load agents');
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);

    return { agents, loading, error };
};