<template>
  <div class="electric-table">
    <!-- 表格的顶部操作区域 -->
    <slot></slot>
    <!-- 表格主体 -->
    <el-table
      ref="elTable"
      v-loading="loading"
      :data="tableData"
      :default-sort="sort"
      :row-class-name="tableRowHighlightClassName"
      @selection-change="selectionChange"
      style="width: 100%;"
      height="590"
      border
    >
      <!-- 表格每行前面的多选checkbox -->
      <el-table-column
        v-if="!!selection"
        type="selection"
        width="35"
        fixed="left"
        align="center"
      />
      <!-- 表格的行号 -->
      <el-table-column
        v-if="rownum"
        type="index"
        align="center"
        :index="tableRowIndex"
      />
      <!-- 表格列字段 -->
      <el-table-column
        v-for="column in columns"
        :key="column.label"
        :sortable="column.sortable"
        :prop="column.prop"
        :fixed="column.fixed"
        :label="column.label"
        :width="column.width"
        :align="column.align?column.align:'center'"
      >
        <template slot-scope="scope">
          <!-- 使用动态组件实现自定义表格列 -->
          <component
            :is="column.component"
            v-if="column.component"
            :index="scope.$index"
            :scope="scope"
            :row="scope.row"
            :context="scope.store.table.$parent"
          />
          <span v-else>
            {{ scope.row[column.prop] }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格的分页组件 -->
    <el-pagination
      v-if="pagination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>