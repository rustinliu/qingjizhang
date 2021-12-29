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
import Component from "vue-class-component";
import Tab from "@/components/Tabs.vue";
import intervalList from "@/constans/intervalList";
import typeList from "@/constans/typeList";
@Component({
    components: {
        Tab,
    },
})
export default class Statistics extends Vue {
    interval = "day";
    type = "+";
    intervalList = intervalList;
    typeList = typeList;
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
::v-deep .interval-tabs-item {
    height: 48px;
}
</style>
