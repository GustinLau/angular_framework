/**
 *  Entrance of services
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 */

import XsLoadService from "./XsLoadService";
import XsAppService from "./XsAppService";
import XsPermissionService from "./XsPermissionService";

export default [XsLoadService, XsAppService, XsPermissionService];