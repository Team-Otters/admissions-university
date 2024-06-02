"use client";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ScoreChartScreen: React.FC = () => {
  const listYears: string[] = ["All", "2023", "2022", "2021", "2020", "2019"];
  const listSubjects: string[] = [
    "All",
    "Toán học",
    "Ngữ văn",
    "Vật lý",
    "Hóa học",
    "Sinh học",
    "Lịch sử",
    "Địa lý",
    "GDCD",
  ];
  const [data, setData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const allScore = [
    0, 3, 8, 10, 23, 27, 34, 41, 67, 83, 131, 163, 169, 177, 149, 111, 92, 12,
    10, 4,
  ];

  const all2023 = [
    0, 0, 1, 9, 11, 16, 32, 39, 60, 78, 120, 153, 161, 172, 178, 160, 142, 58,
    17, 10,
  ];

  const toan2023 = [
    0, 0, 0, 10, 6, 16, 22, 29, 60, 78, 97, 133, 151, 155, 160, 178, 142, 128,
    37, 15,
  ];

  const van2022 = [
    0, 0, 0, 9, 7, 16, 22, 29, 75, 88, 135, 143, 213, 217, 174, 155, 102, 28,
    10, 2,
  ];

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
  };

  const handleViewScore = (): void => {
    console.log(selectedSubject, " ", selectedYear);
    if (selectedSubject == "All" && selectedYear == "All") {
      viewScoreChart(allScore);
    } else if (selectedSubject == "Ngữ văn" && selectedYear == "2022") {
      viewScoreChart(van2022);
    } else if (selectedSubject == "Toán học" && selectedYear == "2023") {
      viewScoreChart(toan2023);
    } else if (selectedSubject == "All" && selectedYear == "2023") {
      viewScoreChart(all2023);
    } else {
      let temp = [allScore, van2022, toan2023, all2023];
      const randomNumber = Math.floor(Math.random() * 4) + 1;
      viewScoreChart(temp[randomNumber]);
    }
  };

  const viewScoreChart = (score: number[]): void => {
    let temp = JSON.parse(JSON.stringify(data));
    temp.datasets[0].data = score;
    setData(temp);
    console.log(temp.datasets[0].data);
  };

  useEffect(() => {
    setData({
      labels: [
        "0-0.5",
        "0.5-1",
        "1-1.5",
        "1.5-2",
        "2-2.5",
        "2.5-3",
        "3-3.5",
        "3.5-4",
        "4-4.5",
        "4.5-5",
        "5-5.5",
        "5.5-6",
        "6-6.5",
        "6.5-7",
        "7-7.5",
        "7.5-8",
        "8-8.5",
        "8.5-9",
        "9-9.5",
        "9.5-10",
      ],
      datasets: [
        {
          label: "Thí sinh",
          data: allScore,
          borderColor: "rgb(165, 199, 191)",
          backgroundColor: "rgb(165, 199, 191, 0.8)",
        },
      ],
    });

    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: `Biểu đồ phổ điểm (Tổng: ${1200})`,
        },
        datalabels: {
          anchor: "end",
          align: "top",
          formatter: (value) => value,
          color: "black",
          font: {
            weight: "bold",
          },
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <Container
      fluid
      style={{ height: "100vh", paddingTop: "50px" }}
      className="font-notoSans"
    >
      <div className="p-1 mb-4">
        <h2 className="text-3xl">Báo cáo phổ điểm</h2>
        <div className="w-11/12 mx-auto flex flex-row mt-8">
          <div className="flex flex-row">
            <text className="self-center">Năm: </text>
            <select
              name="year"
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              className="ml-2 rounded-xl border border-black"
            >
              {listYears.map((item, index) => {
                return (
                  <option key={index} value={`${item}`}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-row ml-8">
            <text className="self-center">Môn: </text>
            <select
              name="subject"
              id="subject"
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="ml-2 rounded-xl border border-black"
            >
              {listSubjects.map((item, index) => {
                return (
                  <option key={index} value={`${item}`}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <Button className="ml-8" onClick={handleViewScore}>
            Xem phổ điểm
          </Button>
        </div>
        <div className="max-w-11/12 w-11/12 mx-auto text-lg bg-white mt-8">
          <Bar data={data} options={chartOptions} />
        </div>
      </div>
    </Container>
  );
};

export default ScoreChartScreen;
