/**
 *
 *
 * @author  Gustin Lau
 * @date    14/06/2017.
 */

import Toastr from 'utils/Toastr';
import Loading from 'utils/Loading';

class Example1Controller{

    /** @ngInject */
    constructor($scope,xsPermission) {
        this.$scope = $scope;
        this.xsPermission=xsPermission;
        this._init_();
        this._destroy_();
    }

    _init_() {
        this.xsPermission.requestPermissions();
    }

    toastr(){
        Toastr.success("Hello");
    }

    loading(){
        Loading.show();
        setTimeout(function () {
            Loading.hide();
        },3000)
    }


    _destroy_() {
        this.$scope.$on('$destroy', function () {
        });
    }
}

export default Example1Controller;