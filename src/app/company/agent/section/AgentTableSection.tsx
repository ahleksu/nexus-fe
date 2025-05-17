/* eslint-disable @typescript-eslint/no-unused-vars */
// components/AgentTableSection.tsx
"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {useFetchAgents} from "@/app/company/agent/hooks/useFetchAgents";
import {Button} from "@/components/ui/button";
import {CreateAgentDialog} from "@/app/company/agent/component/CreateAgentDialog";
import { useRouter } from "next/navigation";


const statusVariantMap = {
    active: "default",
    inactive: "destructive",
    on_leave: "outline",
};

const roleVariantMap = {
    admin: "destructive",
    support: "default",
    supervisor: "secondary",
};

const AgentTableSection = () => {
    const { agents, loading, error } = useFetchAgents();
    const router = useRouter();


    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="flex w-full justify-between items-center">
                <h2 className="text-md font-bold">Agents</h2>
                <CreateAgentDialog/>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
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
                        agents.map((agent) => (
                            <TableRow key={agent.id}>
                                <TableCell>{agent.id}</TableCell>
                                <TableCell className="font-medium">{agent.name}</TableCell>
                                <TableCell>{agent.email}</TableCell>
                                <TableCell>
                                    <Button  variant="ghost" onClick={() => router.push(`/company/agent/${agent.id}/dashboard`)}>View</Button>
                                </TableCell>

                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

        </div>
    );
};

export default AgentTableSection;