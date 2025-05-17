// components/DocumentTableSection.tsx
"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {useFetchDocuments} from "@/app/company/document/hooks/useFetchDocument";
import {CreateDocumentDialog} from "@/app/company/document/component/CreateDocumentDialog";

const DocumentTableSection = () => {
    const { documents, loading, error } = useFetchDocuments();

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="flex w-full justify-between items-center">
                <h2 className="text-lg font-bold">Documents</h2>
                <CreateDocumentDialog/>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Document Name</TableHead>
                        <TableHead>Document Type</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5}>
                                <div className="space-y-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton key={i} className="h-10 w-full" />
                                    ))}
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        documents.map((document) => (
                            <TableRow key={document.id}>
                                <TableCell>{document.id}</TableCell>
                                <TableCell className="font-medium">{document.document_name}</TableCell>
                                <TableCell>{document.document_type}</TableCell>
                                <TableCell>{document.created_at}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm">Download</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default DocumentTableSection;