/**
 *  LazyLoadConfig Base is a constant config
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 */

import Configurator from 'framework/lib/Configurator';

class XsLazyLoadConfig extends Configurator {

    constructor(features, app) {
        super(features, app);
        this.configs = {};
    }

    execute() {
        this.constant('LL_CONFIG', this.configs);
    }
}

export default XsLazyLoadConfig;