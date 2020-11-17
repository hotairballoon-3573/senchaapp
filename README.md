## 1.frontend

#### 1.1 安装Sencha Cmd命令行工具
- [x] 1.代码生成工具：创建应用程序目录框架

- [x] 2.编译项目:开发、生产和测试

- [x] 3.部署应用服务器：Sencha Cmd会监听您在应用程序中的更改

- [x] 4.日记记录：通过查阅日志，您可以很方便的排除故障。

#### 1.2 下载Sencha ExtJS GPL
通过GPL，您可以迅速搭建出优美的程序框架

#### 1.3 应用程序

- [x] 1.进入GPL目录下，创建应用程序

```
sencha generate app -s {GPL目录}/templates/admin-dashboard/ app {GPL目录}/frontend
```

- [x] 2.进入应用程序目录下，启动应用服务器
```
sencha app watch
```

> Sencha Cmd会实时监听您在应用程序中做的更改。 因此，每次您修改了程序并重新加载浏览器中的页面之前，请留出足够的时间以便Sencha Cmd更新您的变更(只需要几秒钟的时间)。

- [x] 3.编译项目

```
sencha app bulid
```
> 每次您添加、移除或重命名文件和目录以后，需要编译项目才能使您的更新有效。

```
sencha app bulid testing
```
> 在您的应用程序发布到生产环境之前，您需要对您的应用程序进行测试。在测试环境下，如果浏览器提示异常：Uncaught Error: [Ext.createByAlias] Unrecognized alias，您需要找到引发异常的组件所在的文件，然后require这个组件所属的class。重复bulid testing 直至无任何异常。

```
sencha app bulid production
```
> 编译后的应用程序在 **{GPL目录}/build**，将程序应用目录部署到您的生产服务器中。

[Sencha ExtJs文档](https://docs.sencha.com/extjs/6.2.0/)

## 2.backend
应用程序采用Flask框架，Gunicorn做为Web服务器

- [x] 1.创建和激活虚拟环境，安装依赖
```
virtualenv venv

source venv/bin/activate

pip install -r requirements.txt
```

- [x] 2.启动服务

```
gunicorn -w n(n指定工作进程的数量) -b 127.0.0.1:5000 app:backend
```
> 更多详细用法可参考[Gunicorn文档](https://gunicorn.org/#docs) 


## 3.demo
[Demo应用地址](http://demo.hotairballoon.fun/app/index.html#dashboard)