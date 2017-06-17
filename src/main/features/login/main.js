/**
 * ******************************************************************************************************
 *
 *  Defines a Login feature
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 *
 * ******************************************************************************************************
 */

import Feature from 'framework/lib/Feature';
import Routes from './Routes';


class Login extends Feature {

    constructor() {
        super('loginFeature');
        this.routes = Routes;
    }

    execute() {
    }
}

export default Login;
