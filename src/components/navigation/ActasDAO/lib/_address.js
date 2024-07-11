export const _address = (address, max) => {
  const limit = max || 10;
  if (address.length > limit) return address.slice(0, limit) + "...";
  else return address;
};
