<template>
    <el-card class="box-card">
        <div slot="header">
            <span>🍺 下拉框组件</span>
        </div>

        <!-- ++++++++++++++++++++++++++++++++++++++++++++++ 分割线 ++++++++++++++++++++++++++++++++++++++++++++++ -->

        <div class="tag-title">➤ 基础下拉框:</div>
        <form-group desc="基础下拉框_单选" :width="250" style="margin-bottom: 5px;">
            <infinity-select
                v-model="value1"
                valueKey="name"
                labelKey="name"
                value-format="string"
                :remote-method="remoteMethod"
            />
        </form-group>
        <form-group desc="基础下拉框_多选" :width="250" style="margin-bottom: 5px;">
            <infinity-select
                v-model="value2"
                valueKey="name"
                labelKey="name"
                value-format="Array"
                :multiple="true"
                :remote-method="remoteMethod"
                @change="handleChange"
            />
        </form-group>
        <div class="tips usage">
            <ul>
                <li>通过 value/v-model 属性绑定初始值，可以是 String 和 Array 类型</li>
                <li>通过 value-format="Array" 属性指定组件值的格式，可以是 String 和 Array</li>
            </ul>
            <ul>
                <li>通过 :remote-method="remoteMethod" 属性绑定初始化组件下拉选项列表的数据源信息，remoteMethod 为用户指定的一个返回后端列表数据的方法</li>
            </ul>
            <ul>
                <li>由于后端返回的列表数据可能是各式各样的，为了组件使用的灵活性，提供了 label-key、value-key 属性用于指定下拉选项显示的文本与对应的值</li>
                <li>通过 :label-key="???" 属性绑定用于从后端返回的列表项中提取选项显示的【文本】信息，可以是 String 和 Function</li>
                <li>通过 :value-key="???" 属性绑定用于从后端返回的列表项中提取选项文本对应的【值】信息，可以是 String 和 Function</li>
            </ul>
            <ul>
                <li>通过 :multiple="true" 属性将下拉框配置成多选</li>
                <li>不配置 multiple 属性，multiple 默认为：false，即单选</li>
            </ul>
        </div>

        <!-- ++++++++++++++++++++++++++++++++++++++++++++++ 分割线 ++++++++++++++++++++++++++++++++++++++++++++++ -->

        <div class="tag-title" style="margin-top: 50px;">➤ 自带【全选】选项的多选下拉框:</div>
        <form-group desc="多选下拉框-自带【全选】" :width="250" style="margin-bottom: 5px;">
            <infinity-select
                v-model="value3"
                valueKey="name"
                labelKey="name"
                value-format="Array"
                :multiple="true"
                :enable-check-all="true"
                :remote-method="remoteMethod"
            />
        </form-group>
        <div class="tips usage">
            <ol>
                <li>在 :multiple="true" 的前提下，通过 :enable-check-all="true" 属性开启多选下拉框的【全选】选项</li>
                <li>不配置 enable-check-all 属性，enable-check-all 默认为：false，即不启用多选下拉框的【全选】选项</li>
            </ol>
        </div>

        <!-- ++++++++++++++++++++++++++++++++++++++++++++++ 分割线 ++++++++++++++++++++++++++++++++++++++++++++++ -->

        <div class="tag-title" style="margin-top: 50px;">➤ 【远程】搜索能力的 Select 组件:</div>
        <form-group desc="多选下拉框-【远程】搜索" :width="250" style="margin-bottom: 5px;">
            <infinity-select
                v-model="value4"
                valueKey="name"
                labelKey="name"
                value-format="Array"
                :remote="true"
                :multiple="true"
                :fuzzy-filter="true"
                :enable-check-all="true"
                :remote-method="remoteMethod"
            />
        </form-group>
        <p class="tips">F12 打开开发者工具的 Network 选项卡，可以发现每次键入搜索条件都【会】发起请求以获取与条件相关的下拉选项</p>
        <div class="tips usage">
            <ul>
                <li>通过 :fuzzy-filter="true" 属性启用模糊匹配的搜索框</li>
                <li>当用户输入模糊匹配的文本信息的时候，模糊匹配的文本信息会以名称为 fuzzyValue 的变量给用户指定的 remoteMethod ，用户获取该值自行进行过滤</li>
                <li>用户通过 :remote-method="remoteMethod" 属性指定的远程搜索方法需要自行获取 fuzzyValue ，并根据该值进行过滤操作</li>
            </ul>
            <ul>
                <li>目前支持的搜索框有如下三种：</li>
                <li>通过 :fuzzy-filter="true" 属性启用模糊匹配的搜索框，会通过 fuzzyValue 告知用户输入的模糊匹配的文本信息</li>
                <li>通过 :precise-filter="true" 属性启用精确匹配的搜索框，会通过 preciseValue 告知用户输入的精确匹配的文本信息</li>
                <li>通过 :interval-filter="true" 属性启用数值区间搜索框，会通过 minValue 和 maxValue 告知用户输入的区间信息</li>
            </ul>
        </div>

        <!-- ++++++++++++++++++++++++++++++++++++++++++++++ 分割线 ++++++++++++++++++++++++++++++++++++++++++++++ -->

        <div class="tag-title" style="margin-top: 50px;">➤ 【本地|前端】搜索能力的 Select 组件::</div>
        <form-group desc="多选下拉框-【本地】搜索" :width="250" style="margin-bottom: 5px;">
            <infinity-select
                v-model="value5"
                valueKey="name"
                labelKey="name"
                value-format="Array"
                :multiple="true"
                :fuzzy-filter="true"
                :enable-check-all="true"
                :remote-method="remoteMethod"
                :filter-method="filterMethod"
            />
        </form-group>
        <p class="tips">F12 打开开发者工具的 Network 选项卡，可以发现每次键入搜索条件都【不会】发起请求，而是直接检索本地缓存的下拉选项</p>
        <div class="tips usage">
            <ul>
                <li>不配置 remote 属性，默认为：true，即搜索的模式为：远程搜索，会调用 remoteMethod 进行拉取符合条件的后端数据</li>
                <li>通过 :remote="false" 属性指定搜索的模式为：本地搜索</li>
                <li>通过 :filter-method="filterMethod" 属性绑定本地搜索符合条件的下拉选项列表的过滤方法，filterMethod 为用户指定的一个过滤前端列表数据的方法</li>
            </ul>
            <ul>
                <li>同后端搜索一样：</li>
                <li>通过 :fuzzy-filter="true" 属性启用模糊匹配的搜索框，会通过 fuzzyValue 告知用户输入的模糊匹配的文本信息</li>
                <li>通过 :precise-filter="true" 属性启用精确匹配的搜索框，会通过 preciseValue 告知用户输入的精确匹配的文本信息</li>
                <li>通过 :interval-filter="true" 属性启用数值区间搜索框，会通过 minValue 和 maxValue 告知用户输入的区间信息</li>
            </ul>
        </div>

        <!-- ++++++++++++++++++++++++++++++++++++++++++++++ 分割线 ++++++++++++++++++++++++++++++++++++++++++++++ -->

        <div class="tag-title" style="margin-top: 50px;">➤ 自带目前所有搜索框的 Select 组件::</div>
        <form-group desc="多选下拉框-全搜索框" :width="250" style="margin-bottom: 5px;">
            <infinity-select
                v-model="value6"
                valueKey="name"
                labelKey="name"
                value-format="Array"
                :remote="false"
                :multiple="true"
                :fuzzy-filter="true"
                :precise-filter="true"
                :interval-filter="true"
                :enable-check-all="true"
                :remote-method="remoteMethod"
                :filter-method="filterMethod"
            />
        </form-group>
        <p class="tips">注意：本实例只实现了模糊搜索功能</p>
        <p class="tips">F12 打开开发者工具的 Console 选项卡，可以通过日志查看每次键入过滤条件时候 filterMethod 接收到的 过滤条件的 key 和 value</p>

        <!-- ++++++++++++++++++++++++++++++++++++++++++++++ 分割线 ++++++++++++++++++++++++++++++++++++++++++++++ -->

        <div class="tag-title" style="margin-top: 50px;">➤ 搜索的时候清空上一次选中的值:</div>
        <form-group desc="多选下拉框_【本地】搜索" :width="250" style="margin-bottom: 5px;">
            <infinity-select
                v-model="value7"
                valueKey="name"
                labelKey="name"
                value-format="Array"
                :multiple="true"
                :fuzzy-filter="true"
                :reserve-values="false"
                :enable-check-all="true"
                :remote-method="remoteMethod"
                :filter-method="filterMethod"
            />
        </form-group>
        <div class="tips usage">
            <ul>
                <li>通过 :reserve-values="false" 属性指定每次执行搜索的时候不保留上一次选中的值</li>
                <li>不配置 reserve-values 属性，默认为：true，即搜索的时候会保留上一次选中的值（包括选中的选项）</li>
            </ul>
        </div>

        <!-- ++++++++++++++++++++++++++++++++++++++++++++++ 分割线 ++++++++++++++++++++++++++++++++++++++++++++++ -->

        <div class="tag-title" style="margin-top: 50px;">➤ 没有form-group组件包裹的下拉框:</div>
        <p style="font-size: 12px;">默认宽度（width="100%"）的 Select 组件</p>
        <infinity-select
            style="margin-bottom:10px"
            v-model="value8"
            valueKey="name"
            labelKey="name"
            value-format="String"
            :multiple="true"
            :enable-check-all="true"
            :remote-method="remoteMethod"
        />
        <p style="font-size: 12px;">指定宽度为：300px 的 Select 组件</p>
        <infinity-select
            v-model="value9"
            valueKey="name"
            labelKey="name"
            width="300px"
            value-format="String"
            :multiple="true"
            :enable-check-all="true"
            :remote-method="remoteMethod"
        />
        <div class="tips usage">
            <ul>
                <li>infinity-select 组件默认的宽度是：100%，即为父组件的宽度</li>
                <li>可以通过 width 属性设置 infinity-select 组件的宽度</li>
                <li>infinity-select 在弹出下拉框的时候，会智能地判断并调整弹出的方向，确保弹出的下拉框不会被遮挡</li>
            </ul>
        </div>
        <p class="tips">更多用法请查阅下方更加详细的文档说明</p>
    </el-card>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
