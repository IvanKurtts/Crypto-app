import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const { Title } = Typography;

export const LineChart = ({
  coinHistory,
  currentPrice,
  coinName,
  timePeriod,
}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.unshift(coinHistory.data.history[i].price);
    if (timePeriod === "3h" || timePeriod === "24h") {
      coinTimestamp.unshift(
        new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleString()
      );
    } else {
      coinTimestamp.unshift(
        new Date(
          coinHistory.data.history[i].timestamp * 1000
        ).toLocaleDateString()
      );
    }
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0072bd",
        borderColor: "#0072bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: { beginAtZero: true },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};
