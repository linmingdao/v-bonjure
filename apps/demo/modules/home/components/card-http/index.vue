<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        ><span>🌐 网络模块(@core/Http)</span></div>
        <ul>
          <li>框架默认的错误处理</li>
          <li>
            <el-button
              @click="testDefaultHttpExceptionHandler(404)"
              type="warning"
              size="mini"
              round
            >发起一个404请求</el-button>
            <el-button
              @click="testDefaultHttpExceptionHandler(500)"
              type="danger"
              size="mini"
              round
            >发起一个500请求</el-button>
          </li>
          <li>用户自定义的错误处理</li>
          <li>
            <el-button
              @click="testCustomHttpExceptionHandler(404)"
              type="warning"
              size="mini"
              round
            >发起一个404请求</el-button>
            <el-button
              @click="testCustomHttpExceptionHandler(500)"
              type="danger"
              size="mini"
              round
            >发起一个500请求</el-button>
          </li>
          <li>RESTful API 频繁使用的方法</li>
          <li>
            <el-button
              @click="testRESTfulApiMethod('GET')"
              size="mini"
              round
            >GET</el-button>
            <el-button
              @click="testRESTfulApiMethod('POST')"
              size="mini"
              round
            >POST</el-button>
            <el-button
              @click="testRESTfulApiMethod('PUT')"
              size="mini"
              round
            >PUT</el-button>
            <el-button
              @click="testRESTfulApiMethod('PATCH')"
              size="mini"
              round
            >PATCH</el-button>
            <el-button
              @click="testRESTfulApiMethod('DELETE')"
              size="mini"
              round
            >DELETE</el-button>
            <el-button
              @click="testRESTfulApiMethod('HEAD')"
              size="mini"
              round
            >HEAD</el-button>
          </li>
          <!-- <li>RESTful API 使用较少的方法</li>
                    <li>
                        <el-button @click="testRESTfulApiMethod('HEAD')" size="mini" round>HEAD</el-button>
                        <el-button @click="testRESTfulApiMethod('OPTIONS')" size="mini" round>OPTIONS</el-button>
                        <el-button @click="testRESTfulApiMethod('TRACE')" size="mini" round>TRACE</el-button>
                        <el-button @click="testRESTfulApiMethod('CONNECT')" size="mini" round>CONNECT</el-button>
                    </li> -->
        </ul>
      </el-card>
    </el-col>
  </el-row>
</template>
<script src="./script.js"></script>
<style scoped src="../../common/style.css"></style>
<style scoped src="./style.css"></style>