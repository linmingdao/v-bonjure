<template>
    <el-card class="box-card">
        <div slot="header">
            <span>🍺 协作平台的绿色主题</span>
        </div>
        <el-row style="margin-bottom: 12px;">
            <el-button size="mini">默认按钮</el-button>
            <el-button size="mini" type="primary">主要按钮</el-button>
            <el-button size="mini" type="success">成功按钮</el-button>
            <el-button size="mini" type="info">信息按钮</el-button>
            <el-button size="mini" type="warning">警告按钮</el-button>
            <el-button size="mini" type="danger">危险按钮</el-button>
        </el-row>
        <el-row style="margin-bottom: 12px;">
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>
        <el-row style="margin-bottom: 12px;">
            <el-button round>圆角按钮</el-button>
            <el-button type="primary" round>主要按钮</el-button>
            <el-button type="success" round>成功按钮</el-button>
            <el-button type="info" round>信息按钮</el-button>
            <el-button type="warning" round>警告按钮</el-button>
            <el-button type="danger" round>危险按钮</el-button>
        </el-row>
        <el-row style="margin-bottom: 12px;">
            <el-button icon="el-icon-search" circle></el-button>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="success" icon="el-icon-check" circle></el-button>
            <el-button type="info" icon="el-icon-message" circle></el-button>
            <el-button type="warning" icon="el-icon-star-off" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-row>
        <!-- 单选按钮 -->
        <el-row type="flex" justify="start" style="margin-bottom: 12px;" :gutter="20">
            <el-col :span="9">
                <div class="left-justifying">
                    <el-radio v-model="radio" label="1">备选项</el-radio>
                    <el-radio v-model="radio" label="2">备选项</el-radio>
                    <el-radio v-model="radio" label="3">备选项</el-radio>
                    <el-radio v-model="radio" label="4">备选项</el-radio>
                </div>
            </el-col>
        </el-row>
        <!-- 多选按钮 -->
        <el-row type="flex" justify="start" style="margin-bottom: 12px;" :gutter="20">
            <el-col :span="9">
                <div class="left-justifying">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="复选框 A"></el-checkbox>
                        <el-checkbox label="复选框 B"></el-checkbox>
                        <el-checkbox label="复选框 C"></el-checkbox>
                        <el-checkbox label="禁用" disabled></el-checkbox>
                        <el-checkbox label="选中且禁用" disabled></el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-col>
        </el-row>
        <!-- 下拉框 -->
        <el-row style="margin-bottom: 12px;" :gutter="20">
            <el-col :span="3">
                <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-col>
        </el-row>
        <!-- 文本域 -->
        <el-row style="margin-bottom: 12px;" :gutter="20">
            <el-col :span="9">
                <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea"></el-input>
            </el-col>
        </el-row>
        <!-- 输入框 -->
        <el-row style="margin-bottom: 12px;" :gutter="20">
            <el-col :span="3">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="3">
                <el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input"></el-input>
            </el-col>
            <el-col :span="3">
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
            </el-col>
            <el-col :span="3">
                <el-input placeholder="请输入内容" v-model="input" :disabled="true"></el-input>
            </el-col>
        </el-row>
        <!-- 时间选择器 -->
        <el-row style="margin-bottom: 12px;" :gutter="20">
            <el-col :span="3">
                <el-time-select
                    v-model="timeValue1"
                    :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                    }"
                    placeholder="选择时间"
                ></el-time-select>
            </el-col>
            <el-col :span="3">
                <el-time-picker
                    v-model="timeValue2"
                    :picker-options="{
                        selectableRange: '18:30:00 - 20:30:00'
                    }"
                    placeholder="任意时间点"
                ></el-time-picker>
            </el-col>
            <el-col :span="3">
                <el-time-picker
                    arrow-control
                    v-model="timeValue3"
                    :picker-options="{
                        selectableRange: '18:30:00 - 20:30:00'
                    }"
                    placeholder="任意时间点"
                ></el-time-picker>
            </el-col>
            <el-col :span="5">
                <el-time-picker
                    is-range
                    v-model="timeValue4"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                ></el-time-picker>
            </el-col>
            <el-col :span="5">
                <el-time-picker
                    is-range
                    arrow-control
                    v-model="timeValue5"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                ></el-time-picker>
            </el-col>
        </el-row>
        <div style="margin-bottom: 15px;color:red;">选色号不要在乎是否是按钮色号、标签色号、还是图表色号，这个只是程序中色号变量的命名而已（该色号命名也是基于协作平台风格改造的文案）</div>
        <div style="margin-bottom: 15px;">可用的按钮色号</div>
        <el-row style="margin-bottom: 12px;" :gutter="20">
            <el-col :span="24">
                <el-tag
                    :style="{
                        backgroundColor: `${color.value}`,
                        marginRight: '15px',
                        marginBottom: '15px',
                        borderWidth: 0,
                        borderRadius: 0,
                        color: '#fff'
                    }"
                    v-for="color in availableButtonColors"
                    :key="color.value"
                >{{ color.label }},{{ color.value }}</el-tag>
            </el-col>
        </el-row>
        <div style="margin-bottom: 15px;">可用的标签色号</div>
        <el-row style="margin-bottom: 12px;" :gutter="20">
            <el-col :span="24">
                <el-tag
                    :style="{
                        backgroundColor: `${color.value}`,
                        marginRight: '15px',
                        marginBottom: '15px',
                        borderWidth: 0,
                        borderRadius: 0,
                        color: '#fff'
                    }"
                    v-for="color in availableLabelColors"
                    :key="color.value"
                >{{ color.label }},{{ color.value }}</el-tag>
            </el-col>
        </el-row>
        <div style="margin-bottom: 15px;">可用的图表色号</div>
        <el-row style="margin-bottom: 12px;" :gutter="20">
            <el-col :span="24">
                <el-tag
                    :style="{
                        backgroundColor: `${color.value}`,
                        marginRight: '15px',
                        marginBottom: '15px',
                        borderWidth: 0,
                        borderRadius: 0,
                        color: '#fff'
                    }"
                    v-for="color in availableDiagramColors"
                    :key="color.value"
                >{{ color.label }},{{ color.value }}</el-tag>
            </el-col>
        </el-row>
    </el-card>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
