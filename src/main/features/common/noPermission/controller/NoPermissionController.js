/**
 *  Defines the HomeController NoPermissionController
 *
 *  @author  Gustin Lau
 *  @date    Nov 27, 2016
 *
 */

import Base64 from 'utils/Base64';
import JSON from 'JSON';

class NoPermissionController {
    /** @ngInject */
    constructor($scope, $stateParams, $state, $location) {
        this.$scope = $scope;
        this.$state = $state;
        this.$location = $location;
        this.from = Base64.decode($stateParams.from);//返回路由名称
        this.params = JSON.parse(Base64.decode($stateParams.params));//返回路由参数
        this.second = 5;//等待时间
        this.goToDefault = false;//是否返回默认页面
        this._init_();
        this._destroy_();

    }

    _init_() {
        if (this.from === '') {
            this.goToDefault = true;
        }
        this._timeout();
    }

    _timeout() {
        let second = this.second - 1;
        if (second >= 0) {
            setTimeout(()=> {
                this.$scope.$apply(()=> {
                    this.second = second;
                    this._timeout();
                });
            }, 1000);
        } else {
            this.goBack();
        }
    }

    goBack() {
        if (this.goToDefault) {
            this.$location.path('/_' + ((Math.random() + '').slice(2)));
        } else {
            this.$state.go(this.from, this.params);
        }
    }

    _destroy_() {
        this.$scope.$on('$destroy', function () {
        });
    }
}

export default NoPermissionController;
