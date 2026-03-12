import Chart from "react-apexcharts";

function PieChart({
  data = [],
  labelKey,
  valueKey,
  title,
  type = "donut",
  height = 200,
}) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-gray-400 text-sm">
        No data available
      </div>
    );
  }

  const series = data.map((item) => Number(item?.[valueKey] || 0));
  const labels = data.map((item) => item?.[labelKey]);

  const options = {
    chart: {
      id: title || "pie-chart",
      fontFamily: "Poppins, sans-serif",
    },

    labels,

    colors: ["#504141", "#A62325", "#FF9800", "#ffb3b3"],

    legend: {
      show: false,
    },

    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },

    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const label = opts.w.globals.labels[opts.seriesIndex];
        return `${label}\n${val.toFixed(0)}%`;
      },
      style: {
        fontSize: "16px",
        fontWeight: 600,
        colors: ["#fff"],
      },
      dropShadow: {
        enabled: true,
      },
    },

    tooltip: {
      y: {
        formatter: (val) =>
          new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(val),
      },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type={type}
      width="100%"
      height={height}
    />
  );
}

export default PieChart;
