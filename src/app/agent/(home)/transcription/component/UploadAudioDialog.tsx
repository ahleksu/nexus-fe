// components/UploadAudioDialog.tsx
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
import {useUploadRecord} from "@/app/agent/(home)/transcription/hooks/useUploadTranscription";

type Props = {
    onUploadSuccess: (job_id: string) => void;
}

export function UploadAudioDialog({ onUploadSuccess }: Props) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        audio_name: "",
        file: null as File | null,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { uploadRecord, isLoading } = useUploadRecord();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!file.type.startsWith('audio/') && !['.mp3', '.wav', '.ogg', '.m4a'].some(ext => file.name.endsWith(ext))) {
                setErrors(prev => ({ ...prev, file: "Please upload a valid audio file" }));
                return;
            }
            setFormData(prev => ({ ...prev, file }));
            if (errors.file) {
                setErrors(prev => ({ ...prev, file: "" }));
            }
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.audio_name.trim()) newErrors.audio_name = "Audio name is required";
        if (!formData.file) newErrors.file = "Audio file is required";
        else if (formData.file.size > 50 * 1024 * 1024) {
            newErrors.file = "File size must be less than 50MB";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await uploadRecord({
                audio_name: formData.audio_name,
                file: formData.file!
            });

            onUploadSuccess(response.job_id);
            setOpen(false);
            setFormData({ audio_name: "", file: null });
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to upload audio:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Upload Audio</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Audio for Transcription</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="audio_name">Audio Name</Label>
                        <Input
                            id="audio_name"
                            name="audio_name"
                            value={formData.audio_name}
                            onChange={handleChange}
                            placeholder="e.g., Customer Call - June 2023"
                        />
                        {errors.audio_name && (
                            <p className="text-sm text-red-500">{errors.audio_name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="file">Audio File</Label>
                        <Input
                            id="file"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="cursor-pointer"
                            accept="audio/*,.mp3,.wav,.ogg,.m4a"
                        />
                        {errors.file && (
                            <p className="text-sm text-red-500">{errors.file}</p>
                        )}
                        {formData.file && (
                            <div className="text-sm text-gray-600">
                                <p>Selected: {formData.file.name}</p>
                                <p>Size: {(formData.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                            </div>
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
                            {isLoading ? "Uploading..." : "Upload Audio"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}