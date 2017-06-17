/**
 *  Feature Base class
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 */

import {module} from 'angular';

class Feature {

    constructor(name) {
        this.export = name;
        this.mod = module(this.export, []);

        this.controller = this.mod.controller;
        this.factory = this.mod.factory;
        this.service = this.mod.service;
        this.directive = this.mod.directive;
        this.filter = this.mod.filter;
        this.config = this.mod.config;
        this.run = this.mod.run;
    }

    beforeStart() {
    }

    execute() {
    }
}

export default Feature;