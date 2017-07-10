# yunbi-api-module
## Set up
### Install 
``
npm install yunbi-api-module
``
### Create instance
```
var Yunbi = require("yunbi-api-module");  
var yunbi = new Yunbi(accessKey,secretKey);
```
### Call API 
``
yunbi.getAllTicker(function (error,data) {});
``
## Api List

### Public API

yunbi.getAllTicker(function (error,data) {});

yunbi.getMarkets(function (error,data) {});

yunbi.getTicker(market,function (error,data) {});

yunbi.getTimeStamp(function (error,data) {});

yunbi.getOrderBook(market,options,function (error,data) {});

yunbi.getTrades(market,options,function (error,data) {});

yunbi.getDepth(market,options,function (error,data) {});

yunbi.getK(market,options,function (error,data) {});


### Private Get API

yunbi.getDeposits(currency,options,function (error,data) {});

yunbi.getAccount(function (error,data) {});

yunbi.getDeposit(txid,function (error,data) {});

yunbi.getDepositAddress(currency,function (error,data) {});

yunbi.getOrders(market,options,function (error,data) {});

yunbi.getOrder(orderid,function (error,data) {});

yunbi.getAccountTrades(market,options,function (error,data) {});

### Private Post API

yunbi.cancelAllOrders(options,function (error,data) {});

yunbi.cancelOrder(orderid,function (error,data) {});

yunbi.createOrder(market,side,amount,price,options,function (error,data) {});


## Parameters
### market
Unique market id. It's always in the form of xxxyyy, where xxx is the base currency code, yyy is the quote currency code, e.g. 'btccny'.
Available market (2017.07.10), you can also call ``yunbi.getMarkets();`` API to get all available markets:
```
{
    "id": "btccny",
    "name": "BTC/CNY"
  },
  {
    "id": "ethcny",
    "name": "ETH/CNY"
  },
  {
    "id": "dgdcny",
    "name": "DGD/CNY"
  },
  {
    "id": "btscny",
    "name": "BTS/CNY"
  },
  {
    "id": "sccny",
    "name": "SC/CNY"
  },
  {
    "id": "etccny",
    "name": "ETC/CNY"
  },
  {
    "id": "1stcny",
    "name": "1SŦ/CNY"
  },
  {
    "id": "repcny",
    "name": "REP/CNY"
  },
  {
    "id": "anscny",
    "name": "ANS/CNY"
  },
  {
    "id": "zeccny",
    "name": "ZEC/CNY"
  },
  {
    "id": "zmccny",
    "name": "ZMC/CNY"
  },
  {
    "id": "gntcny",
    "name": "GNT/CNY"
  },
  {
    "id": "qtumcny",
    "name": "QTUM/CNY"
  },
  {
    "id": "gxscny",
    "name": "GXS/CNY"
  },
  {
    "id": "eoscny",
    "name": "EOS/CNY"
  }
```
### side
'sell' or 'buy'
