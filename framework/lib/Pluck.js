/**
 *  Gets the property value of path from all elements in collection.
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 */

import {isArray} from 'angular';

let Pluck = function (arr, key) {
    if (!isArray(arr) || arr.length === 0) {
        return [];
    }
    if (!key) {
        return arr;
    }
    return arr.map(function (a) {
        return a[key];
    });
};

export default Pluck;