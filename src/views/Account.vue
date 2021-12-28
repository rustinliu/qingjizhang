<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @submit="saveRecord" />
        <Types :value.sync="record.type" />
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
import Types from "@/components/Account/Types.vue";
import FormItem from "@/components/Account/FormItem.vue";
import Component from "vue-class-component";
import store from "@/store/index2";

@Component({
    components: { Tags, FormItem, Types, NumberPad },
    computed: {
        recordList() {
            return store.recordList; //
        },
    },
})
export default class Account extends Vue {
    record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };

    // recordList = store.recordList; 这里在APP.vue里面添加对store的监测，然后使用computed来获取数据，

    onUpdateNotes(value: string) {
        this.record.notes = value;
    }
    saveRecord() {
        store.createRecord(this.record);
    }
}
</script>

<style lang="scss" scoped>
.notes {
    padding: 12px 0;
}
</style>
