### 绿色风格主题

#### 只需要在项目的入口文件导入主题文件，那么自动会将element ui的风格调整为该主题样式对应的风格，例如

```js
    import App from '@core/app';
    import store from '@app/store';
    import routes from '@app/routes';
    import '@vBaseComponent/them/theme-green/index.css';

    App({
        store,
        routes
    });
```