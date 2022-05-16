import React from "react";
import axios from "axios";
import { Box, Button, Input } from "@mui/material";
const EtherscanAPI = (props) => {
  /* ${process.env.REACT_APP_ETHERSCAN_API_KEY} */

  /*   async function getAPIDataInternal() {
    try {
      let result = await axios.get(
        `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&address=${address}&page=1&offset=100&startblock=0&endblock=14775340&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
      );
      console.log(result);
    } catch {
      console.log("etherscan api call ended up failing");
    }
  } */
  return (
    <div>
      <Input
        onChange={(e) => props.changeInput(e)}
        placeholder="Domain or address"
      ></Input>
      <Button onClick={(e) => props.getAPIData()}>
        Get Etherscan API Data
      </Button>
      {/*  <Button onClick={(e) => props.alchemyUD()}>Get alchemyUD</Button> */}
      <Box></Box>
      {/*   <Button onClick={(e) => getAPIDataInternal()}>
        Get Etherscan API ERC20 TX Events
      </Button> */}
      {/* <Box>{JSON.stringify(props.alchemyResult, null, "\t")}</Box> */}
      <Box>List of all data i want to display</Box>
      {props.isFetched && (
        <Box>
          <Box>{props.alchemyResult.data.meta.domain}</Box>
          <Box>{props.alchemyResult.data.meta.networkId}</Box>
          <Box>{props.alchemyResult.data.meta.blockchain}</Box>
          <Box>{props.alchemyResult.data.meta.owner}</Box>
        </Box>
      )}
      <Box>
        <Box>"Normal" Transaction History </Box>
        {/*  <Box>{JSON.stringify(props.normalTXHistory, null, "\t")}</Box> */}
        {props.isFetchedTX && (
          <Box>
            {/*   <Box> {JSON.stringify(props.normalTXHistory.data.result)}</Box> */}
            {/* <Box> {props.normalTXHistory.data.result[].from}</Box> */}
            {props.normalTXHistory.data.result.map((e, index) => {
              return (
                <Box>
                  <Box>This is the {index + 1 + "th"} TX in your List</Box>
                  <Box>
                    From: {props.normalTXHistory.data.result[index].from}
                  </Box>
                  <Box>To: {props.normalTXHistory.data.result[index].to}</Box>
                  <Box>
                    Gas Used: {props.normalTXHistory.data.result[index].gasUsed}
                  </Box>
                  <Box>
                    Gas Price:
                    {props.normalTXHistory.data.result[index].gasPrice}
                  </Box>
                  <Box>
                    Hash of TX: {props.normalTXHistory.data.result[index].hash}
                  </Box>
                  <Box>
                    Value send: {props.normalTXHistory.data.result[index].value}
                  </Box>
                  <Box>
                    Block-Number:
                    {props.normalTXHistory.data.result[index].blockNumber}
                  </Box>
                  <Box>
                    Contract address:
                    {props.normalTXHistory.data.result[index].contractAddress}
                  </Box>
                  <Box>
                    Input: {props.normalTXHistory.data.result[index].input}
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      <Box>
        <Box>"Internal" Transaction History </Box>
        {props.isFetchedTX && (
          <Box> {JSON.stringify(props.internalTXHistory.data.result)}</Box>
        )}
      </Box>
    </div>
  );
};

export default EtherscanAPI;
