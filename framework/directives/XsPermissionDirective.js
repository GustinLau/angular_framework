/**
 *  XsPermissionDirective create an 'A' directive to make the element show or remove it
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 */

import Directive from 'framework/lib/Directive';

class XsPermissionDirective extends Directive {

    constructor(app) {
        super(app);
    }

    _xsPermission(xsPermission) {
        'ngInject';
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                if (typeof $attrs.xsPermission !== 'string')
                    throw "the value of xs-permission must be a string!";

                let permissionName = $attrs.xsPermission.trim();
                let notPermission = (permissionName[0] === '!');
                if (notPermission) {
                    permissionName = permissionName.slice(1).trim();
                }
                function setVisibility() {
                    console.log(xsPermission.permissions);
                    let hasPermission = xsPermission.hasPermission(permissionName);
                    if (hasPermission && !notPermission || !hasPermission && notPermission) {
                        $element.show();
                    } else {
                        $element.remove();
                    }
                }
                setVisibility();
                $scope.$on('permissionsChanged', setVisibility);
            }
        }
    }

    execute() {
        this.directive('xsPermission', this._xsPermission);
    }
}

export default XsPermissionDirective;