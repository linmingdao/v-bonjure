<template>
    <el-card class="box-card">
        <div slot="header">
            <span>🍺 自适应的input输入框</span>
        </div>
        <div>
            <el-tag style="margin-right: 5px;" v-for="(field, index) in fields" :key="index">
                {{ field.name }}({{ field.label }})——{{ field.type }}
            </el-tag>
        </div>
        <div style="margin-top: 10px;">
            <infinity-adaptive-input
                placeholder="请输入字段或者表达式并按回车结束，目前支持的数学运算符: +、-、*、/、(、)"
                :verify="verifyExpression"
                :enter="verifyExpressionSuccessful"
                style="max-width:100%;min-width:530px;"
            />
        </div>
        <div style="margin-top: 10px;">
            <el-tag type="danger" style="margin-right: 5px;" v-for="(expr, index) in expressions" :key="index">
                {{ expr }}
            </el-tag>
        </div>
    </el-card>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
