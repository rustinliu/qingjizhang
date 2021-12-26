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

        <Tags :data-source.sync="tags" @update:value="onUpdatedTags" />
    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Account/NumberPad.vue";
import Tags from "@/components/Account/Tags.vue";
import Types from "@/components/Account/Types.vue";
import FormItem from "@/components/Account/FormItem.vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import recordListModel from "@/models/recordList";
import tagListModel from "@/models/tagListModel";

@Component({
    components: { Tags, FormItem, Types, NumberPad },
})
export default class Account extends Vue {
    tags = tagListModel.fetch();
    record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };
    recordList = recordListModel.fetch();
    onUpdatedTags(value: string[]) {
        this.record.tags = value;
    }
    onUpdateNotes(value: string) {
        this.record.notes = value;
    }
    saveRecord() {
        const record2: RecordItem = JSON.parse(JSON.stringify(this.record));
        record2.creatdAt = new Date();
        this.recordList.push(record2);
    }
    @Watch("recordList")
    onRecordListChange() {
        recordListModel.save(this.recordList);
    }
}
</script>

<style lang="scss" scoped>
.notes {
    padding: 12px 0;
}
</style>
