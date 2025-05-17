export type CompanyDocumentType = {
    id: number;
    document_name: string;
    document_type: string;
    file?: File;
    file_url?: string; // For displaying existing files
    created_at: string;
}