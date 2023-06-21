import "chart.js/auto";
import "../index.css";
import { Doughnut } from "react-chartjs-2";

interface Props {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
  theme: string;
}

export function PieChart(props: Props) {
  const { theme, data } = props;

  return (
    <div className="donut">
      <Doughnut data={data} />
      <div
        id="left-line"
        className="bg-black w-14 h-px flex absolute top-52%"
      ></div>
      <div
        id="right-line"
        className="bg-black w-14 h-px flex absolute top-52% right-17px"
      ></div>
      <div
        id="bottom-line"
        className="bg-black w-px h-14 flex absolute left-1/2 bottom-17px"
      ></div>
    </div>
  );
}
