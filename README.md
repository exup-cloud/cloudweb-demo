# tigermex合约云前端demo

> tigermex合约云web端demo,代码目录结构可查看根目录下的“合约云web端文档.docx”。  
> demo中只提供合约交易相关功能页面，项目方需自己实现登录注册功能。  
> 技术栈主要有[NUXTJS](https://zh.nuxtjs.org/), [Vuex](https://vuex.vuejs.org/), [TradingView](https://b.aitrade.ga/books/tradingview/), 可以点击跳转到相应官网或文档查阅资料。  

## 步骤

### 1. 安装依赖环境

-   [Install Node.js 8.x/10.x](http://nodejs.org)

### 2. git clone 项目到本地

``` bash
# install dependencies
git clone https://github.com/exup-cloud/cloudweb-demo.git
```

### 3. 安装项目依赖包

``` bash
# install dependencies
npm install
```

### 4. 配置

1. 将config文件中的内容换为项目方配置，具体改动方法查看文件内的注释

2. 服务器应提供一个可获取 `api_key`、`api_secret`、`expired_ts` 的接口，前端拿到后即可调用合约交易。
  -   代码说明：在assets/js/axiosClassYun.js中将如下图处代码换为项目方信息

  <img src="https://github.com/exup-cloud/cloudweb-demo/blob/master/ScreenShots/1.png?t=123" width="800" hegiht="auto" align="center" />
  > 注意：只有在 `./config/` 内对应的模式 `.js` 文件中，`isYun` 字段设为 `true`，才会调用上面的配置。  目前所有模式配置中 `isYun: true`。

3. 需要接入当前平台的用户资产和用户信息，为转账到期货和头部显示做准备。

  <img src="https://github.com/exup-cloud/cloudweb-demo/blob/master/ScreenShots/2.png?t=123" width="800" hegiht="auto" align="center" />

### 5.本地运行方法
  对应`./config/api.config.js`配置项

  #### 步骤
  1. 配置`api.config.js`配置项为自己所需的配置
  2.  本地host配置相关domain
      ```
      127.0.0.1 localswap.hiup.pro
      ```
  3.  运行`nuxt`
      ```bash
      npm run dev
      ```
  4.  等待显示出`127.0.0.1:3008`
  5.  使用`swapsDomain`的域名+端口进行访问
      > <http://localswap.hiup.pro:3008>

### 6. 部署说明
  #### 步骤
  1. 部署前端的服务器上先安装node和pm2

  2. 拷贝代码
  ```bash
    git clone 项目地址
  ```
  3. 下载依赖（也可以用yarn来下载）
  ```bash
    npm install 或 yarn (如用yarn需提前安装)
  ```
  4. 测试环境部署
  ```bash
    sh updatedev.sh
  ```
  5. 正式环境部署
  ```bash
    sh update.sh
  ```


