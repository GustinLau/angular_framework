/**
 *  Defines the LoginController controller
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 *
 */


class LoginController {
    /** @ngInject */
    constructor($scope, $state) {
        this.$scope = $scope;
        this.$state=$state;
        this._init_();
        this._destroy_();
    }


    _init_() {
        this.user = {};
        this.disableBtn = false;
        this.authError = '　';
    }

    loginSubmit() {
        this.disableBtn = true;
        this.authError = '　';
        if(this.user.username===this.user.password){
            this.$state.go("admin");//跳转
        }else{
            this.disableBtn = false;
            this.authError = "用户名或密码错误";
            // this.$scope.$apply();
        }
    }

    _destroy_() {
        this.$scope.$on('$destroy', ()=> {
        });
    }
}

export default LoginController;
