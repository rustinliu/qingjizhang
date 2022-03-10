<template>
    <Layout name="TODAY">
        <ShowMoney>
            <span slot="title_slot" class="title">今日支出</span>
            <span slot="pay_slot" class="pay">￥ {{ expenses }}</span>
            <span slot="income_slot" class="income">本月收入 ￥ {{ income }}</span>
        </ShowMoney>
        <money-key />
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import MoneyKey from '@/components/common/MoneyKey/MoneyKey.vue';
import day from 'dayjs';
import ShowMoney from '@/components/common/ShowMoney/ShowMoney.vue';

@Component({
    components: { ShowMoney, MoneyKey },
})
export default class Home extends Vue {
    get expenses() {
        const today = day(new Date()).format('DD');
        return (this.$store.getters.expensesMoney(today) as number[]).reduce((preMoney, amount) => {
            return (preMoney += amount);
        }, 0);
    }

    get income() {
        const mouth = day(new Date()).format('MM');
        return (this.$store.getters.incomeMoney(mouth) as number[]).reduce((preMoney, amount) => {
            return (preMoney += amount);
        }, 0);
    }
}
</script>
