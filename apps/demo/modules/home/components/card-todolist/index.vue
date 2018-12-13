<template>
    <el-row>
        <el-col :span="24">
            <el-card class="box-card">
                <div slot="header" class="clearfix"><span>📜 todolist(@业务组件)</span></div>
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
</template>
<script src="./script.js"></script>
<style scoped src="../../common/style.css"></style>
<style scoped src="./style.css"></style>