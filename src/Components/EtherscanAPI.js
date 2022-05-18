import React from "react";

import { Box, Button, Input, Typography } from "@mui/material";
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
      &nbsp;
      <Button onClick={(e) => props.getAPIData()} variant="contained">
        Get YOUR Data
      </Button>
      {/*  <Button onClick={(e) => props.alchemyUD()}>Get alchemyUD</Button> */}
      <Box></Box>
      {/*   <Button onClick={(e) => getAPIDataInternal()}>
        Get Etherscan API ERC20 TX Events
      </Button> */}
      {/* <Box>{JSON.stringify(props.alchemyResult, null, "\t")}</Box> */}
      <Box>
        {props.isFetched && props.alchemyResult && (
          <Box>
            <Box variant={"h2"} component={"h3"}>
              Records for Domain
            </Box>
            <Box
              style={{
                border: "solid",
                margin: "10px",
                padding: "10px",
                paddingLeft: "30px",
                borderWidth: "1px",

                textAlign: "left",
              }}
            >
              <Box>
                Your Domain name =&gt; {props.alchemyResult.data.meta.domain}
              </Box>
              <Box>
                Blockchain Domain minted on =&gt;{" "}
                {props.alchemyResult.data.meta.blockchain}
              </Box>
              <Box>
                Network Domain minted on =&gt;{" "}
                {props.alchemyResult.data.meta.networkId}
              </Box>

              <Box>
                Domain owner =&gt; {props.alchemyResult.data.meta.owner}
              </Box>
            </Box>
            <Box variant={"h2"} component={"h3"}>
              Domain Transfer Events{" "}
            </Box>
            {/* <Box>{JSON.stringify(props.secondAlchemyResult, null, "\t")}</Box> */}
            {props.secondAlchemyResult /* console.log(props.secondAlchemyResult)  */ &&
              props.secondAlchemyResult.data.data.map((e, index) => {
                return (
                  <Box
                    key={index}
                    style={{
                      border: "solid",
                      margin: "10px",
                      padding: "10px",
                      paddingLeft: "30px",
                      borderWidth: "1px",
                      textAlign: "left",
                    }}
                  >
                    {" "}
                    <Box>
                      Domain traded =&gt;{" "}
                      {props.secondAlchemyResult.data.data[index].domain}
                    </Box>
                    <Box>
                      From =&gt;{" "}
                      {props.secondAlchemyResult.data.data[index].from}
                    </Box>
                    <Box>
                      To =&gt; {props.secondAlchemyResult.data.data[index].to}
                    </Box>
                    <Box>
                      Blockchain =&gt;{" "}
                      {props.secondAlchemyResult.data.data[index].blockchain}
                    </Box>
                    <Box>
                      Network =&gt;{" "}
                      {props.secondAlchemyResult.data.data[index].networkId}
                    </Box>
                    <Box>
                      Blocknumber =&gt;{" "}
                      {props.secondAlchemyResult.data.data[index].blockNumber}
                    </Box>
                  </Box>
                );
              })}
          </Box>
        )}
      </Box>
      <Box>
        {/*  <Box>{JSON.stringify(props.normalTXHistory, null, "\t")}</Box> */}
        {props.isFetchedTX && props.normalTXHistory !== "" && (
          <Box>
            <Box variant={"h2"} component={"h3"}>
              "Normal" Transaction History of address{" "}
            </Box>
            <Box
              style={{
                border: "solid",
                margin: "10px",
                padding: "10px",
                borderWidth: "1px",
              }}
            >
              {/*   <Box> {JSON.stringify(props.normalTXHistory.data.result)}</Box> */}
              {/* <Box> {props.normalTXHistory.data.result[].from}</Box> */}
              {props.normalTXHistory.data.result.length !== 0 &&
                props.normalTXHistory.data.result[0] !== undefined &&
                /* console.log(props.normalTXHistory) */

                props.normalTXHistory.data.result.map((e, index) => {
                  return (
                    <Box
                      key={index}
                      style={{
                        border: "solid",
                        margin: "10px",
                        padding: "10px",
                        borderWidth: "1px",
                        textAlign: "left",
                      }}
                    >
                      <Typography variant={"h6"} component={"h3"}>
                        This is the {index + 1 + "th"} TX in your List
                      </Typography>
                      <Box>
                        Value send =&gt;{" "}
                        {props.normalTXHistory.data.result[index].value} WEI
                      </Box>
                      <Box>
                        From =&gt;{" "}
                        {props.normalTXHistory.data.result[index].from}
                      </Box>
                      <Box>
                        To =&gt; {props.normalTXHistory.data.result[index].to}
                      </Box>
                      <Box>
                        Gas Used =&gt;{" "}
                        {props.normalTXHistory.data.result[index].gasUsed}
                      </Box>
                      <Box>
                        Gas Price =&gt;
                        {props.normalTXHistory.data.result[index].gasPrice}
                      </Box>
                      <Box>
                        Hash of TX =&gt;{" "}
                        {props.normalTXHistory.data.result[index].hash}
                      </Box>

                      <Box>
                        Block-Number =&gt;
                        {props.normalTXHistory.data.result[index].blockNumber}
                      </Box>

                      <br></br>
                    </Box>
                  );
                })}
              <Button variant={"contained"} onClick={(e) => props.addNum(e)}>
                Load More
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Box>
        {props.isFetchedTX && props.internalTXHistory && (
          <Box>
            <Box variant={"h2"} component={"h3"}>
              "Internal" Transaction History of address{" "}
            </Box>
            <Box
              style={{
                border: "solid",
                margin: "10px",
                padding: "10px",
                borderWidth: "1px",
              }}
            >
              {/*   <Box> {JSON.stringify(props.internalTXHistory.data.result)}</Box> */}
              {props.internalTXHistory.data.result.length !== 0 &&
                props.internalTXHistory.data.result[0] !== undefined &&
                props.internalTXHistory.data.result.map((e, index) => {
                  return (
                    <Box
                      style={{
                        border: "solid",
                        margin: "10px",
                        padding: "10px",
                        borderWidth: "1px",
                        textAlign: "left",
                      }}
                      key={index}
                    >
                      {" "}
                      <Box>
                        <Typography variant={"h6"} component={"h3"}>
                          This is the {index + 1 + "th"} TX in your List
                        </Typography>
                      </Box>
                      <Box>
                        Value send:{" "}
                        {props.normalTXHistory.data.result[index].value} WEI
                      </Box>
                      <Box>
                        From: {props.normalTXHistory.data.result[index].from}
                      </Box>
                      <Box>
                        To: {props.normalTXHistory.data.result[index].to}
                      </Box>
                      <Box>
                        Gas Used:{" "}
                        {props.normalTXHistory.data.result[index].gasUsed}
                      </Box>
                      <Box>
                        Gas Price:
                        {props.normalTXHistory.data.result[index].gasPrice}
                      </Box>
                      <Box>
                        Hash of TX:{" "}
                        {props.normalTXHistory.data.result[index].hash}
                      </Box>
                      <Box>
                        Block-Number:
                        {props.normalTXHistory.data.result[index].blockNumber}
                      </Box>
                      {/* <Box>
                      Contract address:
                      {props.normalTXHistory.data.result[index].contractAddress}
                    </Box> */}
                      {/* <Box>
                Input: {props.normalTXHistory.data.result[index].input}
              </Box> */}
                      <br></br>
                    </Box>
                  );
                })}
              <Button variant={"contained"} onClick={(e) => props.addNum(e)}>
                Load More
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default EtherscanAPI;
