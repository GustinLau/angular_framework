/**
 *  index.js launch the application.
 *
 *  @author  Gustin Lau
 *  @date    Nov 24, 2016
 *
 */

//import style.less 为style引入入口
import less from '../assets/less/style.less'

/**
 *
 * 这里连用两个ensure，是webpack的特性，可以强制在bundle时将内容拆成两个部分
 * 然后两个部分还并行加载
 *
 */

require.ensure(['../assets/css/splash.min.css','splash-screen'], function(require) {
    require('splash-screen').Splash.enable('circular');
});

require.ensure(['splash-screen', './main'], function(require) {
    let App = require('./main').default;
    (new App()).run();
});