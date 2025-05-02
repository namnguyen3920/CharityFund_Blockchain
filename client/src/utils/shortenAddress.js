export const shortenAddress = (address) => {
    if (!address || typeof address !== "string") return "Invalid address";
    return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
  };