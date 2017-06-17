# 介绍
这是一个AngularJs 1.x+ES6+Webpack 项目。这个项目是基于[`generator-es6-angular`](https://github.com/leftstick/generator-es6-angular)，所以如果你熟悉generator-es6-angular估计会看到很多熟悉的东西。
这个项目当时由于打算做一个管理后台，在好友[**PotatoChan**](https://github.com/PotatoChan)的怂恿下做出来的，用于我本人并不是一个真正的前端工程师，我读书的时候学的是Java，学前端是因为没人想做又不得不做我才做的，这也是我为什么会用ES6的其中一个原因，因为ES6给我的感觉非常亲切，在编程上与Java有点类似。而Webpack与Angular在项目之前其实是没有学过的，Webpack甚至在项目之前是没听说过（实在惭愧），后来是因为在前端[**ouqinglai**](https://github.com/ouqinglai)的项目里面得知这个工具才开始使用这个工具，但目前水平只是*略懂*，Angular的水平也只是*略懂*，做出这个东西如果有什么Bug其实是非常正常的啦，哈哈。
言归正传，之前说了项目的初衷是管理后台，那用项目做后台相对来说是比较给力的，但如果要做其他类型的项目其实也是可以的。
你如果下载了项目你会发现其实项目并不包含前端模板，只有一个`Boostrap`前端框架，那是因为后台模板网上一搜一大堆，你习惯用哪个直接弄进去就好啦。

# 技术栈
使用或看懂这个项目，你应该要掌握但不限于以下内容（排名不分先后）
1. JavaScript
2. ES6
3. Webpack
4. AngularJs
5. JQuery（有部分用到）
6. less（可选）
7. nodejs

# 结构
```
angular-framework
├── framework
|   ├── config
|   ├── directives
|   ├── extensions
|   ├── filters
|   ├── init
|   ├── interceptors
|   ├── lib
|   └── services
├── src
|   ├── assets
|   │   ├── bootstrap
|   │   ├── css
|   │   ├── img
|   │   └── less
|   ├── main
|   │   ├── config
|   │   ├── constants
|   │   ├── directives
|   │   |   └──tpls
|   │   ├── extensions
|   │   ├── features
|   │   │   ├── admin
|   │   │   ├── common
|   │   │   └── login
|   │   ├── filters
|   │   ├── interceptors
|   │   ├── services
|   │   ├── templates
|   │   ├── utils
|   │   ├── index.js
|   │   └── main.js
|   └── config.js
├── .gitignore
├── index.html_vm
├── package.json
└── webpack.config.js

```
* `framework`，框架层代码，如非必须无需修改
* `scr`，源码目录
* `assets`，资源目录，图片、css、less、插件都可以放到这里
* `main`，开发核心目录
* `config`，config配置文件目录，lazyload、router配置都在这里
* `constants`，常量文件都放这里
* `directives`，自定义指令
* `extensions`，扩展目录，第三方库加载入口
* `features`，开发主要围绕这里展开
* `filters`，自定义过滤器
* `interceptors`，拦截器，权限模块路由拦截逻辑实现
* `services`，自定义服务目录
* `templates`,模板目录，用于指令（后续讲述）
* `util`，工具类
* `index.js`，程序入口
* `main.js`，程序启动逻辑
* `config.js`，系统配置
* `index.html_vm`，主页模板
* `package.json`，依赖管理
* `webpack.config.js`，打包处理脚本

# 起步
项目下载完后需要安装，循例讲解下步骤
第一步：
> npm install

如果安装过[淘宝镜像](https://npm.taobao.org/)可使用
> cnpm install

第二步：
如果你是**Windows**用户你可以执行
> npm start

但如果你是**Mac**用户你要执行
> npm run start_mac

第三步：
如果没有报错就可以访问 http://localhost:8080 看项目了


# 开发

## 配置
### 全局Controller
在`/src/main/main.js`里面有一个`_settingBaseController()`的方法，该方法可以自定义全局方法，即每个页面都能执行，例如logout()
例：
```javascript
    $scope.app.customMethod = () => {
        alert("Custom method in BaseController");
    }
```
在页面调用
```html
<button ng-click="app.customMethod()">customMethod</button>
```
### 路由配置
核心路由配置是写在框架里面，但`/src/main/config/RouterConfig.js`才是真正引用，配置所有路由直接调用父级`_routeConfig(..)`方法即可，若需要实现某些自定义配置，则可重写`_routeConfig(..)`方法实现。

如当入户未登陆时只配置/login页面，其他页面不配置

```javascript
if (LoginChecker.check(this.app)) {
    //config each router
    this.routes.forEach(function (route) {
        if (route.id !== 'login')
            $stateProvider
              .state(route.id, route.state);
        });
        //config default page
        let defaultRouter = this.routes.filter(route => route.isDefault)[0];
        if (defaultRouter) {
            $urlRouterProvider.otherwise(defaultRouter.state.url);
        }
    } else {
        $stateProvider
            .state('login', LoginRouter[0].state);
        $urlRouterProvider.otherwise('/login');
    }
```

### 权限配置
与路由一样，核心权限配置写在框架里面，但需要在`/src/main/Service/PermissionService.js`里面实现`static init()`,`requestPermissions(..)`这两个方法

`static init()` 方法是用于初始化权限，如果不初始化权限，权限列表为空，配置了权限的菜单会因被remove掉而看不到。

`requestPermissions(..)`是处理请求(更新)权限列表，若某些地方需求请求新的权限可在此处处理。

要注意的是这些请求需要同步请求，否则可能出现异常情况。

## 如何编写一个一个页面（以admin为例）
 `/src/main/features`目录下有`admin`，`common`，`login`三个文件夹，分别是住模块，公用模块和登录模块。每个模块下又分若干子模块，子模块一般有`controllers`、`templates`、`Routes.js`、`main.js`四个东西。`controllers`是控制器目录，`templates`是模板目录，`Routes.js`是路由配置，`main.js`是模块入口。
 ### 新建一个Controller
 在controllers目录下新建一个js文件
 最基本的一个Controller
 ```javascript
 class ExampleController{

    /** @ngInject */
    constructor($scope) {
        this.$scope = $scope;
        this._init_();
        this._destroy_();
    }

    _init_() {
    }

    _destroy_() {
        this.$scope.$on('$destroy', function () {
        });
    }
}

export default ExampleController;
 ```
 `constructor`是构造器，类构造时会调用该方法，参数是需要依赖注入的服务，注入后的服务需要传入到this才能全局使用。

 **注意**，因为最终需要进行webpack压缩编译，会出现变量名缩短的问题，所以在有依赖注入的构造器上一行必须添加`/** @ngInject */`，或者在下一行加上`'ngInject';`，这样编译后的代码才会正常运行。

之后两个方法分别是初始化和销毁方法，可选择是否实现。

最后记得**export**

### 新建一个View
在`templates`下创建一个html文件，该文件是不用声明<html>和<body>，直接写需要展示的内容即可
```html
<h1>Hello World!</h1>
```
### 配置路由
我们使用的路由是ui-router不是自带路由，不懂可以先学习下ui-router

首先是import controller 和 template
```javascript
import tpl_example from "./templates/example.html";
import ExampleController from "./controllers/ExampleController"
```
之后是直接导出一个数组
```javascript
export default[
    //二级路由，一级路由不在这里配置而在上级模块的Routes.js中配置，详情可参考源码
    {
        id: 'admin.example',
        state: {
            url: '/example',
            template: '<div ui-view class="fade-in-up"></div>'
        }
    },
    //三级路由
    {
        id: 'admin.example.1',
        state: {
            url: '/1',
            template: tpl_example,
            controller: ExampleController,
            controllerAs: '$this',
            permission:"permission_1"//所需权限
        }
    }
]
```
最后还需要在features中的main.js中把admin中的main.js`import`进去。由于admin本身就写好了一个main.js,如果是其他自定义模块就要自己写一个。代码如下
```javascript
import Feature from 'framework/lib/Feature';
import Routes from './Routes';

class Other extends Feature {

    constructor() {
        super('otherFeature');
        this.routes = Routes;
    }

    execute() {
    }
}

export default Other;

```

## 如何写一个自定义服务

在`/src/main>services`目录下创建js文件
1. 导入`Service`
```javascript
import Service from 'framework/lib/Service';
```
2. 继承`Service`
```javascript
class DemoService extends Service
```

3. 编写构造方法
```javascript
constructor(features, app) {
    super(features, app);
}
```
4. 编写服务方法
```javascript
 _services() {
    let demo1=()=>{
        console.log('demo1');
    }

    let demo2=function(){
        console.log('demo2');
    }
 }
```
4. 在execute方法中注册服务
```javascript
execute() {
    this.service('demo', this._services);
}
```
5. 导出模块
```javascript
export default DemoService;
```
6. 最终的Demo
```javascript
import Service from 'framework/lib/Service';

class DemoService extends Service {

    constructor(features, app) {
        super(features, app);
    }

    _services() {
        let demo1=()=>{
            console.log('demo1');
        }

        let demo2=function(){
            console.log('demo2');
        }
    }

    execute() {
        this.service('demo', this._services);
    }
}
export default DemoService;
```
7. 通过main.js导出服务
```javascript
import demo from './DemoService';
export default [demo];
```

## 如何写一个自定义过滤器

在`/src/main/filters`目录下创建js文件
1. 导入`Filter`
```javascript
import Filter from 'framework/lib/Filter';
```
2. 继承`Filter`
```javascript
class DemoFilters extends Filter
```
3. 编写构造方法
```javascript
constructor(app) {
    super(app);
}
```
4. 在execute方法中编写过滤器
```javascript
execute() {
   this.filter('demo', function () {
            return function (input) {
                if (input)
                    return input+"[demo]";
            }
    });
}
```
5. 导出模块
```javascript
export default DemoFilters;
```
6. 最终的Demo
```javascript
import Filter from 'framework/lib/Filter';

class DemoFilters extends Filter {
    constructor(app) {
        super(app)
    }

    execute() {
        this.filter('demo', function () {
            return function (input) {
                if (input)
                    return input+"[demo]";
            }
        })
    }
}
export default DemoFilters;

```
7. 通过main.js导出服务
```javascript
import demo from './DemoFilters';
export default [demo];
```
## 如何写一个自定义指令
在`/src/main/directives`目录下创建js文件
1. 导入`Directive`
```javascript
import Directive from 'framework/lib/Directive';
```
2. 继承`Directive`
```javascript
class DemoDirective extends Directive
```
3. 编写构造方法
```javascript
constructor(app) {
    super(app);
}
```
4. 编写指令函数
```javascript
  _demo() {
        return {
            restrict: 'EA',
            template: '<h1>Demo</h1>',
            replace:true
        }
    }
```
return的内容跟原生自定义指令一样
5. 在execute方法中添加指令
```javascript
execute() {
   this.directive('xsDemo', this._demo);
}
```
6. 导出模块
```javascript
export default DemoDirective;
```
7. 最终的Demo
```javascript
import Directive from 'framework/lib/Directive';

class DemoDirective extends Directive {
    constructor(app) {
        super(app)
    }

     _demo() {
        return {
            restrict: 'EA',
            template: '<h1>Demo</h1>',
            replace:true
        }
    }

    execute() {
        this.directive('xsDemo', this._demo);
    }
}
export default DemoDirective;

```
8. 通过main.js导出指令
```javascript
import demo from './DemoDirective';
export default [demo];
```
## 如何使用LazyLoad
在`/src/main/config/LazyLoadConfig.js`中的`this.config`加入需要lazyLoad的资源文件对象
```javascript
this.configs={
            lightbox: ['http://cdn.bootcss.com/lightbox2/2.9.0/css/lightbox.min.css','http://cdn.bootcss.com/lightbox2/2.9.0/js/lightbox.min.js']
        }
```
在网页中只有在页面的某个标签中加入`xs-lazy-load='lightbox'`指令就好加载lightbox对应的资源
```html
<h1 hn-lazy-load="lightbox">LazyLoad</h1>
```
多个资源可用`,`分割，目前只支持css和js文件懒加载

## 如何添加css/less
在`/src/assets/`下对应文件夹下直接添加，添加后到style.less中使用`@import`命令import资源

## 工具类说明
框架集成了几个工具类，其中Http.js是对Jquery中的ajax的简单封装，有同步和异步请求，都是带cookie可跨越的，`uploadFile`用于上传文件，详情可参考`ng-file-upload`

## 注意事项
1. 关于import： framework中`'framework/*/*';`,assets中`assets/*`
2. 在自定义服务、指令、过滤器等东西时，如果在方法中用到依赖注入，要在方法下一行加上`'ngInject';`,如果是controller的构造函数则可以在上一行加` /** @ngInject */`或下一行加`'ngInject';`
3. 框架不能使用`ng-include`指令，因为在编译之后只会得到一个html文件，inclde的html路径会找不到，所以原生的`ng-inclde`是不能用的，这里提供一个解决方案，就是把要inclde的页面做成一个指令，详情可参考源码中的`xs-hello`指令。
4. 关于编译后的资源位置：如果是`.min.js`结尾的文件编译后会放到`/assets/js/*.min.js`,如果是`.min.css`结尾的文件编译后会放到`/assets/css/*.min.css`,图片文件如果小于5k会转成Base64，大于5k会放到`/assets/img/*.*`,字体文件会放到`/assets/res/*.*`,这部分可通过修改`webpack.config.js`进行修改。
5. 如果有压缩了的文件加入，最后需要在`webpack.config.js`中的`HtmlWebpackPlugin`手动进行加入！！！
6. 项目对Jquery有依赖，添加方式为在`webpack.config.js`中的`HtmlWebpackPlugin`手动进行加入！！！

# 编译
如果你是**Windows**用户你可以执行
> npm run build

但如果你是**Mac**用户你要执行
> npm run build_mac

编译后会出现一个`build`文件夹


# 联系方式
如果你在使用中遇到困难或发现有BUG可通过邮箱联系我

邮箱：gustinlau@gmail.com
