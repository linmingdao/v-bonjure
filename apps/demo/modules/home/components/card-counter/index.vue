<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>⏰ 计数器(@业务组件)</span>
        </div>
        <div class="text item">
          Count: {{count}}
        </div>
        <div class="text item">
          CountRMB: {{countWithRmbPrefix}}
        </div>
        <div class="text item">
          <el-button
            type="primary"
            @click="increment(1)"
          >自增 1</el-button>
          <el-button
            type="success"
            @click="increment(5)"
          >自增 5</el-button>
          <el-button
            type="danger"
            @click="decrement(1)"
          >自减 1</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script src="./script.js"></script>
<style scoped src="../../common/style.css"></style>
<style scoped src="./style.css"></style>