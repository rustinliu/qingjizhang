<template>
    <div class="nav">
        <router-link to="/Account">记账</router-link>
        <router-link to="/labels">标签</router-link>
        <router-link to="/statistics">统计</router-link>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import x from "@/assets/icons/money.svg";
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.nav {
}
</style>
