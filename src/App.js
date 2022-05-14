import "./App.css";
import EtherscanAPI from "./Components/EtherscanAPI";
import axios from "axios";
import { Box, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
function App() {
  const [inputValue, setInputValue] = useState("");

  function changeInput(e) {
    setInputValue(e.target.value);
  }
  async function getAndChangeInputIntoAddress() {
    const regex = /0x/;
    // if user inputted address
    if (inputValue && inputValue.length !== 64 && inputValue.test(regex)) {
      try {
        let result = await axios.get(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=14775340&page=1&offset=5&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
        );
        console.log(result);
        result = await axios.get(
          `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=14775340&page=1&offset=10&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
        );
        console.log(result);
      } catch {
        console.log("etherscan api call ended up failing");
      }
    }
    // if input was Unstoppable Domain
    // call alchemy's unstoppable API
  }
  let address = "0x4Ad3710FBBF9d1f2Cd56031509114E2355E54468";
  async function getAPIData() {
    getAndChangeInputIntoAddress();
    try {
      let result = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=14775340&page=1&offset=5&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
      );
      console.log(result);
      result = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=14775340&page=1&offset=10&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
      );
      console.log(result);
    } catch {
      console.log("etherscan api call ended up failing");
    }
  }
  return (
    <Box
      className="App"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Container style={{ paddingTop: "10vh" }}>
        <Box
          style={{
            border: "solid",

            borderWidth: "2px",
          }}
        >
          <Box variant={"h1"} component={"h2"}>
            Hello, this app allows you to enter your address or Unstoppable
            Domain to receive personal Data.<br></br>Entering your Domain
            instead of address will give you additional data.
          </Box>
          <EtherscanAPI getAPIData={getAPIData} changeInput={changeInput} />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
