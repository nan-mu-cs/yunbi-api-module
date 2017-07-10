/**
 * Created by kaiyan2 on 7/10/17.
 */
var Yunbi = require("./distribution/index");
var token = require("./token");

var yunbi = new Yunbi(token.accessKey,token.secretKey);

// public API

// yunbi.getAllTicker(function (error,data) {
//     console.log("getAllTicker");
//     console.log(data);
// });
//
// yunbi.getMarkets(function (error,data) {
//     console.log("getMarkets");
//     console.log(data);
// });
//
// yunbi.getTicker("btccny",function (error,data) {
//    console.log("getTicker");
//    console.log(data);
// });
//
// yunbi.getTimeStamp(function (error,data) {
//    console.log("getTimeStamp");
//    console.log(data);
// });
//
// yunbi.getOrderBook("btccny",{},function (error,data) {
//     console.log("getOrderBook");
//     console.log(data);
// });
//
// yunbi.getTrades("btccny",{},function (error,data) {
//     console.log("getTrades");
//     console.log(data);
// });
//
// yunbi.getDepth("btccny",{},function (error,data) {
//     console.log("getDepth");
//     console.log(data);
// });
//
// yunbi.getK("btccny",{},function (error,data) {
//     console.log("getK");
//     console.log(data);
// });


//private get api
// yunbi.getDeposits("btc",{},function (error,data) {
//     console.log("getDeposits");
//     console.log(data);
// });
//
// yunbi.getAccount(function (error,data) {
//     console.log("getAccount");
//     console.log(data);
// });

// yunbi.getDeposit("93b491fae50f20e8c0e5fa3324d920bd282122fc727f957f82ae1de9aad49cb4",function (error,data) {
//     console.log("getDeposit");
//     console.log(data);
// });

// yunbi.getDepositAddress("btc",function (error,data) {
//    console.log("getDepositAddress");
//    console.log(data);
// });

// yunbi.getOrders("anscny",{},function (error,data) {
//     console.log("getOrders");
//     console.log(data);
// });

// yunbi.getOrder("441738092",function (error,data) {
//    console.log("getOrder");
//    console.log(data);
// });
//
// yunbi.getAccountTrades("anscny",{},function (error,data) {
//     console.log("getAccountTrades");
//     console.log(data);
// });


// private post api


// yunbi.cancelAllOrders({},function (error,data) {
//     console.log("cancelAllOrders");
//     console.log(data);
// });

// yunbi.cancelOrder("452416228",function (error,data) {
//    console.log("cancelOrder");
//    console.log(data);
// });
// yunbi.createOrder("eoscny","sell","10","30",{},function (error,data) {
//    console.log("createOrder");
//    console.log(data);
// });

