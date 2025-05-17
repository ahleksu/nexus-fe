// types/callTranscriptionTypes.ts
export type CallTranscriptionType = {
    timestamp: string;
    agent_name: string;
    content: string;
    id: string;
    role: 'agent' | 'customer';
    sentiment?: 'positive' | 'neutral' | 'negative';
}