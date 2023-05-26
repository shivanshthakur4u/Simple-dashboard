import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import '../src/index.css'
const Dashboard = () => {
  const chartRef = useRef(null);

  const items = [
    {
      image: "https://cdn.pixabay.com/photo/2022/03/31/12/20/synthwave-7102886_1280.jpg",
      title: "Sound Item 1",
      uniquePlays: 10,
      totalPlays: 25,
      completionRate: 80,
    },
    {
      image: "https://cdn.pixabay.com/photo/2022/03/31/12/20/synthwave-7102886_1280.jpg",
      title: "Sound Item 2",
      uniquePlays: 5,
      totalPlays: 15,
      completionRate: 60,
    },
    {
      image: "https://cdn.pixabay.com/photo/2022/03/31/12/20/synthwave-7102886_1280.jpg",
      title: "Sound Item 3",
      uniquePlays: 12,
      totalPlays: 45,
      completionRate: 70,
    },
  ];

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const uniquePlaysData = items.map((item) => item.uniquePlays);
      const totalPlaysData = items.map((item) => item.totalPlays);
      const labels = items.map((item) => item.title);

      chartRef.current.chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Unique Plays",
              data: uniquePlaysData,
              backgroundColor: "#007bff",
            },
            {
              label: "Total Plays",
              data: totalPlaysData,
              backgroundColor: "#6c757d",
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
    }
  }, [items]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Calm Sleep Dashboard</h1>
      <canvas ref={chartRef} width={800} height={400} />
      <div className="item-list">
        {items.map((item, index) => (
          <div
            key={index}
            className="item-card"
          >
            <img
              src={item.image}
              alt="Sound Thumbnail"
              className="item-image"
            />
            <h3 className="item-title">{item.title}</h3>
            <p className="item-info">Unique Plays: {item.uniquePlays}</p>
            <p className="item-info">Total Plays: {item.totalPlays}</p>
            <div className="completion-bar">
              <div
                className="completion-progress"
                style={{ width: `${item.completionRate}%` }}
              />
              <span className="completion-text">{item.completionRate}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
