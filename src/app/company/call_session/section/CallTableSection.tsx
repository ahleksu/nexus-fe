
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {useFetchCallSession} from "@/app/company/call_session/hooks/useFetchBackCallSession";

const CallSessionTableSection = () => {
    const { sessions, loading, error } = useFetchCallSession();

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="flex w-full justify-between items-center">
                <h2 className="text-lg font-bold">Call Sessions</h2>
                <Button variant="outline">Refresh</Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Agent Name</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
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
                        sessions.map((session) => (
                            <TableRow key={session.id}>
                                <TableCell>{session.id}</TableCell>
                                <TableCell className="font-medium">{session.agent_name}</TableCell>
                                <TableCell>{session.duration}</TableCell>
                                <TableCell>{session.status}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm">View</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CallSessionTableSection;