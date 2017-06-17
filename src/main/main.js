/**
 *  Bootstrap
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 *
 */

import angular from 'angular';
import {Splash} from 'splash-screen';
import Initializers from 'framework/init/main';

import Framework_Configurators from 'framework/config/main';
import Custom_Configurators from 'config/main';
import Framework_Directives from 'framework/directives/main';
import Custom_Directives from 'directives/main';
import Framework_Extensions from 'framework/extensions/main';
import Custom_Extensions from 'extensions/main';
import Framework_Filters from 'framework/filters/main';
import Custom_Filters from 'filters/main';
import Framework_Interceptors from 'framework/interceptors/main';
import Custom_Interceptors from 'interceptors/main';
import Framework_Services from 'framework/services/main';
import Custom_Services from 'services/main';
import Features from 'features/main';
import __config from 'config';

class App {

    constructor() {
        this.Configurators = [...Framework_Configurators, ...Custom_Configurators];
        this.Directives = [...Framework_Directives, ...Custom_Directives];
        this.Extensions = [...Framework_Extensions, ...Custom_Extensions];
        this.Filters = [...Framework_Filters, ...Custom_Filters];
        this.Interceptors = [...Framework_Interceptors, ...Custom_Interceptors];
        this.Services = [...Framework_Services, ...Custom_Services];
        this.appName = __config.appName;
        Features.forEach(function (Feature) {
            this.push(new Feature());
        }, this.features = []);
    }

    _findDependencies() {
        this.depends = this.Extensions.slice(0);
        var featureNames = this.features
            .filter(feature => feature.export)
            .map(feature => feature.export);
        this.depends.push(...featureNames);
    }

    _setInterceptors() {
        this.Interceptors.forEach(function (Interceptor) {
            this.push(new Interceptor());
        }, this.interceptors = []);
        var interceptorsNames = this.interceptors
            .filter(interceptor => interceptor.export)
            .map(interceptor => interceptor.export);
        this.depends.push(...interceptorsNames);
        this.interceptors.forEach(interceptor => {
            interceptor.beforeStart();
            interceptor.execute();
        }, this)
    }

    _beforeStart() {
        Initializers.forEach(function (Initializer) {
            (new Initializer(this.features)).execute();
        }, this);
        this.features.forEach(feature => feature.beforeStart());
    }

    _createApp() {
        this.features.forEach(feature => feature.execute());
        this.app = angular.module(this.appName, this.depends);
    }

    _configApp() {
        this.Configurators.forEach(function (Configurator) {
            (new Configurator(this.features, this.app)).execute();
        }, this);
    }

    _createDirectives() {
        this.Directives.forEach(function (Directive) {
            (new Directive(this.app)).execute();
        }, this);
    }

    _createFilters() {
        this.Filters.forEach(function (Filter) {
            (new Filter(this.app)).execute();
        }, this);
    }

    _registerService() {
        this.Services.forEach(function (Service) {
            (new Service(this.features, this.app)).execute();
        }, this);
    }

    _settingBaseController() {
        this.app.controller('AppController', ['$scope', '$state', '$window', 'xsApp',
            function ($scope, $state, $window, xsApp) {

                function isSmartDevice($window) {
                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
                }

                // add 'ie' classes to html
                var isIE = !!navigator.userAgent.match(/MSIE/i);
                isIE && angular.element($window.document.body).addClass('ie');
                isSmartDevice($window) && angular.element($window.document.body).addClass('smart');


                // config
                $scope.app = {
                    name: __config.title,
                    version: __config.version,
                };

                //TODO 自定义方法
                $scope.app.customMethod = () => {
                    alert("Custom method in BaseController");
                }

            }]);
    }


    _destroySplash() {
        var _this = this;
        Splash.destroy();
        setTimeout(function () {
            if (Splash.isRunning()) {
                _this.destroySplash();
            }
        }, 100);
    }

    _launch() {
        angular.bootstrap(document, [this.appName]);
    }

    run() {
        this._findDependencies();
        this._setInterceptors();
        this._beforeStart();
        this._createApp();
        this._configApp();
        this._createDirectives();
        this._createFilters();
        this._registerService();
        this._settingBaseController();
        this._destroySplash();
        this._launch();
    }
}

export default App;