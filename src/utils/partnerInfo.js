export const getPartnerInfo = (user, email) => {
  const currentUser = user.find((u) => u.email !== email);
  return currentUser;
};
