const headlineMetrics = [
  {
    label: "EU Population",
    value: "447M",
    trend: "+0.1% YoY",
    positive: true
  },
  {
    label: "EU GDP",
    value: "€16.6T",
    trend: "+3.1% YoY",
    positive: true
  },
  {
    label: "Inflation",
    value: "2.8%",
    trend: "-1.0pp YoY",
    positive: true
  },
  {
    label: "Unemployment",
    value: "6.1%",
    trend: "-0.3pp YoY",
    positive: true
  },
  {
    label: "Renewables Share",
    value: "23.0%",
    trend: "+1.4pp YoY",
    positive: true
  },
  {
    label: "Digital Economy Index",
    value: "52.3 / 100",
    trend: "+2.6 YoY",
    positive: true
  }
];

const growthSeries = [
  { year: 2018, value: 1.9 },
  { year: 2019, value: 2.6 },
  { year: 2020, value: -5.9 },
  { year: 2021, value: 5.4 },
  { year: 2022, value: 3.5 },
  { year: 2023, value: 2.0 },
  { year: 2024, value: 2.3 }
];

const svgPoints = growthSeries
  .map(({ value }, index) => {
    const x = (index / (growthSeries.length - 1)) * 100;
    const normalized = (value + 8) / 18;
    const y = 100 - normalized * 100;
    return `${x},${y}`;
  })
  .join(" ");

const areaPath = `M0,100 L${svgPoints} L100,100 Z`;

export default function Page() {
  return (
    <main>
      <header>
        <h1>European Union Outlook</h1>
        <p>
          A distilled snapshot of the European Union&apos;s economic and
          sustainability indicators.
        </p>
      </header>

      <section className="dashboard-grid">
        {headlineMetrics.map((metric) => (
          <article key={metric.label} className="card">
            <h2>{metric.label}</h2>
            <strong>{metric.value}</strong>
            <span className={`trend${metric.positive ? "" : " negative"}`}>
              {metric.trend}
            </span>
          </article>
        ))}

        <article className="card chart">
          <h2>Real GDP Growth (%)</h2>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4257ff" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#8ca7ff" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path
              d={areaPath}
              fill="url(#growthGradient)"
              stroke="none"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              points={svgPoints}
              fill="none"
              stroke="#3f51ff"
              strokeWidth="2"
            />
            {growthSeries.map(({ year, value }, index) => {
              const x = (index / (growthSeries.length - 1)) * 100;
              const normalized = (value + 8) / 18;
              const y = 100 - normalized * 100;
              return (
                <circle
                  key={year}
                  cx={x}
                  cy={y}
                  r={1.8}
                  fill="#3f51ff"
                  stroke="#fff"
                  strokeWidth="0.6"
                />
              );
            })}
          </svg>
          <div className="footnote">
            Source: Eurostat consolidated estimates (2024 outlook)
          </div>
        </article>
      </section>
    </main>
  );
}
