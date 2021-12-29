<template>
    <Layout>
        <Tab class-prefix="type" :data-source="typeList" :value.sync="type" />
        <Tab
            class-prefix="interval"
            :data-source="intervalList"
            :value.sync="interval"
        />
        type:{{ type }}
        <br />
        interval:{{ interval }}
    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/Account/Types.vue";
import Component from "vue-class-component";
import Tab from "@/components/Tabs.vue";
@Component({
    components: {
        Types,
        Tab,
    },
})
export default class Statistics extends Vue {
    interval = "day";
    type = "+";
    intervalList = [
        { text: "按天", value: "day" },
        { text: "按周", value: "month" },
        { text: "按月", value: "year" },
    ];
    typeList = [
        { text: "收入", value: "+" },
        { text: "支出", value: "-" },
    ];
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
    background-color: white;
    &.selected {
        background: #c4c4c4;
        &::after {
            display: none;
        }
    }
}
</style>
