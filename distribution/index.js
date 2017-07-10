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
    }

    _createClass(YunbiAPI, [{
        key: "_getSignature",
        value: function _getSignature(method, path) {
            var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


            parameters.tonce = parseInt((0, _nonce2.default)() / 100);
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

                callback(err, body);
            });
        }
    }, {
        key: "_privateRequest",
        value: function _privateRequest(method, path, data, callback, parameters) {
            method = method.toUpperCase();

            var _getSignature2 = this._getSignature(method, path, parameters),
                signature = _getSignature2.signature,
                paramString = _getSignature2.paramString;

            var options = {
                host: this.host,
                path: path,
                method: method,
                headers: {
                    Key: this.key,
                    Sign: signature,
                    UserAgent: this.USER_AGENT
                }
            };
            if (method === "GET") {
                options["url"] = this.host + "/" + this.path + "?" + paramString;
            } else if (method === "POST") {
                options["form"] = parameters;
            }
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
    }]);

    return YunbiAPI;
}();

module.exports = YunbiAPI;