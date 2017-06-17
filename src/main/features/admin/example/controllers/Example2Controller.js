/**
 *
 *
 * @author  Gustin Lau
 * @date    14/06/2017.
 */

class Example2Controller{
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

export default Example2Controller;