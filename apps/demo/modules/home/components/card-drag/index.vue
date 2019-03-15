<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>🐪 魔镜拖拽组件案例</span>
        </div>
        <div>
          <div
            class="drag-region"
            style="margin-bottom: 15px;"
          >
            <draggable
              style="height: 100px"
              :list="list1"
              :options="{
                group:UNIVERSE_GROUP
              }"
              @start="list1Start"
              @end="list1End"
              class="dragAreaList1"
            >
              <el-tag
                class="drag-block"
                v-for="(element, index) in list1"
                :key="element.id"
                closable
                @close="handleDel(index, element.id)"
              >
                {{element.name}}
              </el-tag>
            </draggable>
          </div>
          <div class="drag-region">
            <draggable
              class="dragAreaList2"
              :list="list2"
              :options="{
                group:{
                  name: groupFalgs,
                  pull:'clone'
                },
                filter: '.undraggable',
              }"
              @end="list2End"
            >
              <el-tag
                class="drag-block"
                v-for="element in list2"
                :key="element.id"
                closable
                :type="element.flag?'danger':''"
              >
                {{element.name}}
              </el-tag>
            </draggable>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script src="./script.js"></script>
<style scoped src="../../common/style.css"></style>
<style scoped src="./style.css"></style>