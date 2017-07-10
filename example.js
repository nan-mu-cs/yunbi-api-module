/**
 * Created by kaiyan2 on 7/10/17.
 */
var Yunbi = require("./distribution/index");

var yunbi = new Yunbi();

yunbi.getAllTicker(function (error,data) {
    console.log(data);
});

yunbi.getMarkets(function (error,data) {
    console.log(data);
});