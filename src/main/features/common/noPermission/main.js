/**
 * ******************************************************************************************************
 *
 *   Defines a NoPermission feature
 *
 *  @author  Gustin Lau
 *  @date    Nov 27, 2016
 *
 * ******************************************************************************************************
 */

import Feature from 'framework/lib/Feature';
import Routes from './Routes';

class NoPermission extends Feature {

    constructor() {
        super('noPermissionFeature');
        this.routes=Routes;
    }

    execute() {
    }
}

export default NoPermission;
