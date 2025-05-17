// components/SimilarIssueCard.tsx

import {SimilarIssue} from "@/app/agent/(home)/similar_issue/type/SimilarIssueType";

type SimilarIssueCardProps = {
    issue: SimilarIssue;
};

const SimilarIssueCard = (props: SimilarIssueCardProps) => {
    const {issue} = props;
    const {title, content, agent_name } = issue;

    return (
        <div className="flex flex-col w-full p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xs font-semibold">{title}</h3>
            </div>
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{content}</p>
            <div className="flex justify-between items-center mt-auto">
                <span className="text-xs text-gray-500">
                    Handled by: {agent_name}
                </span>
            </div>
        </div>
    );
};

export default SimilarIssueCard;