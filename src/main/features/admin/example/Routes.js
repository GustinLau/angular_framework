/**
 * Created by Gustin Lau on 2016/12/17.
 */
import tpl_example1 from "./templates/example1.html";
import tpl_example2 from "./templates/example2.html";


import Example1Controller from "./controllers/Example1Controller";
import Example2Controller from "./controllers/Example2Controller";


export default[
    {
        id: 'admin.example',
        state: {
            url: '/example',
            template: '<div ui-view class="fade-in-up"></div>'
        }
    },
    {
        id: 'admin.example.1',
        state: {
            url: '/1',
            template: tpl_example1,
            controller: Example1Controller,
            controllerAs: '$this',
            permission:"permission_1"//有这个权限，可以到达
        }
    },
    {
        id: 'admin.example.2',
        state: {
            url: '/2',
            template: tpl_example2,
            controller: Example2Controller,
            controllerAs: '$this',
            permission:'permission_5'//没有该权限，被拦截
        }
    }
]