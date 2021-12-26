<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @submit="saveRecord" />
        <Types :value.sync="record.type" />
        <Notes @update:value="onUpdateNotes" />
        <Tags :data-source.sync="tags" @update:value="onUpdatedTags" />
    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Account/NumberPad.vue";
import Tags from "@/components/Account/Tags.vue";
import Types from "@/components/Account/Types.vue";
import Notes from "@/components/Account/Notes.vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import recordListModel from "@/models/recordList";
import tagListModel from "@/models/tagListModel";

@Component({
    components: { Tags, Notes, Types, NumberPad },
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

<style lang="scss" scoped></style>
