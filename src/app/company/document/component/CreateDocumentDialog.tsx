"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef, ChangeEvent } from "react";
import {useCreateDocument} from "@/app/company/document/hooks/useCreateDocument";

export function CreateDocumentDialog() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        document_name: "",
        document_type: "",
        file: null as File | null,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { createDocument, isLoading } = useCreateDocument();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, file: e.target.files![0] }));
            if (errors.file) {
                setErrors(prev => ({ ...prev, file: "" }));
            }
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.document_name.trim()) newErrors.document_name = "Document name is required";
        if (!formData.document_type.trim()) newErrors.document_type = "Document type is required";
        if (!formData.file) newErrors.file = "File is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const newDocument = {
                ...formData,
                id: Math.floor(Math.random() * 10000), // Temporary ID
                created_at: new Date().toISOString(),
            };

            await createDocument({
                ...newDocument,
                file: newDocument.file ?? undefined,
            });

            setOpen(false);
            setFormData({ document_name: "", document_type: "", file: null });
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to create document:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Document</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload New Document</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="document_name">Document Name</Label>
                        <Input
                            id="document_name"
                            name="document_name"
                            value={formData.document_name}
                            onChange={handleChange}
                        />
                        {errors.document_name && (
                            <p className="text-sm text-red-500">{errors.document_name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="document_type">Document Type</Label>
                        <Input
                            id="document_type"
                            name="document_type"
                            value={formData.document_type}
                            onChange={handleChange}
                        />
                        {errors.document_type && (
                            <p className="text-sm text-red-500">{errors.document_type}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="file">File</Label>
                        <Input
                            id="file"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="cursor-pointer"
                            accept=".pdf, .xls, .xlsx, .csv, .md, .txt"
                        />
                        {errors.file && (
                            <p className="text-sm text-red-500">{errors.file}</p>
                        )}
                        {formData.file && (
                            <p className="text-sm text-gray-600">Selected: {formData.file.name}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Uploading..." : "Upload Document"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}