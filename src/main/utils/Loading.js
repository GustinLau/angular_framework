/**
 *  加载动画显隐工具类
 *
 *
 *  @author  Gustin Lau
 *  @date    14/06/2017
 *
 */
import {Splash} from 'splash-screen';

export default class Loading {
    static show() {
        $(document.body).append("<div id='loading_overlay_w9go1htt7s28zyx7' style='width:100%;height:9999px;position:fixed;top:0;left:0;background: rgba(50,50,50,0.5);z-index: 99998'></div>");
        require('splash-screen').Splash.enable('circular');
    }

    static hide() {
        $("#loading_overlay_w9go1htt7s28zyx7").remove();
        Splash.destroy();
        setTimeout(()=> {
            if (Splash.isRunning()) {
                Loading.hide();
            }
        }, 100);
    }
}