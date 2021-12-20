<template>
    <div>
        <h1>{{ a }}</h1>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            a: 1,
        };
    },
});
</script>

<style lang="scss" scoped></style>
