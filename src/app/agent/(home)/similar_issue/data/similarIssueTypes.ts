// data/similarIssueData.ts
import {SimilarIssue} from "@/app/agent/(home)/similar_issue/type/SimilarIssueType";

export const similarIssuesData: SimilarIssue[] = [
    {
        id: "1",
        title: "Login authentication failed",
        content: "Users reporting authentication failures when trying to log in with correct credentials",
        agent_name: "Alex Johnson",
        created_at: "2023-05-15",
        status: "resolved",
        similarity_score: 0.87
    },
    {
        id: "2",
        title: "Payment gateway timeout",
        content: "Transactions failing due to payment gateway timeout after 30 seconds",
        agent_name: "Maria Garcia",
        created_at: "2023-06-02",
        status: "open",
        similarity_score: 0.76
    },
    {
        id: "3",
        title: "Mobile app crashing on iOS",
        content: "App crashes immediately after launch on iOS 16.4 devices",
        agent_name: "James Wilson",
        created_at: "2023-06-10",
        status: "pending",
        similarity_score: 0.68
    },
    {
        id: "4",
        title: "Email notifications not sending",
        content: "Users not receiving email notifications for completed transactions",
        agent_name: "Sarah Lee",
        created_at: "2023-06-12",
        status: "open",
        similarity_score: 0.59
    }
];