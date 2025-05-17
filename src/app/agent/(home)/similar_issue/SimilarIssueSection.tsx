"use client"

import { Skeleton } from "@/components/ui/skeleton";
import SimilarIssueCard from "@/app/agent/(home)/similar_issue/component/SimilarIssueCardComponent";
import {useSimilarIssues} from "@/app/agent/(home)/similar_issue/hooks/useSImilarIssue";

const SimilarIssueSection = () => {
    const { similarIssues, loading, error } = useSimilarIssues();

    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full space-y-2 px-4 pt-1 h-full">
            <h2 className="text-xs bg-blue-100 rounded-2xl px-2 py-1 w-fit font-bold">Similar Issues</h2>

            {loading ? (
                <div className="flex space-x-4 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-32 w-64 flex-shrink-0 rounded-lg" />
                    ))}
                </div>
            ) : (
                <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
                    {similarIssues.map((issue) => (
                        <div key={issue.id} className="flex-shrink-0 w-64">
                            <SimilarIssueCard issue={issue} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SimilarIssueSection;