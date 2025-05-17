export type SimilarIssue = {
    title: string;
    content: string;
    id: string;
    agent_name: string;
    created_at: string;
    status: 'open' | 'resolved' | 'pending';
    similarity_score: number;
}