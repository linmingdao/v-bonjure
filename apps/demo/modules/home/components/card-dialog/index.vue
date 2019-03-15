<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>⚽ 同步协作平台的绿色主题的常用弹窗组件</span>
        </div>
        <p>由于每个项目不一样，有协作平台绿色主题的需求则在项目的入口文件手动引入该主题样式即可</p>
        <!-- 单选按钮 -->
        <el-row
          type="flex"
          justify="start"
          style="margin-bottom: 12px;"
          :gutter="20"
        >
          <el-col :span="9">
            <div class="left-justifying">
              <el-radio
                v-model="radio"
                label="1"
              >备选项</el-radio>
              <el-radio
                v-model="radio"
                label="2"
              >备选项</el-radio>
              <el-radio
                v-model="radio"
                label="3"
              >备选项</el-radio>
              <el-radio
                v-model="radio"
                label="4"
              >备选项</el-radio>
            </div>
          </el-col>
        </el-row>
        <!-- 多选按钮 -->
        <el-row
          type="flex"
          justify="start"
          style="margin-bottom: 12px;"
          :gutter="20"
        >
          <el-col :span="9">
            <div class="left-justifying">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox
                  label="禁用"
                  disabled
                ></el-checkbox>
                <el-checkbox
                  label="选中且禁用"
                  disabled
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
        <!-- 下拉框 -->
        <el-row
          style="margin-bottom: 12px;"
          :gutter="20"
        >
          <el-col :span="3">
            <el-select
              v-model="value"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input-number
              v-model="num"
              @change="handleChange"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-col>
        </el-row>
        <!-- 文本域 -->
        <el-row
          style="margin-bottom: 12px;"
          :gutter="20"
        >
          <el-col :span="9">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="textarea"
            >
            </el-input>
          </el-col>
        </el-row>
        <!-- 输入框 -->
        <el-row
          style="margin-bottom: 12px;"
          :gutter="20"
        >
          <el-col :span="3">
            <el-input
              v-model="input"
              placeholder="请输入内容"
            ></el-input>
          </el-col>
          <el-col :span="3">
            <el-input
              placeholder="请选择日期"
              suffix-icon="el-icon-date"
              v-model="input"
            >
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input"
            >
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-input
              placeholder="请输入内容"
              v-model="input"
              :disabled="true"
            >
            </el-input>
          </el-col>
        </el-row>
        <!-- 时间选择器 -->
        <el-row
          style="margin-bottom: 12px;"
          :gutter="20"
        >
          <el-col :span="3">
            <el-time-select
              v-model="timeValue1"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              placeholder="选择时间"
            >
            </el-time-select>
          </el-col>
          <el-col :span="3">
            <el-time-picker
              v-model="timeValue2"
              :picker-options="{
                selectableRange: '18:30:00 - 20:30:00'
              }"
              placeholder="任意时间点"
            >
            </el-time-picker>
          </el-col>
          <el-col :span="3">
            <el-time-picker
              arrow-control
              v-model="timeValue3"
              :picker-options="{
                selectableRange: '18:30:00 - 20:30:00'
              }"
              placeholder="任意时间点"
            >
            </el-time-picker>
          </el-col>
          <el-col :span="5">
            <el-time-picker
              is-range
              v-model="timeValue4"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
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
            >
            </el-time-picker>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>
<script src="./script.js"></script>
<style scoped src="../../common/style.css"></style>
<style scoped src="./style.css"></style>