/* jslint esversion: 6, node: true */
/* global XMLHttpRequest */
'use strict';

/**
 * Perform simple requests
 */
export default function Request () {
    /**
     * Send an XMLHttpRequest
     *
     * @param {String} url Request URL
     * @param  {Object} params Request parameters
     *
     * @return {Promise} XMLHttpRequest response/error
     */
    function send (url, data = {}, params = {}) {
        let defaults = {
            method       : 'GET',
            requestType  : 'json',
            responseType : 'json',
        };

        params = Object.assign({}, defaults, params);

        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();

            request.open(params.method, url);
            request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            request.setRequestHeader("Content-type", getContentType(params.requestType));

            request.onload = function() {
                if (request.status == 200) {
                    resolve(formatResponseFromRequest(request, params.responseType));
                } else {
                    reject(Error(request.statusText));
                }
            };

            request.onerror = function() {
                reject(Error("Network Error"));
            };

            request.send(JSON.stringify(data));
        });
    }

    /**
     * Gets an appropriate content type
     *
     * @param  {String} type Content type parameter
     *
     * @return {String} Converted content type
     */
    function getContentType (type) {
        let types = {
            json : 'application\/json',
            text : 'text\/plain',
        };

        if (types.hasOwnProperty(type)) {
            return types[type];
        } else {
            throw new Error('Content type not allowed');
        }
    }

    /**
     * Formats a response from a request object
     *
     * @param  {Object} request Request object
     * @param  {String} type Content type
     *
     * @return {Object} Formatted response
     */
    function formatResponseFromRequest (request, type) {
        let data = request.response || request.responseText;

        // Parse JSON responses
        if (type === 'json') {
            try {
                data = JSON.parse(data);
            } catch (error) {
                throw new Error('Cannot parse JSON response');
            }
        }

        return {
            status     : request.status,
            data       : data,
            statusText : request.statusText,
        };
    }

    /**
     * Perform a GET request
     *
     * @param  {String} url Request URL
     * @param  {Object} params Request parameters
     *
     * @return {Promise} Request response promise
     */
    function get (url, params = {}) {
        params.method = 'GET';

        return send(url, null, params);
    }

    /**
     * Perform a POST request
     *
     * @param  {String} url Request URL
     * @param  {Object} params Request parameters
     *
     * @return {Promise} Request response promise
     */
    function post (url, data = {}, params = {}) {
        params.method = 'POST';

        return send(url, data, params);
    }

    return {
        get,
        post,
    };
}
