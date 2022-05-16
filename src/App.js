import "./App.css";
import EtherscanAPI from "./Components/EtherscanAPI";
import axios from "axios";
import { Box, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [normalTXHistory, setNormalTXHistory] = useState("");
  const [internalTXHistory, setInternalTXHistory] = useState("");
  const [isFetchedTX, setIsFetchedTX] = useState(false);
  function changeInput(e) {
    setInputValue(e.target.value);
  }
  // MY ADDRESS 0x4ad3710fbbf9d1f2cd56031509114e2355e54468
  // RANDOM TEST ADDRESS 0x23aD6CdC593C4ebF1f124D4aae2422A5848c29c5
  async function getAndChangeInputIntoAddress() {
    const regex = "0x";
    // if user inputs address

    if (
      inputValue &&
      inputValue.length === 42 &&
      inputValue.substring(0, 2) === regex
    ) {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
        );
        const blockNumber = await provider.getBlockNumber();

        // ${inputValue}
        let result = await axios.get(
          `https://api.etherscan.io/api?module=account&action=txlist&address=0x23aD6CdC593C4ebF1f124D4aae2422A5848c29c5&startblock=0&endblock=${blockNumber}&page=1&offset=5&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
        );
        setNormalTXHistory(result);
        console.log(result);
        result = await axios.get(
          `https://api.etherscan.io/api?module=account&action=txlistinternal&address=0x23aD6CdC593C4ebF1f124D4aae2422A5848c29c5&startblock=0&endblock=${blockNumber}&page=1&offset=10&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
        );
        setInternalTXHistory(result);
        setIsFetchedTX(true);
        console.log("address inputted");
      } catch {
        console.log("etherscan api call ended up failing");
      }
    }
    // if input was Unstoppable Domain
    // call alchemy's unstoppable API
    else if (inputValue === "" || inputValue === undefined) {
      console.log("no input value");
      return;
    } else {
      console.log("domain inputted");
      alchemyUD();
    }
  }
  async function getAPIData() {
    getAndChangeInputIntoAddress();
    /*   try {
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
    } */
  }
  const [isFetched, setIsFetched] = useState(false);
  const [alchemyResult, setAlchemyResult] = useState("");
  const AuthStr = "Bearer ".concat(process.env.REACT_APP_ALCHEMY_KEY);
  async function alchemyUD() {
    let result = await axios.get(
      `https://unstoppabledomains.g.alchemy.com/domains/${inputValue}`,
      { headers: { Authorization: AuthStr } }
    );
    if (result) {
      setIsFetched(true);
    }
    console.log(result);
    setAlchemyResult(result);
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
          <Box>
            Domain =&gt; Get NetworkID the Domain is minted on, the blockchain
            the Domain is minted on, the owner address of the domain
          </Box>
          <EtherscanAPI
            getAPIData={getAPIData}
            changeInput={changeInput}
            alchemyUD={alchemyUD}
            alchemyResult={alchemyResult}
            isFetched={isFetched}
            normalTXHistory={normalTXHistory}
            isFetchedTX={isFetchedTX}
            internalTXHistory={internalTXHistory}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
