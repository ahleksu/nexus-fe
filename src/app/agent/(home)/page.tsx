"use client"


import SimilarIssueSection from "@/app/agent/(home)/similar_issue/SimilarIssueSection";
import DocumentationSection from "@/app/agent/(home)/documentation/DocumentationSection";
import CallTranscription from "@/app/agent/(home)/transcription/CallTranscription";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="flex flex-row  h-screen p-2 gap-2 ">
        <div className="flex flex-col gap-2  w-3/4 h-full">

            <ScrollArea className="h-[75%] border border-gray-200 rounded-md ">
                <DocumentationSection />
            </ScrollArea>

            <ScrollArea className="flex-grow border  border-gray-200 rounded-md ">

                <SimilarIssueSection />
                <ScrollBar orientation="horizontal" />

            </ScrollArea>

        </div>

            <ScrollArea className="flex-grow border border-gray-200 rounded-md">
                <CallTranscription/>
            </ScrollArea>
    </div>
  );
}
