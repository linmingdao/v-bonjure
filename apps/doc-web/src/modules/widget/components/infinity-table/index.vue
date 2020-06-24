<template>
    <el-card class="box-card">
        <div slot="header">
            <span>🍺 表格组件（重构版）</span>
        </div>
        <div>
            <!-- 新增用户表单弹窗 -->
            <infinity-plain-dialog title="新增用户" v-model="isShowForm" v-show="isShowForm" width="450">
                <user-form :cancel="cancel" :confirm="confirm"></user-form>
            </infinity-plain-dialog>
            <!-- 表格组件，主要是配置表格的CRUD操作 -->
            <!-- :sort="sort" -->
            <infinity-table
                ref="userTable"
                :remote-retrieve="remoteRetrieve"
                :remote-delete="remoteDelete"
                :remote-create="remoteCreate"
                :remote-update="remoteUpdate"
                :remote-delete-in-bulk="remoteDeleteInBulk"
                :rowHighlight="rowHighlightCallback"
                :pagination="pagination"
                :selection="selection"
                :rownum="rownum"
                :columns="columns"
            >
                <!-- 用户自定义的表格条件设置区域 -->
                <table-filter
                    v-model="queryParams"
                    @showFormDialog="showFormDialog"
                    @search="search"
                    @download="download"
                    @batchRemove="batchRemove"
                ></table-filter>
            </infinity-table>
        </div>
    </el-card>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
