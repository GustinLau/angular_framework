/**
 *  Entrance of features
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 *
 */

import login from './login/main';
import admin from './admin/main';
import common from './common/main';

export default [login,admin,...common];
