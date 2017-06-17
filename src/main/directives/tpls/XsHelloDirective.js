/**
 * template directive to replace `ng-include` directive
 *
 * @author  Gustin Lau
 * @date    14/06/2017.
 */
import Directive from 'framework/lib/Directive';
import hello from 'templates/hello.html';

class XsHelloDirective extends Directive {

    constructor(app) {
        super(app);
    }

    _hello() {
        return {
            restrict: 'EA',
            template: hello,
            replace:true
        }
    }

    execute() {
        this.directive('xsHello', this._hello);
    }
}

export default XsHelloDirective;