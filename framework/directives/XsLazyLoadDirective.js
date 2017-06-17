/**
 *  XsLazyLoadDirective create an 'A' directive to load css or js when it's needed
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 */

import Directive from 'framework/lib/Directive';

class XsLazyLoadDirective extends Directive {

    constructor(app) {
        super(app);
    }

    _lazyLoad(xsLoad, LL_CONFIG) {
        'ngInject';
        return {
            restrict: 'A',
            link: function (scope, el, attr) {
                let loads = attr.xsLazyLoad.split(',');
                let loadResources = [];
                for (let i = 0; i < loads.length; i++) {
                    loadResources=loadResources.concat(LL_CONFIG[loads[i]]);
                }
                xsLoad.load(loadResources).then(function () {
                });
            }
        };
    }

    execute() {
        this.directive('xsLazyLoad', this._lazyLoad);
    }
}

export default XsLazyLoadDirective;