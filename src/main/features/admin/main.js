/**
 * ******************************************************************************************************
 *
 *  Defines a Admin feature
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 *
 * ******************************************************************************************************
 */

import Feature from 'framework/lib/Feature';
import Routes from './Routes';

class Admin extends Feature {

    constructor() {
        super('adminFeature');
        this.routes = Routes;
    }

    execute() {
    }
}

export default Admin;
