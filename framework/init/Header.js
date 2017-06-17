/**
 *  HeadInit set all needed head info to the index.html.
 *
 *  Note: this module is part of application-level framework, developers should
 *  never touch this module if don't necessary
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 */

import Init from '../lib/Init';
import {element} from 'angular';
import __config from 'config';

class Header extends Init {

    constructor(features) {
        super(features);
        this.head = element(document.head);
    }

    title(t) {
        let title = element('<title></title>');
        title.text(t);
        this.head.append(title);
    }

    meta(attr) {
        let meta = element('<meta>');
        meta.attr(attr);
        this.head.append(meta);
    }

    execute() {
        this.title(__config.title);
        this.meta({
            'name': 'author',
            'content': __config.author
        });
        this.meta({
            'name': 'description',
            'content': __config.description
        });
        this.meta({
            'name': 'keywords',
            'content': __config.keywords
        });
        this.meta({
            'name': 'charset',
            'content': 'utf-8'
        });
        this.meta({
            'name': 'viewport',
            'content': 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1.0, user-scalable=yes, minimal-ui'
        });
        this.meta({
            'name': 'renderer',
            'content': 'webkit'
        });
        this.meta({
            'http-equiv': 'X-UA-Compatible',
            'content': 'IE=edge,chrome=1'
        });
        this.meta({
            'name': 'apple-mobile-web-app-capable',
            'content': 'yes'
        });
        this.meta({
            'name': 'apple-mobile-web-app-capable',
            'content': 'yes'
        });
    }
}

export default Header;