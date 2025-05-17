import DocumentCard from "@/app/agent/(home)/documentation/component/DocumentCard";
import {usefetchDocumentHooks} from "@/app/agent/(home)/documentation/hooks/usefetchDocumentHooks";


const DocumentationSection = () => {
    const { documents, loading, error } = usefetchDocumentHooks();

    if (loading) return <div>Loading documents...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col w-full rounded-md gap-2 text-4xl p-4">
            <h4 className="text-sm px-2 py-1 text-slate-700 font-bold bg-blue-50 w-fit rounded-2xl">Documentation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-4">
                {documents.map((doc) => (
                    <DocumentCard key={doc.title} doc={doc} />
                ))}
            </div>
        </div>
    )
}

export default DocumentationSection;