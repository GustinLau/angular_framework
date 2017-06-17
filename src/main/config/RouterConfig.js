/**
 *  RouterConfig collect route information from each feature and combine them
 *  with ui.route.
 *
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 *
 */

import XsRouterConfig from 'framework/config/XsRouterConfig';

class RouterConfig extends XsRouterConfig {

    constructor(features, app) {
        super(features, app);
    }

    _routeConfig($stateProvider, $urlRouterProvider) {
        //路由配置
        super._routeConfig($stateProvider,$urlRouterProvider);
    }

}

export default RouterConfig;
