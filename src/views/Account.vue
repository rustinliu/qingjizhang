<template>
    <Layout class-prefix="layout">
        <NumberPad />
        <Types />
        <Notes />
        <Tags />
    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Account/Tags.vue";
import Types from "@/components/Account/Types.vue";
import Notes from "@/components/Account/Notes.vue";
import NumberPad from "@/components/Account/NumberPad.vue";

export default Vue.extend({
    components: { Tags, Notes, Types, NumberPad },
});
</script>

<style lang="scss" scoped></style>
