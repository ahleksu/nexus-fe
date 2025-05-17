/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const markdownPlugins = [remarkGfm];

export const markdownComponents: Components = {
    // Text elements
    p: ({node, ...props}) => <p className="text-xs text-gray-700 mb-2" {...props} />,
    a: ({node, ...props}) => <a className="text-xs text-blue-500 hover:underline" {...props} />,
    strong: ({node, ...props}) => <strong className="text-xs font-semibold" {...props} />,
    em: ({node, ...props}) => <em className="text-xs italic" {...props} />,
    blockquote: ({node, ...props}) => (
        <blockquote className="text-xs border-l-4 border-gray-300 pl-3 text-gray-600 my-2" {...props} />
    ),
    del: ({node, ...props}) => <del className="text-xs line-through" {...props} />,

    // Headings
    h1: ({node, ...props}) => <h1 className="text-sm font-bold mt-4 mb-2" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-sm font-bold mt-3 mb-1.5" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-xs font-bold mt-3 mb-1" {...props} />,
    h4: ({node, ...props}) => <h4 className="text-xs font-bold mt-2 mb-1" {...props} />,
    h5: ({node, ...props}) => <h5 className="text-xs font-bold mt-2 mb-1" {...props} />,
    h6: ({node, ...props}) => <h6 className="text-xs font-bold mt-2 mb-1" {...props} />,

    // Lists
    ul: ({node, ...props}) => <ul className="text-xs list-disc pl-5 my-1" {...props} />,
    ol: ({node, ...props}) => <ol className="text-xs list-decimal pl-5 my-1" {...props} />,
    li: ({node, ...props}) => <li className="text-xs mb-0.5" {...props} />,

    code: ({node, inline, className, children, ...props}: any) => {
        if (inline) {
            return (
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded" {...props}>
                    {children}
                </code>
            );
        }
        return (
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto my-2">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
        );
    },

    // Tables
    table: ({node, ...props}) => <table className="text-xs border-collapse my-2 w-full" {...props} />,
    thead: ({node, ...props}) => <thead className="bg-gray-50" {...props} />,
    tbody: ({node, ...props}) => <tbody {...props} />,
    tr: ({node, ...props}) => <tr className="border-b border-gray-200" {...props} />,
    th: ({node, ...props}) => <th className="text-xs font-semibold p-2 text-left" {...props} />,
    td: ({node, ...props}) => <td className="text-xs p-2" {...props} />,

    // Thematic break
    hr: ({node, ...props}) => <hr className="my-3 border-gray-200" {...props} />,

    // Images
    img: ({node, ...props}) => <img className="text-xs max-w-full h-auto my-2" {...props} alt={"test"} />,
};

