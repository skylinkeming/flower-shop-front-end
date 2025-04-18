import React, { Fragment } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ProductDoughnut({
  products = [],
  productRevenues = [],
  ...props
}) {
  const data = {
    labels: products,
    datasets: [
      {
        label: "# of Votes",
        data: productRevenues,
        backgroundColor: [
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  if (products.length === 0) {
    return <div></div>;
  }
  return (
    <Fragment>
      <div className="chartTitle">購買商品組成</div>
      <Doughnut data={data} />
    </Fragment>
  );
}
