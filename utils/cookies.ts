export const getEternalCookieExpired = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 200);
  return date;
}
