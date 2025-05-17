// data/callTranscriptionData.ts

import {CallTranscriptionType} from "@/app/agent/(home)/transcription/type/CallTranscriptionType";

export const callTranscriptionData: CallTranscriptionType[] = [
    {
        id: "1",
        timestamp: "00:01:23",
        agent_name: "Alex Johnson",
        content: "Thank you for calling TechSupport. How can I help you today?",
        role: "agent",
        sentiment: "positive"
    },
    {
        id: "2",
        timestamp: "00:01:35",
        agent_name: "",
        content: "Hi, I'm having trouble logging into my account. It says my password is incorrect.",
        role: "customer",
        sentiment: "neutral"
    },
    {
        id: "3",
        timestamp: "00:02:10",
        agent_name: "Alex Johnson",
        content: "I'm sorry to hear that. Let me help you reset your password. Can you confirm your email address?",
        role: "agent",
        sentiment: "positive"
    },
    {
        id: "4",
        timestamp: "00:02:45",
        agent_name: "",
        content: "It's customer@example.com. This is really frustrating - I've been locked out for hours!",
        role: "customer",
        sentiment: "negative"
    },
    {
        id: "5",
        timestamp: "00:03:20",
        agent_name: "Alex Johnson",
        content: "I completely understand your frustration. I've sent a password reset link to your email. It should arrive within 2 minutes.",
        role: "agent",
        sentiment: "positive"
    }
];