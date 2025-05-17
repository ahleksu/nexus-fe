// hooks/useCreateAgent.ts
import { useState } from "react";

export const useCreateAgent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createAgent = async (agentData: Omit<AgentType, 'id' | 'created_at'> & { id?: string, created_at?: string }) => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In a real app, this would be:
            // const response = await fetch('/api/agents', {
            //   method: 'POST',
            //   body: JSON.stringify(agentData),
            //   headers: { 'Content-Type': 'application/json' }
            // });
            // const data = await response.json();

            const newAgent: AgentType = {
                ...agentData,
                id: agentData.id || Math.random().toString(36).substring(2, 9),
                created_at: agentData.created_at || new Date().toISOString(),
            };

            console.log("Agent created:", newAgent);
            return newAgent;
        } catch (err) {
            setError("Failed to create agent");
            console.error("Error creating agent:", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { createAgent, isLoading, error };
};