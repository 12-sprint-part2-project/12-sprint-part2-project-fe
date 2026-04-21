export const calcRemaining = (endTime, pausedAt = null) =>
  Math.ceil(
    (new Date(endTime).getTime() -
      (pausedAt ? new Date(pausedAt).getTime() : Date.now())) /
      1000,
  );
