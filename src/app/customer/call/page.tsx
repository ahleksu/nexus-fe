"use client";

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
    ConsoleLogger,
    DefaultDeviceController,
    DefaultMeetingSession,
    LogLevel,
    MeetingSessionConfiguration,
    MeetingSession
} from 'amazon-chime-sdk-js';

export default function CustomerPage() {
    const [meetingId, setMeetingId] = useState('');
    const [isInCall, setIsInCall] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const meetingSessionRef = useRef<MeetingSession | null>(null);

    const joinMeeting = async () => {
        if (!meetingId) return;

        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://nexus.hwork.ph/call/get-customer-join-data/${meetingId}`
            );

            const configuration = new MeetingSessionConfiguration(
                response.data.meeting,
                response.data.attendee
            );

            const logger = new ConsoleLogger('CustomerLogger', LogLevel.INFO);
            const deviceController = new DefaultDeviceController(logger);

            const meetingSession = new DefaultMeetingSession(
                configuration,
                logger,
                deviceController
            );

            // Save reference
            meetingSessionRef.current = meetingSession;

            // Only setInCall here, move start() to useEffect
            setIsInCall(true);
        } catch (error) {
            console.error(error);
            alert('Failed to join meeting');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const startAudio = async () => {
            if (isInCall && meetingSessionRef.current) {
                const audioElement = document.getElementById('audio-element') as HTMLAudioElement;
                if (!audioElement) return;

                await meetingSessionRef.current.audioVideo.bindAudioElement(audioElement);
                try{
                    await meetingSessionRef.current.audioVideo.start();
                }
                catch (error) {
                    console.error('Error starting audio:', error);
                    alert('Failed to start audio');
                }


            }
        };

        startAudio();
    }, [isInCall]);

    const endCall = () => {
        meetingSessionRef.current?.audioVideo.stop();
        meetingSessionRef.current = null;
        setIsInCall(false);
        setMeetingId('');
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Customer Console</h1>

            {!isInCall ? (
                <>
                    <input
                        type="text"
                        value={meetingId}
                        onChange={(e) => setMeetingId(e.target.value)}
                        placeholder="Enter Meeting ID"
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <button
                        onClick={joinMeeting}
                        disabled={isLoading || !meetingId}
                        className={`w-full p-2 rounded ${isLoading || !meetingId ? 'bg-gray-300' : 'bg-green-500 text-white'}`}
                    >
                        {isLoading ? 'Joining...' : 'Join Meeting'}
                    </button>
                </>
            ) : (
                <>
                    <div className="mb-4 p-3 bg-gray-100 rounded">
                        <p>Connected to meeting: {meetingId}</p>
                    </div>
                    <audio id="audio-element" controls className="w-full mb-4" />
                    <button
                        onClick={endCall}
                        className="w-full p-2 bg-red-500 text-white rounded"
                    >
                        End Call
                    </button>
                </>
            )}
        </div>
    );
}
