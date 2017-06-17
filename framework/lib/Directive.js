/**
 *  Directive Base class
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 25, 2016
 *
 */

class Directive {

    constructor(app) {
        this.directive = app.directive;
    }

    execute() {
    }
}

export default Directive;