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
    </div>
  );
}
