<template>
    <!-- 必须有且只有一个根节点 -->
    <div class="container">
        <!-- start 登录表单面板 -->
        <div class="login_panel">
            <!-- start logo区域 -->
            <label class="logo">
                <a class="favicon"></a>
                <span class="text">v-bonjour</span>
            </label>
            <!-- end logo区域 -->
            <!-- start 登录表单区域 -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="remeber">
                    <el-checkbox-group v-model="ruleForm.remeber">
                        <el-checkbox label="记住我" username="remeber"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="pending" @click="submitForm('ruleForm')">立即登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置表单</el-button>
                </el-form-item>
            </el-form>
            <!-- end 登录表单区域 -->
        </div>
        <!-- end 登录表单面板 -->
        <!-- start 粒子动态背景 -->
        <div class="particle_background">
            <div class="particle_container" :key="n" v-for="n in particleQuantity">
                <div class="particle"></div>
            </div>
        </div>
        <!-- end 粒子动态背景 -->
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style/particle_background.css"></style>
<style scoped src="./style/login_panel.css"></style>
