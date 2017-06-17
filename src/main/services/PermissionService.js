/**
 * 权限服务
 * Created by Gustin Lau on 2016-11-26.
 */


import XsPermissionService from 'framework/services/XsPermissionService';

class PermissionService extends XsPermissionService {

    constructor(features, app) {
        super(features, app);
    }

    static init($rootScope) {
        let _permissions;
        //TODO 同步请求获取权限

        //仅用于测试，请根据实际情况修改
        _permissions = ["permission_1", "permission_2"];
        return _permissions;
    }

    _permission($rootScope) {
        //实现父级 this.permission
        this.permissions = PermissionService.init($rootScope);
        $rootScope.$broadcast('permissionsChanged');
        //实现父级 this.requestPermissions
        this.requestPermissions = () => {
            //TODO 同步请求获取权限

            //仅用于测试，请根据实际情况修改
            this.pushPermission(["permission_3", "permission_4"]);
        };

        super._permission($rootScope);
    }


}

export default PermissionService;
