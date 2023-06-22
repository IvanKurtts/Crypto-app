import { Route, Routes, Navigate } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import { Navbar } from "./components/Navbar";
import { Homepage } from "./components/Homepage";
import { Exchanges } from "./components/Exchanges";
import { Cryptocurrencies } from "./components/Cryptocurrencies";
import { CryptoDetails } from "./components/CryptoDetails";
import { News } from "./components/News";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout style={{ background: "#f6f6f7" }}>
          <div className="routes">
            <Routes>
              <Route index path="/" Component={Homepage}></Route>
              <Route path="/exchanges" Component={Exchanges}></Route>
              <Route
                path="/cryptocurrencies"
                Component={Cryptocurrencies}
              ></Route>
              <Route path="/crypto/:coinId" Component={CryptoDetails}></Route>
              <Route path="/news" Component={News}></Route>
              <Route path="/error" element={<Navigate to="/" />}></Route>
              <Route path="/*" element={<Navigate to="/" />}></Route>
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptoverse <br /> All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
