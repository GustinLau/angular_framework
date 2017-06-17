/**
 *
 *  Routes module expose route information used in login feature
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 *
 */

import tpl from './template/login.html';
import LoginController from './controller/LoginController';

export default [
    {
        id: 'login',
        isDefault:true,
        state: {
            url: '/login',
            controller: LoginController,
            template: tpl,
            controllerAs: '$this'
        }
    }
];
