/**
 * Created by Gustin Lau on 2016/8/16.
 */
import toastr from 'toastr';
import "../../assets/less/toastr.less";

export default class Toastr {

    static info(title, msg, options) {
        Toastr._init(options);
        toastr.info(msg, title);
    }

    static error(title, msg, options) {
        Toastr._init(options);
        toastr.error(msg, title);
    }

    static success(title, msg, options) {
        Toastr._init(options);
        toastr.success(msg, title);
    }

    static warning(title, msg, options) {
        Toastr._init(options);
        toastr.warning(msg, title);
    }

    /**
     *
     * @param options
     * @private
     */
    static _init(options) {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
        };
        toastr.options = Object.assign(toastr.options, options);
        toastr.clear();
    }
}