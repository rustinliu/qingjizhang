<template>
    <div class="show-money">
        <slot name="title_slot" />
        <slot name="pay_slot" />
        <slot name="income_slot" />
        <slot name="count_slot" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class ShowMoney extends Vue {}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.show-money {
    margin-top: 68px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
        padding: 5px;
        font-weight: 700;
    }

    .title {
        color: $theme-color;
    }

    .titleWrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 5px solid $theme-color;
        font-size: 26px;
        padding: 8px;
        color: rgba(185, 186, 184, 0.9);

        & .icon {
            margin-right: 12px;
            width: 38px;
            height: 38px;
            fill: $theme-color;
        }
    }

    .pay {
        font-size: 28px;
        color: $theme-color;
    }

    .count {
        margin-top: 10px;
        font-size: 18px;
        color: rgba(185, 186, 184, 0.9);
        padding: 10px 16px;
        background-color: #f9faf5;
        border-radius: 8px;
    }

    .income {
        margin-top: 15px;
        color: #b7b7b7;
        font-size: 16px;
    }
}
</style>
