/**
 *  RouterConfig collect route information from each feature and combine them
 *  with ui.route.
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 */

import Configurator from 'framework/lib/Configurator';
import Pluck from 'framework/lib/Pluck';

class XsRouterConfig extends Configurator {

    constructor(features, app) {
        super(features, app);
    }

    _routeConfig($stateProvider, $urlRouterProvider) {
        //路由配置
        this.routes.forEach(function (route) {
            $stateProvider
                .state(route.id, route.state);
        });
        //config default page
        let defaultRouter = this.routes.filter(route => route.isDefault)[0];
        if (defaultRouter) {
            $urlRouterProvider.otherwise(defaultRouter.state.url);
        }
    }

    _filterRoutes() {
        return this.features
            .filter(feature => feature.routes && feature.routes.length > 0)
            .map(feature => feature.routes)
            .reduce((previous, current) => previous.concat(current), []);
    }

    //Router Check
    _startupWarning(routes, defaultRoutes) {
        if (defaultRoutes.length === 0) {
            console.warn('There is no any default route set. Try setting isDefault to the route you preferred');
        } else if (defaultRoutes.length > 1) {
            let defaultUrlIds = Pluck(defaultRoutes, 'id');
            console.warn('You have set [' + defaultRoutes.length + '] default routes, they are [' + defaultUrlIds.join(', ') + ']. Try to correct it');
        }

        let routeIds = Pluck(routes, 'id').sort();
        for (let i = 0; i < routeIds.length - 1; i++) {
            if (routeIds[i] === routeIds[i + 1]) {
                throw new Error('Duplicated Route: [ ' + routeIds[i] + ' ]');
            }
        }
    }

    execute() {
        if (!this.features || this.features.length === 0) {
            console.warn('No features loaded');
            return;
        }

        this.routes = this._filterRoutes();

        let defaultRoutes = this.routes.filter(route => route.isDefault);

        this._startupWarning(this.routes, defaultRoutes);

        this.constant('Routes', this.routes);

        let routeConfig = this._routeConfig.bind(this);
        routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

        this.config(routeConfig);
    }
}

export default XsRouterConfig;