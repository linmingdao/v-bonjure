<template>
    <div class="card-container">
        <el-card
            v-for="(card, index) in cards"
            :key="index"
            :body-style="{ padding: '0px' }"
            style="width:300px;height:350px;margin:25px;cursor: pointer;"
            shadow="hover"
        >
            <div @click="jumpTo(card.module)">
                <div :style="{ backgroundColor: card.color, height: '200px' }">
                    <img :src="card.icon" class="surface" />
                </div>
                <div style="padding: 14px;">
                    <span class="title">{{ card.title }}</span>
                    <div
                        class="description"
                        :title="card.description"
                        slot="reference"
                        style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;overflow: hidden;text-overflow: ellipsis;"
                    >
                        {{ card.description }}
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
