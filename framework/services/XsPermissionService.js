/**
 *  XsPermissionService need to extends to set the `requestPermissions` method
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 */

import Service from 'framework/lib/Service';

class XsPermissionService extends Service {

    constructor(features, app) {
        super(features, app);





    }

    _permission($rootScope) {
        //权限列表
        //TODO implementation in sub class this.permissions=[];

        //权限检查
        let _permissionCheck = (permissions, permissionName) => {
            return (permissions.indexOf(permissionName) > -1);
        };
        //数组去重
        let _unique = (arr) => {
            let res = [];
            for (let i = 0, len = arr.length; i < len; i++) {
                let obj = arr[i];
                if (res.indexOf(obj) === -1) res.push(obj);
            }
            return res;
        };

        //请求权限接口
        //TODO implementation in sub class this.requestPermissions = () => {};

        //更新权限并发起广播接口
        this.pushPermission = (permissions) => {
            this.permissions = _unique(this.permissions.concat(permissions));
            $rootScope.$broadcast('permissionsChanged');
        };

        //权限判断接口
        this.hasPermission = (permissionStr) => {
            permissionStr = permissionStr.trim();
            if (permissionStr.indexOf("\|") > -1) {// 多权限 或
                let permissions = permissionStr.split('\|');
                let hasPermissionFlag = false;
                for (let i = 0; i < permissions.length; i++) {
                    if (_permissionCheck(this.permissions, permissions[i].trim())) {
                        hasPermissionFlag = true;
                        break;
                    }
                }
                return hasPermissionFlag;
            } else if (permissionStr.indexOf("\&") > -1) { //多权限 并
                let permissions = permissionStr.split('\&');
                let hasPermissionFlag = true;
                for (let i = 0; i < permissions.length; i++) {
                    if (!_permissionCheck(this.permissions, permissions[i].trim())) {
                        hasPermissionFlag = false;
                        break;
                    }
                }
                return hasPermissionFlag;
            } else {
                return _permissionCheck(this.permissions, permissionStr);
            }
        }
    }

    execute() {
        this._permission.$inject = ['$rootScope'];
        this.service('xsPermission', this._permission);
    }

}

export default XsPermissionService;