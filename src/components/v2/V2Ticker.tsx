const items: { value?: string; label: string }[] = [
  { value: "100+", label: "Years of Expert Advice" },
  { label: "Consultants at Every Modality" },
  { value: "14%", label: "Average Time Savings" },
  { label: "Fire Damage Specialists" },
  { value: "8%", label: "Avg Bill Cost Savings" },
  { label: "AI-Powered Oversight Analytics" },
  { value: "4-12x", label: "ROI on Owner's Rep Fee" },
];

const TickerItem = ({ value, label }: { value?: string; label: string }) => (
  <span className="flex items-center gap-3 whitespace-nowrap">
    {value && (
      <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1rem", color: "var(--v2-neon)" }}>
        {value}
      </span>
    )}
    <span style={{ fontSize: "1.25rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: value ? "var(--v2-muted)" : "var(--v2-white)" }}>
      {label}
    </span>
    <span style={{ color: "rgba(0,255,136,.15)", margin: "0 24px" }}>◆</span>
  </span>
);

const V2Ticker = () => {
  const repeated = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden"
      style={{
        borderTop: "1px solid var(--v2-rule)",
        borderBottom: "1px solid var(--v2-rule)",
        padding: "0.9rem 0",
        background: "var(--v2-deep)",
      }}
    >
      <div className="v2-ticker-track flex items-center" style={{ width: "max-content" }}>
        {repeated.map((item, i) => (
          <TickerItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default V2Ticker;
