import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Config } from "../../util/Constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ClientRevenue = ({ client, selectYear }) => {
  const [monthArray, setMonthArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [yearArray, setYearArray] = useState([]);

  useEffect(() => {
    let startDate = selectYear +"-01-01";
    let endDate = selectYear+"-12-31";
      
    axios
      .get(
        `${Config.url.API_URL}/feed/orders/monthlyRevenue?startDate=${startDate}&endDate=${endDate}&clientId=${client._id}`
      )
      .then((result) => {
        let revenue = result.data.monthlyRevenue;
        console.log(revenue);
        setMonthArray(Object.keys(revenue));
        setDataArray(Object.values(revenue));
      });
  }, [selectYear]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        // defining min and max so hiding the dataset does not change scale range
        beginAtZero: true,
      },
      x: {
        beginAtZero: true,
      },
    },
  };

  const labels = monthArray;

  const data = {
    labels,
    datasets: [
      {
        label: `${client.name} - 訂單金額`,
        data: dataArray,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
    ],
  };

  return (
    <ClientRevenueWrap>
      <div className="year">
        {yearArray.map((year) => (
          <span key={year} className="yearLink">
            {year}
          </span>
        ))}
      </div>
      <Bar options={options} data={data} />
    </ClientRevenueWrap>
  );
};

const ClientRevenueWrap = styled.div``;

export default ClientRevenue;
