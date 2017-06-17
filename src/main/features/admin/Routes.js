/**
 *
 *  Routes module expose route information used in admin feature
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 *
 */

import tpl_admin from './admin.html';
import AdminController from './AdminController';

import exampleRouter from './example/Routes';

export default [
    {
        id: 'admin',
        state: {
            url: '/admin',
            template: tpl_admin,
            controller: AdminController,
            controllerAs: '$this'
        }
    },
    ...exampleRouter
];
