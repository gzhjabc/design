# client

这个是使用Vite和Vue 3进行开发的医院前台信息网站。

## 添加项目包

```sh
npm install
```

### 在运行项目前还需要加入一些插件，例如elementplus

```sh
npm install element-plus --save
```

### elementplus的图标

```sh
npm install @element-plus/icons-vue
```

### 最后我还加入了laf云开发的插件来获取后台的数据，地址用的我自己的

```sh
npm install laf-client-sdk
```

### 编译项目运行

```sh
npm run dev
```

### 完成了可对代码进行打包

```sh
npm run build
```

### 打包补充：输入打包命令会生成dist目录，由于直接打开里面的index.html文件会是空白，所以我找到网上推荐的安装插件
### 这里推荐 live-server 或 http-server，因为它们在安装和使用上都非常的方便，只需要在命令行工具中，执行命令就搞定了

```sh
npm install -g live-server
```

### 或者

```sh
npm install -g http-server
```

### 启动服务，安装完后用命令提示符在生成的dist目录下输入

```sh
live-server
```

### 或者

```sh
http-server
```
