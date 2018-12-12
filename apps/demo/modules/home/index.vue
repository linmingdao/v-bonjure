<template>
    <el-container style="height:100%;">
        <el-header>
            v-bonjour demo工程, 帮助你快速上手框架
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!-- 使用公共组件 -->
                <tree></tree>
            </el-aside>
            <el-main>
                <!-- start 计数器案例 -->
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>⏰ 计数器</span>
                            </div>
                            <div class="text item">
                                Count: {{count}}
                            </div>
                            <div class="text item">
                                CountRMB: {{countWithRmbPrefix}}
                            </div>
                            <div class="text item">
                                <el-button type="primary" @click="increment(1)">自增 1</el-button>
                                <el-button type="success" @click="increment(5)">自增 5</el-button>
                                <el-button type="danger" @click="decrement(1)">自减 1</el-button>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- end 计数器案例 -->
                <!-- start todolist案例 -->
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix"><span>📜 todolist</span></div>
                            <div class="text item">
                                ∑(sum): <span style="color:#409EFF;margin-right:20px;font-size:25px;">{{doneTodosCount + undoneTodosCount}}</span>
                                ✂(done): <span style="margin-right:20px;font-size:25px;color:#85ce61;">{{doneTodosCount}}</span>
                                ⌚(undone): <span style="color:#f56c6c;font-size:25px;">{{undoneTodosCount}}</span>
                            </div>
                            <form>
                                <label for="new-todo">add a todo</label>
                                <input id="new-todo" style="padding: 2px 10px;" v-model="newTodoText" placeholder="E.g. feed the cat">
                                <el-button @click="addTodo(newTodoText)" type="primary" size="mini" icon="el-icon-plus" circle></el-button>
                                <el-button @click="resetTodoList" size="mini" round>重置列表</el-button>
                            </form>
                            <ul>
                                <li v-bind:class="{finished: item.done}" :key="index" v-for="(item, index) in sortedTodos">
                                    {{item.done?'✌':'✍'}} {{index+1}}. {{ item.text }}
                                    <el-button @click="deleteTodo(item.text)" type="danger" size="mini" icon="el-icon-minus" circle></el-button>
                                    <el-button @click="finishTodo(item.text)" v-if="!item.done" size="mini" type="success" icon="el-icon-check" circle></el-button>
                                </li>
                            </ul>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- end todolist案例 -->
                <!-- start http模块 -->
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix"><span>🌐 网络模块(@vbonjour/Http)</span></div>
                            <ul>
                                <li>框架默认的错误处理</li>
                                <li>
                                    <el-button @click="testDefaultHttpExceptionHandler(404)" type="warning" size="mini" round>发起一个404请求</el-button>
                                    <el-button @click="testDefaultHttpExceptionHandler(500)" type="danger" size="mini" round>发起一个500请求</el-button>
                                </li>
                                <li>用户自定义的错误处理</li>
                                <li>
                                    <el-button @click="testCustomHttpExceptionHandler(404)" type="warning" size="mini" round>发起一个404请求</el-button>
                                    <el-button @click="testCustomHttpExceptionHandler(500)" type="danger" size="mini" round>发起一个500请求</el-button>
                                </li>
                                <li>RESTful API 支持的方法</li>
                                <li>
                                    <el-button @click="testRESTfulApiMethod('GET')" size="mini" round>GET</el-button>
                                    <el-button @click="testRESTfulApiMethod('POST')" size="mini" round>POST</el-button>
                                    <el-button @click="testRESTfulApiMethod('PUT')" size="mini" round>PUT</el-button>
                                    <el-button @click="testRESTfulApiMethod('PATCH')" size="mini" round>PATCH</el-button>
                                    <el-button @click="testRESTfulApiMethod('DELETE')" size="mini" round>DELETE</el-button>
                                    <el-button @click="testRESTfulApiMethod('HEAD')" size="mini" round>HEAD</el-button>
                                    <el-button @click="testRESTfulApiMethod('OPTIONS')" size="mini" round>OPTIONS</el-button>
                                </li>
                            </ul>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- end http模块 -->
                <!-- start 日志模块 -->
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix"><span>📝 日志模块(@vbonjour/Logger)</span></div>
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
                                    <el-button size="mini" type="success" @click="testLogSwitch('color', 'on')" round>打开color</el-button>
                                    <el-button size="mini" type="info" @click="testLogSwitch('color', 'off')" round>关闭color</el-button>
                                </li>
                                <li>
                                    <el-button size="mini" type="success" @click="testLogSwitch('module', 'on')" round>打开模块</el-button>
                                    <el-button size="mini" type="info" @click="testLogSwitch('module', 'off')" round>关闭模块</el-button>
                                </li>
                                <li>
                                    <el-button size="mini" type="success" @click="testLogSwitch('time', 'on')" round>打开日期</el-button>
                                    <el-button size="mini" type="info" @click="testLogSwitch('time', 'off')" round>关闭日期</el-button>
                                </li>
                                <li>
                                    <el-button size="mini" type="success" @click="testLogSwitch('level', 'on')" round>打开级别</el-button>
                                    <el-button size="mini" type="info" @click="testLogSwitch('level', 'off')" round>关闭级别</el-button>
                                </li>
                                <li>模块开关</li>
                                <li>
                                    <el-button size="mini" type="primary" @click="testModuleSwitch('Global', 'on')" round>打开 'Global'</el-button>
                                    <el-button size="mini" type="info" @click="testModuleSwitch('Global', 'off')" round>关闭 'Global'</el-button>
                                </li>
                                <li>
                                    <el-button size="mini" type="primary" @click="testModuleSwitch('UIComponents', 'on')" round>打开 'UIComponents'</el-button>
                                    <el-button size="mini" type="info" @click="testModuleSwitch('UIComponents', 'off')" round>关闭 'UIComponents'</el-button>
                                </li>
                                <li>
                                    <el-button size="mini" type="primary" @click="testModuleSwitch('UIComponents/GroupBox', 'on')" round>打开 'UIComponents/GroupBox'</el-button>
                                    <el-button size="mini" type="info" @click="testModuleSwitch('UIComponents/GroupBox', 'off')" round>关闭 'UIComponents/GroupBox'</el-button>
                                </li>
                                <li>
                                    <el-button size="mini" type="primary" @click="testModuleSwitch('UIComponents/GroupBox/A', 'on')" round>打开 'UIComponents/GroupBox/A'</el-button>
                                    <el-button size="mini" type="info" @click="testModuleSwitch('UIComponents/GroupBox/A', 'off')" round>关闭 'UIComponents/GroupBox/A'</el-button>
                                </li>
                                <li>
                                    <el-button size="mini" type="primary" @click="testModuleSwitch('UIComponents/GroupBox/A/B', 'on')" round>打开 'UIComponents/GroupBox/A/B'</el-button>
                                    <el-button size="mini" type="info" @click="testModuleSwitch('UIComponents/GroupBox/A/B', 'off')" round>关闭 'UIComponents/GroupBox/A/B'</el-button>
                                </li>
                                <li>日志级别</li>
                                <li>
                                    <el-button size="mini" @click="testLogLevel('debug')" round>debug</el-button>
                                    <el-button size="mini" type="primary" @click="testLogLevel('info')" round>info</el-button>
                                    <el-button size="mini" type="warning" @click="testLogLevel('warn')" round>warn</el-button>
                                    <el-button size="mini" type="danger" @click="testLogLevel('error')" round>error</el-button>
                                    <el-button size="mini" type="info" @click="testLogLevel('mute')" round>mute</el-button>
                                </li>
                                <li>打印日志</li>
                                <li>
                                    <el-button size="mini" @click="testLog('debug')" round>debug</el-button>
                                    <el-button size="mini" type="primary" @click="testLog('info')" round>info</el-button>
                                    <el-button size="mini" type="warning" @click="testLog('warn')" round>warn</el-button>
                                    <el-button size="mini" type="danger" @click="testLog('error')" round>error</el-button>
                                </li>
                            </ul>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- end 日志模块 -->
                <!-- start 消息中心 -->
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix"><span>📣 消息中心(@vbonjour/Notification)</span></div>
                            <ul>
                                <li>
                                    <el-button size="mini" @click="showLoading" round>显示loading效果</el-button>
                                    <el-button size="mini" type="primary" @click="showAlert" round>显示alert弹窗</el-button>
                                    <el-button size="mini" type="warning" @click="showConfirm" round>显示confirm弹窗</el-button>
                                    <el-button size="mini" type="danger" @click="showMessage" round>显示message弹窗</el-button>
                                </li>
                            </ul>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- end 消息中心 -->
            </el-main>
        </el-container>
    </el-container>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>