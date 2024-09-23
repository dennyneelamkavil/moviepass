export default function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  const formattedHour = h % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
}
