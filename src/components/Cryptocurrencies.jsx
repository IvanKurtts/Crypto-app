import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useState, useEffect } from "react";
import { Loader } from "./Loader";

export const Cryptocurrencies = ({ simplified }) => {
  let count = simplified ? 10 : 1008;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching || !cryptos?.length) return <Loader />;
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutters={[24, 24]}>
        {cryptos?.map((coin) => (
          <Col xs={simplified ? 24 : 19} sm={12} lg={8} className="crypto-card" key={coin.uuid}>
            <Link to={`/crypto/${coin.uuid}`}>
              <Card
                title={`${coin.rank}. ${coin.name}`}
                extra={<img className="crypto-image" src={coin.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(coin.price)}</p>
                <p>Market Cap: {millify(coin.marketCap)}</p>
                <p>Daily change: {millify(coin.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};
