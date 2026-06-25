export default function ImpactBadge({ impact }) {
  const styles = {
    HIGH: "bg-red-500/20 text-red-400",
    MEDIUM: "bg-yellow-500/20 text-yellow-400",
    LOW: "bg-green-500/20 text-green-400"
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[impact]}`}
    >
      {impact}
    </span>
  );
}
