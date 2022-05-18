import "./App.css";
import EtherscanAPI from "./Components/EtherscanAPI";
import axios from "axios";
import { Box, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [normalTXHistory, setNormalTXHistory] = useState("");
  const [internalTXHistory, setInternalTXHistory] = useState("");
  const [isFetchedTX, setIsFetchedTX] = useState(false);
  const [num, setNum] = useState(0);
  const [address, setAddress] = useState("");

  function addNum() {
    setNum((previousNum) => previousNum + 5);
    console.log(num);
    getTXHistory();
  }
  function changeInput(e) {
    setInputValue(e.target.value);
  }
  // MY ADDRESS 0x4ad3710fbbf9d1f2cd56031509114e2355e54468
  // RANDOM TEST ADDRESS 0x23aD6CdC593C4ebF1f124D4aae2422A5848c29c5
  async function getTXHistory() {
    if (address !== "") {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
        );
        const blockNumber = await provider.getBlockNumber();

        // ${inputValue}#
        console.log(address);
        let result = await axios.get(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=${blockNumber}&page=1&offset=${
            5 + num
          }&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
        );
        setNormalTXHistory(result);
        console.log(result);
        let secondresult = await axios.get(
          `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=${blockNumber}&page=1&offset=${
            5 + num
          }&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
        );
        setInternalTXHistory(secondresult);
        if (secondresult || result !== undefined) {
          setIsFetchedTX(true);
        }

        console.log("address inputted");
      } catch {
        console.log("etherscan api call ended up failing");
      }
    }
  }
  useEffect(() => {
    console.log("useffect activated");
    if (appInitiated) {
      getTXHistory();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  const [isFetched, setIsFetched] = useState(false);
  const [alchemyResult, setAlchemyResult] = useState("");
  const [secondAlchemyResult, setSecondAlchemyResult] = useState("");
  const [appInitiated, setAppInitiated] = useState(false);
  async function getAPIData() {
    setNormalTXHistory("");
    setInternalTXHistory("");
    setAlchemyResult("");
    setSecondAlchemyResult("");
    setAppInitiated(true);
    getAndChangeInputIntoAddress();
  }
  async function getAndChangeInputIntoAddress() {
    const regex = "0x";
    // if user inputs address
    setNormalTXHistory("");
    setInternalTXHistory("");
    if (
      inputValue &&
      inputValue.length === 42 &&
      inputValue.substring(0, 2) === regex
    ) {
      setAddress(inputValue);
    }
    // no input
    else if (inputValue === "" || inputValue === undefined) {
      console.log("no input value");
      return;
    }
    // if input was Unstoppable Domain
    // call alchemy's unstoppable API
    else {
      console.log("domain inputted");
      alchemyUD();
    }
  }

  const AuthStr = "Bearer ".concat(process.env.REACT_APP_ALCHEMY_KEY);
  async function alchemyUD() {
    let result = await axios.get(
      `https://unstoppabledomains.g.alchemy.com/domains/${inputValue}`,
      { headers: { Authorization: AuthStr } }
    );
    const secondResult = await axios.get(
      `https://unstoppabledomains.g.alchemy.com/domains/${inputValue}/transfers/latest`,
      { headers: { Authorization: AuthStr } }
    );

    setSecondAlchemyResult(secondResult);
    if (result && secondResult) {
      setIsFetched(true);
    }

    setAlchemyResult(result);
    /* console.log(alchemyResult.data.meta.owner); */
    if (result.data.meta.owner) {
      setAddress(result.data.meta.owner);
    }
  }
  return (
    <Box
      className="App"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        /*  backgroundColor: "#c7aa93", */
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
            Hello, this app allows you to enter your address (Mainnet) OR
            Unstoppable Domain to receive Data about your Domain and/or your
            Transaction History (Normal and Internal).
          </Box>
          <Box>
            <Typography variant={"body2"} component={"p"}>
              {" "}
              Entering your Domain instead of address will give you additional
              data.
            </Typography>
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
            secondAlchemyResult={secondAlchemyResult}
            addNum={addNum}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
