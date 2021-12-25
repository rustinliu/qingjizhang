<template>
    <Layout class-prefix="layout">
        {{ record }}
        <NumberPad :value.sync="record.amount" />
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

type Record = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
};
@Component({
    components: { Tags, Notes, Types, NumberPad },
})
export default class Account extends Vue {
    tags = ["衣", "食", "住", "行"];
    record: Record = { tags: [], notes: "", type: "-", amount: 0 };

    onUpdatedTags(value: string[]) {
        this.record.tags = value;
    }
    onUpdateNotes(value: string) {
        this.record.notes = value;
    }
}
</script>

<style lang="scss" scoped></style>
