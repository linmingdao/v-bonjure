<template>
    <el-container style="height:100%;">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
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
            </el-main>
        </el-container>
    </el-container>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
