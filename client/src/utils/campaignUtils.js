import { BigNumber } from "ethers";

export const daysLeft = (deadline) => {
  let tsSeconds;

  if (BigNumber.isBigNumber(deadline)) {
    tsSeconds = deadline.toNumber();
  } else {
    tsSeconds = Number(deadline);
  }

  const deadlineMs = tsSeconds * 1000;
  const nowMs = Date.now();

  if (deadlineMs <= nowMs) return 0;

  const diffMs = deadlineMs - nowMs;
  const daysLeft = diffMs / (1000 * 60 * 60 * 24);

  return Math.ceil(daysLeft);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
