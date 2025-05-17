"use client";

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    DefaultMeetingSession,
    ConsoleLogger,
    LogLevel,
    MeetingSessionConfiguration,
    DefaultDeviceController,
} from 'amazon-chime-sdk-js';

export default function AgentPage() {
    const [meetingId, setMeetingId] = useState('');
    const [status, setStatus] = useState('Ready to start meeting');
    const [isLoading, setIsLoading] = useState(false);
    const meetingSessionRef = useRef<DefaultMeetingSession | null>(null);

    const startMeeting = async () => {
        setIsLoading(true);
        setStatus('Creating meeting...');

        try {
            const response = await axios.post('https://nexus.hwork.ph/call/create-meeting', {
                agent_id: 'agent1'
            });

            setMeetingId(response.data.meeting_id);
            setStatus('Waiting for customer...');

            // Initialize meeting with proper configuration
            const logger = new ConsoleLogger('ChimeLogger', LogLevel.INFO);
            const deviceController = new DefaultDeviceController(logger);

            const configuration = new MeetingSessionConfiguration(
                response.data.agent_join_data.meeting,
                response.data.agent_join_data.attendee
            );

            meetingSessionRef.current = new DefaultMeetingSession(
                configuration,
                logger,
                deviceController
            );

            // Start audio
            const audioElement = document.getElementById('audio-element') as HTMLAudioElement;
            await meetingSessionRef.current.audioVideo.bindAudioElement(audioElement);
            try{
                await meetingSessionRef.current.audioVideo.start();
            }
            catch (error) {
                console.error('Error starting audio:', error);
                alert('Failed to start audio');
            }

            setStatus('Call connected - waiting for customer');
        } catch (error) {
            console.error(error);
            setStatus('Error creating meeting');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            // Clean up meeting session when component unmounts
            if (meetingSessionRef.current) {
                meetingSessionRef.current.audioVideo.stop();
            }
        };
    }, []);

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Agent Console</h1>

            <button
                onClick={startMeeting}
                disabled={isLoading || !!meetingId}
                className={`w-full p-2 mb-4 rounded ${
                    isLoading || meetingId ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
                {isLoading ? 'Creating...' : 'Start New Meeting'}
            </button>

            {meetingId && (
                <div className="mb-4 p-3 bg-gray-100 rounded">
                    <p className="font-semibold">Meeting ID:</p>
                    <p className="text-sm break-all">{meetingId}</p>
                </div>
            )}

            <div className="mb-4 p-3 bg-gray-100 rounded">
                <p className="font-semibold">Status:</p>
                <p>{status}</p>
            </div>

            <audio id="audio-element" controls className="w-full" />
        </div>
    );
}