export const formatOnlineUser = (onlineUserInfo = {}) => {
  const keys = Object.keys(onlineUserInfo);
  if (!keys.length) return [];
  let userInfo = Object.values(onlineUserInfo);
  let homeowner = null;
  const homeownerIndex = userInfo.findIndex((k: any) => k.role === 'admin');
  homeownerIndex != -1 && (homeowner = userInfo.splice(homeownerIndex, 1));
  homeownerIndex != -1 && (userInfo = [...homeowner, ...userInfo]);
  return userInfo;
};
