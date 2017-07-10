/**
 * Created by kaiyan2 on 7/10/17.
 */
var Yunbi = require("./distribution/index");
var token = require("./token");

var yunbi = new Yunbi(token.accessKey,token.secretKey);

// public API

yunbi.getAllTicker(function (error,data) {
    console.log("getAllTicker");
    console.log(data);
});

yunbi.getMarkets(function (error,data) {
    console.log("getMarkets");
    console.log(data);
});

yunbi.getTicker("btccny",function (error,data) {
   console.log("getTicker");
   console.log(data);
});

yunbi.getTimeStamp(function (error,data) {
   console.log("getTimeStamp");
   console.log(data);
});

yunbi.getOrderBook("btccny",{},function (error,data) {
    console.log("getOrderBook");
    console.log(data);
});

yunbi.getTrades("btccny",{},function (error,data) {
    console.log("getTrades");
    console.log(data);
});

yunbi.getDepth("btccny",{},function (error,data) {
    console.log("getDepth");
    console.log(data);
});

yunbi.getK("btccny",{},function (error,data) {
    console.log("getK");
    console.log(data);
});

