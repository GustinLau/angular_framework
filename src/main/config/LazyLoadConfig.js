/**
 *  RouterConfig collect route information from each feature and combine them
 *  with ui.route.
 *
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 *
 */

import XsLazyLoadConfig from 'framework/config/XsLazyLoadConfig';

class LazyLoadConfig extends XsLazyLoadConfig {
    constructor(features, app) {
        super(features, app);
        this.configs={
            lightbox: ['http://cdn.bootcss.com/lightbox2/2.9.0/css/lightbox.min.css','http://cdn.bootcss.com/lightbox2/2.9.0/js/lightbox.min.js']
        }
    }
}

export default LazyLoadConfig;