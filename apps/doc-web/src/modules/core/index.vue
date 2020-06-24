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
        <div class="right-region commone-scrollbar">
            <infinity-markdown ref="markdownInstance" />
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
