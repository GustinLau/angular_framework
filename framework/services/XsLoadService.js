/**
 *  XsLoadService is use to load css or js in lazyload
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 */

import Service from 'framework/lib/Service';

class XsLoadService extends Service {
    constructor(features, app) {
        super(features, app);
    }

    _load($document, $q, $timeout) {
        'ngInject';
        let loaded = [];
        let promise = false;
        let deferred = $q.defer();

        /**
         * Chain loads the given sources
         * @param srcs array, script or css
         * @returns {*} Promise that will be resolved once the sources has been loaded.
         */
        this.load = function (srcs) {
            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
            let self = this;
            if (!promise) {
                promise = deferred.promise;
            }
            angular.forEach(srcs, function (src) {
                promise = promise.then(function () {
                    return src.indexOf('.css') >= 0 ? self.loadCSS(src) : self.loadScript(src);
                });
            });
            deferred.resolve();
            return promise;
        };

        /**
         * Dynamically loads the given script
         * @param src The url of the script to load dynamically
         * @returns {*} Promise that will be resolved once the script has been loaded.
         */
        this.loadScript = function (src) {
            if (loaded[src]) return loaded[src].promise;

            let deferred = $q.defer();
            let script = $document[0].createElement('script');
            script.src = src;
            script.onload = function (e) {
                $timeout(function () {
                    deferred.resolve(e);
                });
            };
            script.onerror = function (e) {
                $timeout(function () {
                    deferred.reject(e);
                });
            };
            $document[0].body.appendChild(script);
            loaded[src] = deferred;

            return deferred.promise;
        };

        /**
         * Dynamically loads the given CSS file
         * @param href The url of the CSS to load dynamically
         * @returns {*} Promise that will be resolved once the CSS file has been loaded.
         */
        this.loadCSS = function (href) {
            if (loaded[href]) return loaded[href].promise;

            let deferred = $q.defer();
            let style = $document[0].createElement('link');
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = href;
            style.onload = function (e) {
                $timeout(function () {
                    deferred.resolve(e);
                });
            };
            style.onerror = function (e) {
                $timeout(function () {
                    deferred.reject(e);
                });
            };
            $document[0].head.appendChild(style);
            loaded[href] = deferred;

            return deferred.promise;
        };

    }

    execute() {
        this.service('xsLoad', this._load);
    }
}

export default XsLoadService;