import "./StatsRope.scss";

const stats = [
  { name: "Records", value: 26840918 },
  { name: "Bottles", value: 287866700 },
  { name: "Stores", value: 2952 },
  { name: "Liters", value: 245960557 },
  { name: "Products", value: 12598 },
  { name: "Cities", value: 482 },
  { name: "Sales $", value: 3834034245 },
];

function StatsRope() {
  const formatNumber = (num: number) => {
    return Intl.NumberFormat("en", { notation: "compact" }).format(num);
  };

  return (
    <div className="statsRope__container">
      {stats.map((stat) => (
        <div key={stat.name} className="statBox">
          <p>{formatNumber(stat.value)}</p>
          <p>{stat.name}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsRope;
