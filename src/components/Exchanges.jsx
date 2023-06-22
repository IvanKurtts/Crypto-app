import { useState } from "react";
import { Row, Col } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Loader } from "./Loader";
import { ExchangesList } from "./ExchangesList";

export const Exchanges = () => {
  const [currenciesCount, setCurrenciesCount] = useState(50);
  const { isFetching } = useGetCryptosQuery();

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={7}>Token</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={8}>Price</Col>
        <Col span={3}>Change</Col>
      </Row>
      <ExchangesList
        currenciesCount={currenciesCount}
        setCurrenciesCount={setCurrenciesCount}
      />
    </>
  );
};
