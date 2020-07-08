### 如何使用一级弹窗组件

#### 1、导入并注册该组件

```js
    import infinityDialog from '@vBaseComponent/infinity-dialog/index.vue';

    export default {
        ...
        components: {
            infinityDialog
        }
    }
```

#### 2、使用该组件

* title：指定弹窗的标题信息
指定一个标志位（比如案例中的 “isShowDialog”）来控制弹窗的显示与隐藏
* v-model：告知弹窗组件外部控制弹窗隐藏与显示的标志位，这样点击弹窗右上角的关闭按钮可以同步设置你的标志位
* width：指定弹窗的宽度
* height：指定弹窗的高度

```html
    <infinity-dialog
        title="创建活动"
        v-model="isShowDialog"
        v-if="isShowDialog"
        :width="1000"
        :height="950"
    >

        // 在这里放置该弹窗要显示的组件

    </infinity-dialog>
```

#### 3、弹窗显示 “创建活动” 的案例代码

```html
    <infinity-dialog
        title="创建活动"
        v-model="isShowDialog"
        v-if="isShowDialog"
        :width="1000"
    >
        <el-form
            style="margin-top: 15px;"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item
                label="活动名称"
                prop="name"
            >
                <el-input
                    v-model="ruleForm.name"
                    placeholder="请输入活动名称"
                />
            </el-form-item>

            ...其他表单控件
            
            <el-form-item
                label="活动形式"
                prop="desc"
            >
                <el-input
                    type="textarea"
                    placeholder="请输入活动形式"
                    v-model="ruleForm.desc"
                />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="submitForm('ruleForm')"
                >
                    立即创建
                </el-button>
                <el-button @click="resetForm('ruleForm')">
                    重置
                </el-button>
            </el-form-item>
        </el-form>
    </infinity-dialog>
```