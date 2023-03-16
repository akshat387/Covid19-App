import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { CategoryScale } from "chart.js";
// import Chart from "chart.js/auto";
// Chart.register(CategoryScale);

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph({ casesType = "cases", ...props }) {
  const [data, setData] = useState({});
  //https://disease.sh/v3/covid-19/historical/all?lastdays=120

  const buildCharData = (data, casesType = "cases") => {
    const charData = [];

    let lastDataP;

    for (let date in data.cases) {
      if (lastDataP) {
        const newDataP = {
          x: date,
          y: data[casesType][date] - lastDataP,
        };
        charData.push(newDataP);
      }
      lastDataP = data[casesType][date];
    }
    return charData;
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          const chartData = buildCharData(data, "cases");
          setData(chartData);
        });
    };
    fetchData();
  }, []);

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
