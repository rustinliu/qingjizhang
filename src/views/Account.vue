<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @submit="saveRecord" />
        <Tabs :value.sync="record.type" :data-source="typeList" />
        <div class="notes">
            <FormItem
                placeholder="在这里输入备注"
                fieldName="备注"
                @update:value="onUpdateNotes"
            />
        </div>

        <Tags />
    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Account/NumberPad.vue";
import Tags from "@/components/Account/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import FormItem from "@/components/Account/FormItem.vue";
import Component from "vue-class-component";
import typeList from "@/constans/typeList";

@Component({
    components: { Tags, FormItem, Tabs, NumberPad },
})
export default class Account extends Vue {
    typeList = typeList;
    get recordList() {
        return this.$store.state.recordList;
    }
    record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };

    // recordList = store.recordList; 这里在APP.vue里面添加对store的监测，然后使用computed来获取数据，

    onUpdateNotes(value: string) {
        this.record.notes = value;
    }
    saveRecord() {
        this.$store.commit("createRecord", this.record);
    }

    created() {
        this.$store.commit("fetchRecords");
    }
}
</script>

<style lang="scss" scoped>
.notes {
    padding: 12px 0;
}
</style>
