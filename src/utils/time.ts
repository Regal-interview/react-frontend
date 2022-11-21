const _intervals = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "min", seconds: 60 },
  { label: "sec", seconds: 1 },
];

export function displaySince(date: Date, now = Date.now()): string {
  const sec = Math.floor((now - date.getTime()) / 1000);
  const interval = _intervals.find((i) => i.seconds < sec)!;
  const count = Math.floor(sec / interval?.seconds || 1);
  return `${count} ${interval?.label || "secs"}${count > 1 ? "s" : ""}`;
}
