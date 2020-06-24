<template>
    <div class="doc-container">
        <!-- 菜单包裹层 -->
        <div class="left-region commone-scrollbar">
            <el-tree
                class="directory-tree"
                :data="data"
                :props="defaultProps"
                :highlight-current="true"
                :default-expand-all="true"
                @node-click="handleNodeClick"
            ></el-tree>
        </div>
        <!-- 文档包裹层 -->
        <div
            class="right-region common-scrollbar"
            :style="{ overflow: currentComponent === 'ele-ui' ? 'hidden' : 'auto' }"
        >
            <iframe
                v-show="currentComponent === 'ele-ui'"
                src="https://element.eleme.cn/#/zh-CN/component/button"
                width="100%"
                height="100%"
                frameborder="no"
                border="0"
            ></iframe>
            <widget-doc v-show="currentComponent !== '' && currentComponent !== 'ele-ui'">
                <template>
                    <keep-alive>
                        <component v-bind:is="currentComponent"></component>
                    </keep-alive>
                </template>
                <template slot="doc">
                    <infinity-markdown ref="markdownInstance" />
                </template>
            </widget-doc>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
