<template>
    <div>
        <router-link class="money-link" to="/home/money">记一笔</router-link>
        <router-view />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class MoneyKey extends Vue {}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.money-link {
    display: block;
    margin: 28px auto 0;
    background-color: $theme-color;
    color: white;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;
    padding: 14px;
    max-width: 141px;
    text-align: center;
}
</style>
