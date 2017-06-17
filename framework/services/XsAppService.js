/**
 *  XsAppService is use to get the `app` variable
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 */

import Service from 'framework/lib/Service';

var xsApp;

class XsAppService extends Service {
    constructor(features, app) {
        super(features, app);
        XsAppService.init(app);
    }

    static init(app) {
        xsApp = app;
    }

    _app() {
        this.getApp = () => {
            return xsApp;
        }
    }

    execute() {
        this.service('xsApp', this._app);
    }
}

export default XsAppService;