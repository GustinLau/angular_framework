/**
 *  PermissionRouteInterceptor
 *  block the request if the user have no permission
 *
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 *
 */
import Feature from 'framework/lib/Feature';
import JSON from 'JSON';
import Base64 from 'utils/Base64';

class PermissionRouteInterceptor extends Feature {

    constructor() {
        super('permissionRouteInterceptor');
    }

    _interceptor($rootScope, $state, xsPermission) {
        'ngInject';
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            let _permission = toState.permission;
            if (typeof _permission === 'string' && !xsPermission.hasPermission(_permission)) {
                event.preventDefault();// 取消默认跳转行为
                let from = fromState.name;
                if (from === 'noPermission') {
                    from = '';
                }
                let params = Base64.encode(JSON.stringify(fromParams));
                from = Base64.encode(from);
                $state.go("noPermission", {from: from, params: params});//跳转返回
            }
        });
    }

    execute() {
        this.run(this._interceptor);
    }
}

export default PermissionRouteInterceptor;
