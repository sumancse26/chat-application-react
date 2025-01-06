// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";

export default function ChatBody() {
  const { id } = useParams();
  const { data: messages, isLoading, isError } = useGetMessagesQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading messages.</div>;

  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">
        {messages && messages.length > 0 ? (
          <>
            <ChatHead message={messages[0]} />
            <Messages messages={messages} />
            <Options info={messages[0]} />
          </>
        ) : (
          <div>No messages available.</div>
        )}

        {/* <Blank /> */}
      </div>
    </div>
  );
}
