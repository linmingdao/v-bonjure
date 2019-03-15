<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>🕵‍♂ jQuery版本的ElectricMultiselect组件Vue实现</span>
        </div>
        <electric-select
          :remote="remote"
          :filterParams="filterParams"
          :dataSourceFormatter="dataSourceFormatter"
          :value="value"
          :text="text"
          style="width: 300px;"
        ></electric-select>
        <form-group
          desc="多选下拉框组件"
          :formWidth="200"
        >
          <electric-select
            :remote="remote"
            :filterParams="filterParams"
            :dataSourceFormatter="dataSourceFormatter"
            :value="value"
            :text="text"
            placeholder="请输入"
          ></electric-select>
        </form-group>
        <form-group
          desc="单选下拉框组件"
          :formWidth="200"
        >
          <electric-select
            :text="text"
            :multiple="false"
            :value="value"
            :remote="remote"
            :filterParams="filterParams"
            :dataSourceFormatter="dataSourceFormatter"
          ></electric-select>
        </form-group>
      </el-card>
    </el-col>
  </el-row>
</template>
<script src="./script.js"></script>
<style scoped src="../../common/style.css"></style>
<style scoped lang="postcss" src="./style.css"></style>