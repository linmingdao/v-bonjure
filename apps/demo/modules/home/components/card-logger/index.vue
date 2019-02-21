<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        ><span>📝 日志模块(@core/Logger)</span></div>
        <div class="text item">
          Tips: <span style="color:#e44100;font-size:25px;">Chrome F12 打开控制查看输出的日志信息</span>
        </div>
        <div class="text item">
          输出级别: <span style="color:#409EFF;margin-right:20px;font-size:25px;">{{loggerSettings.logLevel}}</span>
          颜色: <span :style="{marginRight:'20px',fontSize:'25px',color:loggerSettings.color==='on'?'#85ce61':'#f56c6c'}">{{loggerSettings.color}}</span>
          模块: <span :style="{marginRight:'20px',fontSize:'25px',color:loggerSettings.module==='on'?'#85ce61':'#f56c6c'}">{{loggerSettings.module}}</span>
          日期: <span :style="{marginRight:'20px',fontSize:'25px',color:loggerSettings.time==='on'?'#85ce61':'#f56c6c'}">{{loggerSettings.time}}</span>
          级别: <span :style="{marginRight:'20px',fontSize:'25px',color:loggerSettings.level==='on'?'#85ce61':'#f56c6c'}">{{loggerSettings.level}}</span>
        </div>
        <div class="text item">
          关闭的模块: <span style="color:#f56c6c;font-size:25px;">{{loggerSettings.offModules}}</span>
        </div>
        <ul>
          <li>日志开关</li>
          <li>
            <el-button
              size="mini"
              type="success"
              @click="testLogSwitch('color', 'on')"
              round
            >打开color</el-button>
            <el-button
              size="mini"
              type="info"
              @click="testLogSwitch('color', 'off')"
              round
            >关闭color</el-button>
          </li>
          <li>
            <el-button
              size="mini"
              type="success"
              @click="testLogSwitch('module', 'on')"
              round
            >打开模块</el-button>
            <el-button
              size="mini"
              type="info"
              @click="testLogSwitch('module', 'off')"
              round
            >关闭模块</el-button>
          </li>
          <li>
            <el-button
              size="mini"
              type="success"
              @click="testLogSwitch('time', 'on')"
              round
            >打开日期</el-button>
            <el-button
              size="mini"
              type="info"
              @click="testLogSwitch('time', 'off')"
              round
            >关闭日期</el-button>
          </li>
          <li>
            <el-button
              size="mini"
              type="success"
              @click="testLogSwitch('level', 'on')"
              round
            >打开级别</el-button>
            <el-button
              size="mini"
              type="info"
              @click="testLogSwitch('level', 'off')"
              round
            >关闭级别</el-button>
          </li>
          <li>模块开关</li>
          <li>
            <el-button
              size="mini"
              type="primary"
              @click="testModuleSwitch('Global', 'on')"
              round
            >打开 'Global'</el-button>
            <el-button
              size="mini"
              type="info"
              @click="testModuleSwitch('Global', 'off')"
              round
            >关闭 'Global'</el-button>
          </li>
          <li>
            <el-button
              size="mini"
              type="primary"
              @click="testModuleSwitch('UIComponents', 'on')"
              round
            >打开 'UIComponents'</el-button>
            <el-button
              size="mini"
              type="info"
              @click="testModuleSwitch('UIComponents', 'off')"
              round
            >关闭 'UIComponents'</el-button>
          </li>
          <li>
            <el-button
              size="mini"
              type="primary"
              @click="testModuleSwitch('UIComponents/GroupBox', 'on')"
              round
            >打开 'UIComponents/GroupBox'</el-button>
            <el-button
              size="mini"
              type="info"
              @click="testModuleSwitch('UIComponents/GroupBox', 'off')"
              round
            >关闭 'UIComponents/GroupBox'</el-button>
          </li>
          <li>
            <el-button
              size="mini"
              type="primary"
              @click="testModuleSwitch('UIComponents/GroupBox/A', 'on')"
              round
            >打开 'UIComponents/GroupBox/A'</el-button>
            <el-button
              size="mini"
              type="info"
              @click="testModuleSwitch('UIComponents/GroupBox/A', 'off')"
              round
            >关闭 'UIComponents/GroupBox/A'</el-button>
          </li>
          <li>
            <el-button
              size="mini"
              type="primary"
              @click="testModuleSwitch('UIComponents/GroupBox/A/B', 'on')"
              round
            >打开 'UIComponents/GroupBox/A/B'</el-button>
            <el-button
              size="mini"
              type="info"
              @click="testModuleSwitch('UIComponents/GroupBox/A/B', 'off')"
              round
            >关闭 'UIComponents/GroupBox/A/B'</el-button>
          </li>
          <li>日志级别</li>
          <li>
            <el-button
              size="mini"
              @click="testLogLevel('debug')"
              round
            >debug</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="testLogLevel('info')"
              round
            >info</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="testLogLevel('warn')"
              round
            >warn</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="testLogLevel('error')"
              round
            >error</el-button>
            <el-button
              size="mini"
              type="info"
              @click="testLogLevel('mute')"
              round
            >mute</el-button>
          </li>
          <li>打印日志</li>
          <li>
            <el-button
              size="mini"
              @click="testLog('debug')"
              round
            >debug</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="testLog('info')"
              round
            >info</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="testLog('warn')"
              round
            >warn</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="testLog('error')"
              round
            >error</el-button>
          </li>
        </ul>
      </el-card>
    </el-col>
  </el-row>
</template>
<script src="./script.js"></script>
<style scoped src="../../common/style.css"></style>
<style scoped src="./style.css"></style>