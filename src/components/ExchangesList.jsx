import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar, Button, Spin } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Line } from "react-chartjs-2";

const { Text } = Typography;
const { Panel } = Collapse;

export const ExchangesList = ({ currenciesCount, setCurrenciesCount }) => {
  const { data, isFetching } = useGetCryptosQuery(currenciesCount);
  const total = data?.data?.stats?.total;
  const exchangesList = data?.data?.coins;

  const changesList = [];
  for (let i = 0; i < data?.data?.coins?.length; i++) {
    changesList.push({
      change: data?.data?.coins[i]?.change,
      id: data?.data?.coins[i]?.uuid,
    });
  }

  return (
    <>
      <Row>
        {exchangesList?.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={
                  <Row key={exchange.uuid}>
                    <Col span={7}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange["24hVolume"])}</Col>
                    <Col span={8}>{parseFloat(exchange.price).toFixed(6)}$</Col>
                    <Col
                      span={3}
                      style={{ color: exchange.change > 0 ? "green" : "red" }}
                    >
                      <strong>{millify(exchange.change)}%</strong>
                    </Col>
                  </Row>
                }
              >
                <Col md={23} lg={23} xl={23}>
                  <Line
                    className="line"
                    data={{
                      labels: new Array(24).fill(""),
                      datasets: [
                        {
                          data: exchange.sparkline,
                          backgroundColor: "#0072bd",
                          borderColor: "#0072bd",
                        },
                      ],
                    }}
                  />
                  <Col className="line-title">Last 24h price changes</Col>
                </Col>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
      <Col className="show-more">
        {isFetching && <Spin />}
        {changesList.length <= total && !isFetching && (
          <Button
            onClick={() => {
              setCurrenciesCount(currenciesCount + 50);
            }}
          >
            Show More Coins
          </Button>
        )}
      </Col>
    </>
  );
};
