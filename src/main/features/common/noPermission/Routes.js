/**
 *
 *  Routes module expose route information used in noPermission feature
 *
 *  @author  GustinLau
 *  @date    Nov 27, 2016
 *
 */

import tpl from './template/noPermission.html';
import NoPermissionController from './controller/NoPermissionController';

export default [
    {
        id: 'noPermission',
        state: {
            url: '/noPermission/:from/:params',
            controller: NoPermissionController,
            template: tpl,
            controllerAs: '$this'
        }
    }
];
