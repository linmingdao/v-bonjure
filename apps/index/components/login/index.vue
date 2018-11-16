<template>
    <div class="source demo-form demo-zh-CN">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="remeber">
                <el-checkbox-group v-model="ruleForm.remeber">
                    <el-checkbox label="记住我" name="remeber"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置表单</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
