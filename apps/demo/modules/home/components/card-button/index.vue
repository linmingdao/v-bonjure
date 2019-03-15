<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>🎯 同步协作平台的绿色主题按钮样式</span>
        </div>
        <p>由于每个项目不一样，有协作平台绿色主题的需求则在项目的入口文件手动引入该主题样式即可</p>
        <el-row style="margin-bottom: 12px;">
          <el-button size="mini">默认按钮</el-button>
          <el-button
            size="mini"
            type="primary"
          >主要按钮</el-button>
          <el-button
            size="mini"
            type="success"
          >成功按钮</el-button>
          <el-button
            size="mini"
            type="info"
          >信息按钮</el-button>
          <el-button
            size="mini"
            type="warning"
          >警告按钮</el-button>
          <el-button
            size="mini"
            type="danger"
          >危险按钮</el-button>
        </el-row>
        <el-row style="margin-bottom: 12px;">
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </el-row>
        <el-row style="margin-bottom: 12px;">
          <el-button round>圆角按钮</el-button>
          <el-button
            type="primary"
            round
          >主要按钮</el-button>
          <el-button
            type="success"
            round
          >成功按钮</el-button>
          <el-button
            type="info"
            round
          >信息按钮</el-button>
          <el-button
            type="warning"
            round
          >警告按钮</el-button>
          <el-button
            type="danger"
            round
          >危险按钮</el-button>
        </el-row>
        <el-row style="margin-bottom: 12px;">
          <el-button
            icon="el-icon-search"
            circle
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-message"
            circle
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-star-off"
            circle
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>
<script src="./script.js"></script>
<style scoped src="../../common/style.css"></style>
<style scoped src="./style.css"></style>