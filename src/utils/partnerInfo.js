export const getPartnerInfo = (conversation, email) => {
  let participant = "";
  if (email === conversation.creator.email) {
    participant = conversation.participant;
  } else {
    participant = conversation.creator;
  }

  return participant;
};
