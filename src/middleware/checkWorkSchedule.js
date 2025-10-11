function inWorkHours(start, end) {
  // start/end en formato HH:MM:SS
  const now = new Date();
  const h = now.getHours().toString().padStart(2,'0');
  const m = now.getMinutes().toString().padStart(2,'0');
  const cur = `${h}:${m}:00`;
  return cur >= start && cur <= end;
}
module.exports = { inWorkHours };
