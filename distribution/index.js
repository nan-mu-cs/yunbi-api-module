"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by kai on 2017/7/9.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _nonce = require("nonce");

var _nonce2 = _interopRequireDefault(_nonce);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _request2 = require("request");

var _request3 = _interopRequireDefault(_request2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YunbiAPI = function () {
    function YunbiAPI(key, secret) {
        _classCallCheck(this, YunbiAPI);

        this.key = key;
        this.secret = secret;
        this.host = "https://yunbi.com/";
        this.USER_AGENT = "Yunbi API Client/0.0.1";
        this.nonce = new _nonce2.default();
    }

    _createClass(YunbiAPI, [{
        key: "_getSignature",
        value: function _getSignature(method, path) {
            var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


            parameters.tonce = parseInt(this.nonce() / 100);
            parameters.access_key = this.key;

            var paramString = Object.keys(parameters).sort(parameters).map(function (param) {
                return encodeURIComponent(param) + '=' + encodeURIComponent(parameters[param]);
            }).join('&');

            var url = method + "|" + path + "|" + paramString;

            var signature = _crypto2.default.createHmac('sha256', this.secret).update(url).digest('hex');
            paramString = paramString + "&" + encodeURIComponent('signature') + "=" + encodeURIComponent(signature);
            return {
                signature: signature,
                paramString: paramString
            };
        }
    }, {
        key: "_request",
        value: function _request(options, callback) {
            (0, _request3.default)(options, function (err, response, body) {
                // Empty response
                if (!err && (typeof body === 'undefined' || body === null)) {
                    err = 'Empty response';
                }
                if (callback != 'undefined') {
                    callback(err, body);
                }
            });
        }
    }, {
        key: "_privateRequest",
        value: function _privateRequest(method, path, parameters, data, callback) {
            method = method.toUpperCase();

            var _getSignature2 = this._getSignature(method, path, parameters),
                signature = _getSignature2.signature,
                paramString = _getSignature2.paramString;

            var options = {
                host: this.host,
                path: path,
                method: method,
                headers: {
                    access_key: this.key,
                    signature: signature,
                    UserAgent: this.USER_AGENT
                }
            };
            options["url"] = this.host + "/" + path + "?" + paramString;
            this._request(options, callback);
        }
    }, {
        key: "_publicRequest",
        value: function _publicRequest(path, parameters, callback) {
            var options = {
                method: 'GET',
                url: this.host + path,
                qs: parameters
            };
            this._request(options, callback);
        }

        //public api

    }, {
        key: "getTicker",
        value: function getTicker(marketId, callback) {
            this._publicRequest("/api/v2/tickers/" + marketId + ".json", {}, callback);
        }
    }, {
        key: "getAllTicker",
        value: function getAllTicker(callback) {
            this._publicRequest("/api/v2/tickers", {}, callback);
        }
    }, {
        key: "getMarkets",
        value: function getMarkets(callback) {
            this._publicRequest("/api/v2/markets.json", {}, callback);
        }
    }, {
        key: "getTimeStamp",
        value: function getTimeStamp(callback) {
            this._publicRequest("/api/v2/timestamp.json", {}, callback);
        }
    }, {
        key: "getOrderBook",
        value: function getOrderBook(market, options, callback) {
            var parameters = Object.assign({}, { market: market }, options);
            this._publicRequest("/api/v2/order_book.json", parameters, callback);
        }
    }, {
        key: "getTrades",
        value: function getTrades(market, options, callback) {
            var parameters = Object.assign({}, { market: market }, options);
            this._publicRequest("/api/v2/trades.json", parameters, callback);
        }
    }, {
        key: "getDepth",
        value: function getDepth(market, options, callback) {
            var parameters = Object.assign({}, { market: market }, options);
            this._publicRequest("/api/v2/depth.json", parameters, callback);
        }
    }, {
        key: "getK",
        value: function getK(market, options, callback) {
            var parameters = Object.assign({}, { market: market }, options);
            this._publicRequest("/api/v2/k.json", parameters, callback);
        }
    }, {
        key: "getKPendingTrades",
        value: function getKPendingTrades(market, trade_id, options, callback) {
            var parameters = Object.assign({}, { market: market, trade_id: trade_id }, options);
            this._publicRequest("/api/v2/k_with_pending_trades.json", parameters, callback);
        }

        //private get api

    }, {
        key: "getDeposits",
        value: function getDeposits(currency, options, callback) {
            this._privateRequest("GET", "/api/v2/deposits", { currency: currency }, {}, callback);
        }
    }, {
        key: "getAccount",
        value: function getAccount(callback) {
            this._privateRequest("GET", "/api/v2/members/me.json", {}, {}, callback);
        }
    }, {
        key: "getDeposit",
        value: function getDeposit(txid, callback) {
            this._privateRequest("GET", "/api/v2/deposit.json", { txid: txid }, {}, callback);
        }
    }, {
        key: "getDepositAddress",
        value: function getDepositAddress(currency, callback) {
            this._privateRequest("GET", "/api/v2/deposit_address.json", { currency: currency }, {}, callback);
        }
    }, {
        key: "getOrders",
        value: function getOrders(market, options, callback) {
            var parameters = Object.assign({ market: market }, options);
            this._privateRequest("GET", "/api/v2/orders.json", parameters, {}, callback);
        }
    }, {
        key: "getOrder",
        value: function getOrder(id, callback) {
            this._privateRequest("GET", "/api/v2/order.json", { id: id }, {}, callback);
        }
    }, {
        key: "getAccountTrades",
        value: function getAccountTrades(market, options, callback) {
            var parameters = Object.assign({ market: market }, options);
            this._privateRequest("GET", "/api/v2/trades/my.json", parameters, {}, callback);
        }

        //private post api

    }, {
        key: "cancelAllOrders",
        value: function cancelAllOrders(options, callback) {
            this._privateRequest("POST", "/api/v2/orders/clear.json", options, {}, callback);
        }
    }, {
        key: "cancelOrder",
        value: function cancelOrder(id, callback) {
            this._privateRequest("POST", "/api/v2/order/delete.json", { id: id }, {}, callback);
        }
    }, {
        key: "createOrder",
        value: function createOrder(market, side, volume, price, options, callback) {
            var parameters = Object.assign({
                market: market, side: side, volume: volume, price: price
            }, options);
            this._privateRequest("POST", "/api/v2/orders.json", parameters, {}, callback);
        }
    }]);

    return YunbiAPI;
}();

module.exports = YunbiAPI;