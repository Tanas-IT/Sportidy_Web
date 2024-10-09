// LineChart.tsx
import { Pie } from "react-chartjs-2";
import { Card, CardBody, Heading } from "@chakra-ui/react";
import style from "./PieChart.module.scss";

interface PieChartProps {
  title: string;
  data: any;
  options?: any;
}

const LineChart: React.FC<PieChartProps> = ({ title, data, options }) => {
  return (
    <Card>
      <CardBody>
        <Heading className={style.title}>{title}</Heading>
        <Pie data={data} options={options} />
      </CardBody>
    </Card>
  );
};

export default LineChart;
