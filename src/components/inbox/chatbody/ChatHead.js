import gravatarUrl from "gravatar-url";
import { useSelector } from "react-redux";
export default function ChatHead({ message }) {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const { sender, receiver } = message || {};
  const { name } = email === sender.email ? receiver : sender;
  const senderEmail = email === sender.email ? receiver.email : sender.email;
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <img
        className="object-cover w-10 h-10 rounded-full"
        src={gravatarUrl(senderEmail, { size: 80 })}
        alt={name}
      />
      <span className="block ml-2 font-bold text-gray-600">{name}</span>
    </div>
  );
}
