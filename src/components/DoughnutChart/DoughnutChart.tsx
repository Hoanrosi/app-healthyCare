import React, { useState } from "react";
import Chart from "react-apexcharts";

const Donut: React.FC = () => {
  const [targetValue, setTargetValue] = useState(50);
  const [chartData] = useState({
    options: {
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          const count = opts.w.config.series.reduce((total, item, index) => {
            if (index <= opts.seriesIndex) {
              return item + total;
            } else {
              return total;
            }
          }, 0);
          return count;
        },
      },
      labels: [
        "Good",
        "Moderate",
        "Unhealthy for sensitive Grounds",
        "Unhealthy",
        "Very Unhealthy",
        "Hazardous",
      ],
      annotations: {
        points: [
          {
            x: "50%",
            y: "50%",
            marker: {
              size: 8,
              fillColor: "#000000",
              strokeColor: "#000000",
              strokeWidth: 2,
            },
            label: {
              text: `Target: ${targetValue}`, // Hiển thị giá trị trong kim chỉ
              borderColor: "#000000",
              offsetY: -15,
              style: {
                fontSize: "14px",
                fontWeight: "bold",
              },
            },
          },
        ],
      },
      legend: {
        fontSize: "16px",
      },

      colors: [
        "#00FF00",
        "#FFFF00",
        "#FF9900",
        "#FF0000",
        "#990066",
        "#990033",
      ],
    },
    series: [50, 50, 50, 50, 50, 50],
  });

  return (
    <div className="donut">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width={650}
      />
    </div>
  );
};

export default Donut;
