<template>
  <el-container style="height:100%;">
    <el-header>
      <helmet></helmet>
    </el-header>
    <el-container>
      <el-main>
        <card-tree></card-tree>
        <!-- 计数器案例 -->
        <card-counter></card-counter>
        <!-- todolist案例 -->
        <card-todolist></card-todolist>
        <!-- http模块 -->
        <card-http></card-http>
        <!-- 日志模块 -->
        <card-logger></card-logger>
        <!-- 消息中心 -->
        <card-notification></card-notification>
      </el-main>
    </el-container>
  </el-container>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>