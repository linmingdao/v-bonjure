<template>
    <el-card>
        <div slot="header">
            <span>🍺 使用simply-table组件实现的用户列表模块</span>
        </div>
        <div>
            <!-- 表格组件，主要是配置表格的CRUD操作 -->
            <simply-table
                :columns="columns"
                :method-delete="methodDelete"
                :method-create="methodCreate"
                :method-update="methodUpdate"
                :method-retrieve="methodRetrieve"
                :method-delete-bulk="methodDeleteBulk"
            >
                <!-- 用户自定义的表格条件设置区域 -->
                <template slot="filter">
                    <form-group desc="姓名(模糊匹配)" :formWidth="150">
                        <el-input placeholder="请输入内容" v-model="filterParams.username"></el-input>
                    </form-group>
                    <form-group desc="省份(精确匹配)" :formWidth="150">
                        <el-select v-model="filterParams.province" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </form-group>
                </template>
                <!-- 用户自定义的表单区域 -->
                <template slot="form">
                    <el-form label-position="left" label-width="55px" ref="formData" :model="ruleForm" :rules="rules">
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
                    </el-form>
                </template>
            </simply-table>
        </div>
    </el-card>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
