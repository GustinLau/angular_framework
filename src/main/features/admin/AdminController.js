/**
 *  Defines the HomeController controller
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 *
 */

class AdminController {
    /** @ngInject */
    constructor($scope) {
        this.$scope = $scope;
        this._init_();
        this._destroy_();
    }

    _init_() {
    }

    _destroy_() {
        this.$scope.$on('$destroy', function () {
        });
    }
}

export default AdminController;
