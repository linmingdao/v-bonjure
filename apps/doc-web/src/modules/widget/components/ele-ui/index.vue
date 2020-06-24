<template>
    <el-card class="box-card">
        <div slot="header">
            <span>🍺 同步协作平台的绿色主题表格组件</span>
        </div>
        <infinity-select
            style="width:250px;"
            :remote="remote"
            :filterParams="filterParams"
            :dataSourceFormatter="dataSourceFormatter"
            :valueExtractor="valueExtractor"
            :textExtractor="textExtractor"
            v-model="selectValue1"
            placeholder="请输入"
        />
        <infinity-select
            style="width:250px;"
            :remote="remote"
            :filterParams="filterParams"
            :dataSourceFormatter="dataSourceFormatter"
            :valueExtractor="valueExtractor"
            :textExtractor="textExtractor"
            v-model="selectValue1"
            placeholder="请输入"
        />
    </el-card>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
