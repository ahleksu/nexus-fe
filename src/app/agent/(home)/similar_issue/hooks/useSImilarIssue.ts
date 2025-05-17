/* eslint-disable @typescript-eslint/no-unused-vars */
// hooks/useSimilarIssues.ts
import { useEffect, useState } from 'react';
import {SimilarIssue} from "@/app/agent/(home)/similar_issue/type/SimilarIssueType";
import {similarIssuesData} from "@/app/agent/(home)/similar_issue/data/similarIssueTypes";

export const useSimilarIssues = () => {
    const [similarIssues, setSimilarIssues] = useState<SimilarIssue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate API call
        const fetchSimilarIssues = async () => {
            try {
                setLoading(true);
                // In real app, this would be an API call:
                // const response = await fetch('/api/similar-issues');
                // const data = await response.json();

                // Using mock data for now
                setTimeout(() => {
                    setSimilarIssues(similarIssuesData);
                    setLoading(false);
                }, 500);
            } catch (err) {
                setError('Failed to fetch similar issues');
                setLoading(false);
            }
        };

        fetchSimilarIssues();
    }, []);

    return { similarIssues, loading, error };
};