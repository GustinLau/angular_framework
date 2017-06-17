/**
 *  Validate the features is loaded correctly
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 */

import Init from '../lib/Init';
import Pluck from '../lib/Pluck';

class Initializer extends Init {

    constructor(features) {
        super(features);
    }

    execute() {
        if (!this.features || this.features.length === 0) {
            return console.warn('No features loaded');
        }

        let modNames = Pluck(this.features, 'export').sort();
        for (let i = 0; i < modNames.length - 1; i++) {
            if (modNames[i] === modNames[i + 1]) {
                throw new Error('Duplicated Module: [ ' + modNames[i] + ' ], you have to specify another name');
            }
        }
    }
}

export default Initializer;