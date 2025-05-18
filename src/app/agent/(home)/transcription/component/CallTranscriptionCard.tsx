import {CallTranscriptionType} from "@/app/agent/(home)/transcription/type/CallTranscriptionType";
import {formatTimestamp} from "@/app/agent/(home)/transcription/formatTimeStamp";

type Props = {
    data: CallTranscriptionType;
}
const CallTranscriptionCard = (props: Props) => {
    const {data} = props;
    const {timestamp, agent_name, content, role, sentiment} = data;

    return(
        <div
            className={`flex flex-col p-3 rounded-lg ${
                role === 'agent'
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'bg-gray-50 border-l-4 border-gray-400'
            }`}
        >
            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium text-gray-500">
                                    {formatTimestamp(timestamp)}
                                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                    role === 'agent'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-200 text-gray-800'
                }`}>

                    {agent_name}
                                            </span>
            </div>
            <p className="text-sm">{content}</p>
            {sentiment && (
                <span className={`text-xs mt-1 ${
                    sentiment === 'positive' ? 'text-green-600' :
                        sentiment === 'negative' ? 'text-red-600' :
                            'text-gray-600'
                }`}>
                                    {sentiment}
                                </span>
            )}
        </div>
    )
}

export default CallTranscriptionCard;