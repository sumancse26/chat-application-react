import gravatarUrl from "gravatar-url";
import momemt from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetConversationsQuery } from "../../features/conversation/conversationApi";
import { setConversationInfo } from "../../features/conversation/conversationSlice";
import { getPartnerInfo } from "../../utils/partnerInfo";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth);

  const { email } = user;
  const { data, isLoading, isError, refetch } = useGetConversationsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, [email, refetch]);

  const getConversationHandler = (id, conversation) => {
    navigate(`/inbox/${id}`);
    dispatch(setConversationInfo(conversation || {}));
  };

  let content = "";

  if (isLoading) {
    content = <li>Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li>
        <Error />
      </li>
    );
  } else if (!isLoading && !isError && data?.conversations?.length === 0) {
    content = <li>No conversation found</li>;
  } else if (!isLoading && !isError && data?.conversations?.length > 0) {
    content = data.conversations.map((conversation) => {
      const { last_message, updatedAt, _id } = conversation;
      const { name, email: partnerEmail } = getPartnerInfo(conversation, email);
      return (
        <li key={_id} onClick={() => getConversationHandler(_id, conversation)}>
          <ChatItem
            avatar={gravatarUrl(partnerEmail, { size: 80 })}
            name={name}
            lastMessage={last_message}
            lastTime={momemt(updatedAt).fromNow()}
          />
        </li>
      );
    });
  }
  return <ul>{content}</ul>;
}
