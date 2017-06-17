/**
 *  Http请求工具类
 *
 *
 *  @author  Gustin Lau
 *  @date    14/06/2017
 *
 */
import JsonUtils from './JsonUtils';
import Loading from './Loading';

import {HEADERS} from '../constants/HttpConstants'

class Http {

    //异步请求
    static doPost($timeout, api, data, callback, errorCallback) {
        let showLoading, loadingTimeout;
        if ($timeout !== null) {
            showLoading = false;
            loadingTimeout = $timeout(() => {
                Loading.show();
                showLoading = true;
            }, 500);
        }
        $.ajax({
            url: api,
            type: "POST",
            xhrFields: {
                withCredentials: true
            },
            headers: HEADERS,
            crossDomain: true,
            data: JsonUtils.serialize(data),
            success: function (data) {
                if ($timeout !== null) {
                    $timeout.cancel(loadingTimeout);
                    if (showLoading) {
                        Loading.hide();
                        showLoading = false;
                    }
                }
                if (callback !== null)
                    callback(data);
            },
            error: function (data) {
                if ($timeout !== null) {
                    $timeout.cancel(loadingTimeout);
                    if (showLoading) {
                        Loading.hide();
                        showLoading = false;
                    }
                }
                if (errorCallback !== null) {
                    errorCallback(data);
                }
            }
        });
    }


    //同步请求
    static doSynPost(api, data, callback, errorCallback) {
        $.ajax({
            url: api,
            type: "POST",
            async: false,
            xhrFields: {
                withCredentials: true
            },
            headers: HEADERS,
            crossDomain: true,
            data: JsonUtils.serialize(data),
            success: function (data) {
                if (callback !== null)
                    callback(data);
            },
            error: function (data) {
                if (errorCallback !== null) {
                    errorCallback(data);
                }
            }
        });
    }

    static uploadFile(Upload, url, data, callback, errorCallback) {
        Upload.upload({
            url: url,
            data: data,
            headers: HEADERS,
            withCredentials: true
        }).then(function (resp) {
            if (resp.status === 200) {
                return resp.data;
            } else {
                if (errorCallback !== null) {
                    errorCallback();
                }
                return {status: false}
            }
        }).then(function (json) {
            if (callback !== null)
                callback(json);
        })
    }

}

export default Http;