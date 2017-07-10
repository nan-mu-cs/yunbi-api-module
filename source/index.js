/**
 * Created by kai on 2017/7/9.
 */
import nonce from "nonce";
import crypto from "crypto";
import request from "request";

class YunbiAPI {
    constructor(key, secret) {
        this.key = key;
        this.secret = secret;
        this.host = "https://yunbi.com/";
        this.USER_AGENT = "Yunbi API Client/0.0.1";
    }
    _getSignature(method,path,parameters={}){

        parameters.tonce = parseInt(nonce()/100);
        parameters.access_key = this.key;

        let paramString = Object.keys(parameters).sort(parameters).map(function(param){
            return encodeURIComponent(param) + '=' + encodeURIComponent(parameters[param]);
        }).join('&');

        const url = `${method}|${path}|${paramString}`;

        const signature = crypto.createHmac('sha256', this.secret).update(url).digest('hex');
        paramString = paramString +"&"+encodeURIComponent('signature') + "=" + encodeURIComponent(signature);
        return {
            signature,
            paramString
        }
    }

    _request(options,callback){
        request(options, function(err, response, body) {
            // Empty response
            if (!err && (typeof body === 'undefined' || body === null)){
                err = 'Empty response';
            }

            callback(err, body);
        });
    }
    _privateRequest(method, path, data, callback, parameters) {
        method = method.toUpperCase();
        const {signature,paramString} = this._getSignature(method,path,parameters);
        let options = {
            host: this.host,
            path: path,
            method: method,
            headers: {
                Key: this.key,
                Sign: signature,
                "User-Agent": this.USER_AGENT
            }
        };
        if(method === "GET"){
            options["url"] = `${this.host}/${this.path}?${paramString}`;
        } else if(method === "POST"){
            options["form"] = parameters
        }
        this._request(options,callback);
    }

}

module.exports = YunbiAPI;