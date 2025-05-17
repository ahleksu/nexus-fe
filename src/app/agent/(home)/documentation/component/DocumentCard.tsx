import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {markdownComponents} from "@/components/mdStyle";

type DocumentCardProps = {
    doc: Documentation;
}

const DocumentCard = ({ doc }: DocumentCardProps) => {
    const { title, content, rank } = doc;

    return (
        <div className="flex flex-col justify-between w-full h-full bg-white rounded-lg p-4 border hover:shadow-md transition-shadow">
            <div className="prose prose-sm max-w-none">
                <h2 className="text-sm font-bold mb-2">{title}</h2>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                >
                    {content}
                </ReactMarkdown>
            </div>
            <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">Rank: {rank}</span>
            </div>
        </div>
    );
};

export default DocumentCard;