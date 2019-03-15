<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>🍺 同步协作平台的绿色主题表格组件</span>
        </div>
        <!-- 表格组件，主要是配置表格的CRUD操作 -->
        <electric-table
          ref="userTable"
          :headers="headers"
          :taskCreate="taskCreate"
          :taskRetrieve="taskRetrieve"
          :taskUpdate="taskUpdate"
          :taskDelete="taskDelete"
          :taskDeleteInBulk="taskDeleteInBulk"
          :rowHighlight="rowHighlightCallback"
          :sort="sort"
          :pagination="pagination"
          :selection="selection"
          :rownum="rownum"
          :columns="columns"
        >
          <!-- 用户自定义的表格条件设置区域 -->
          <table-filter
            @queryParamsUpdated="retrieveQueryParamsUpdated"
            @doRetrieve="doRetrieve"
            @doDeleteInBulk="doDeleteInBulk"
            @doCreate="doCreate"
            @doDownload="doDownload"
            :queryParams="taskRetrieve.queryParams"
          ></table-filter>
        </electric-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script src="./script.js"></script>
<style scoped src="../../common/style.css"></style>
<style scoped src="./style.css"></style>