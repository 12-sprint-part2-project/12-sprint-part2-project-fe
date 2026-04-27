function formatTime(seconds) {
  const abs = Math.abs(seconds);
  const m = String(Math.floor(abs / 60)).padStart(2, "0");
  const s = String(abs % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default formatTime;
