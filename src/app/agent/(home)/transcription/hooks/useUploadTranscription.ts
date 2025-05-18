import { useState } from 'react';

export const useUploadRecord = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadRecord = async (data: { audio_name: string; file: File }) => {
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('audio_name', data.audio_name);
            formData.append('file', data.file);

            const response = await fetch('https://nexus.hwork.ph/transcribe/', {
                method: 'POST',
                body: formData,
                // Don't set Content-Type header - let the browser set it with boundary
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result; // { message, job_id, status_check }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to upload audio');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { uploadRecord, isLoading, error };
};