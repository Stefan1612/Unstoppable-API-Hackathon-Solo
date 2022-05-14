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
      <Input onChange={(e) => props.changeInput(e)}></Input>
      <Button onClick={(e) => props.getAPIData()}>
        Get Etherscan API Data
      </Button>
      <Box></Box>
      {/*   <Button onClick={(e) => getAPIDataInternal()}>
        Get Etherscan API ERC20 TX Events
      </Button> */}
    </div>
  );
};

export default EtherscanAPI;
