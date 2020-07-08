### 表单控件包裹器

#### 一、支持的属性（配置）

* desc：指定该表单控件的描述性信息
* form-width：指定表单控件包裹层的宽度信息

#### 二、使用该组件

##### 导入并注册该组件：

```js
    import formGroup from '@vBaseComponent/form-group/index.vue';
    console.log('kkk');
    export default {
        ...
        components: {
            formGroup
        }
    }
```
##### 使用该组件：

```html
    <form-group
        desc="多选下拉框组件"
        :form-width="200"
    >

    // 在此处放置要被包裹的表单控件

    </form-group>
```

#### 三、具体实例（对应于 “你的姓名” 表单控件）

```html
    <form-group
        desc="多选下拉框组件"
        :formWidth="200"
    >
        <el-input
            v-model="name"
            placeholder="请输入内容" 
        />
    </form-group>
```