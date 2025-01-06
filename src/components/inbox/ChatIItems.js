import gravatarUrl from "gravatar-url";
import momemt from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetConversationsQuery } from "../../features/conversation/conversationApi";
import { getPartnerInfo } from "../../utils/partnerInfo";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth);
  const { email } = user;
  const { data, isLoading, isError } = useGetConversationsQuery(email);

  let content = "";

  if (isLoading) {
    content = <li>Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li>
        <Error />
      </li>
    );
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <li>No conversation found</li>;
  } else if (!isLoading && !isError && data?.length > 0) {
    content = data.map((conversation) => {
      const { message, timestamp, id, users } = conversation;
      const { name, email: partnerEmail } = getPartnerInfo(users, email);
      return (
        <li key={id}>
          <Link to={`/inbox/${id}`}>
            <ChatItem
              avatar={gravatarUrl(partnerEmail, { size: 80 })}
              name={name}
              lastMessage={message}
              lastTime={momemt(timestamp).fromNow()}
            />
          </Link>
        </li>
      );
    });
  }
  return <ul>{content}</ul>;
}
