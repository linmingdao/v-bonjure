<template>
    <div>
        <el-form label-position="left" label-width="55px" ref="userForm" :model="ruleForm" :rules="rules">
            <el-form-item label="日期" prop="date">
                <el-date-picker
                    v-model="ruleForm.date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="省份" prop="province">
                <el-select v-model="ruleForm.province" placeholder="请选择省份" style="width: 100%;">
                    <el-option
                        v-for="item in provinceOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="市区" prop="city">
                <el-select v-model="ruleForm.city" placeholder="请选择市区" style="width: 100%;">
                    <el-option
                        v-for="item in cityOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
            </el-form-item>
            <el-form-item label="邮编" prop="zip">
                <el-input v-model="ruleForm.zip" placeholder="请输入邮编"></el-input>
            </el-form-item>
            <el-form-item label prop="state">
                <el-switch
                    v-model="ruleForm.state"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="激活"
                    inactive-text="禁用"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleResetForm">重 置</el-button>
                <el-button type="success" @click="handleConfirm">保 存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
