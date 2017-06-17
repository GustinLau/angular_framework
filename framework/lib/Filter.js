/**
 *  Filter Base class
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 25, 2016
 */

class Filter {

    constructor(app) {
        this.filter = app.filter;
    }

    execute() {
    }
}

export default Filter;