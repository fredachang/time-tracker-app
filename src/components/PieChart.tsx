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
}

export function PieChart(props: Props) {
  const { data } = props;

  return (
    <div className="donut">
      <Doughnut data={data} />
      <div
        id="left-line"
        className="bg-black dark:bg-green w-14 h-px flex absolute top-52% left-85px"
      ></div>
      <div
        id="right-line"
        className="bg-black dark:bg-green w-14 h-px flex absolute top-52% right-85px"
      ></div>
      <div
        id="bottom-line"
        className="bg-black dark:bg-green w-px h-14 flex absolute left-1/2 bottom-30px"
      ></div>
    </div>
  );
}
