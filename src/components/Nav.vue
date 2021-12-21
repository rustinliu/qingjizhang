<template>
    <div class="nav">
        <router-link to="/Account">
            <Icon name="money" />
            记账
        </router-link>
        <router-link to="/labels">
            <Icon name="labels" />
            标签</router-link
        >
        <router-link to="/statistics">
            <Icon name="statistics" />统计</router-link
        >
    </div>
</template>

<script lang="ts">
import Vue from "vue";
//一次性引入
let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
    requireContext.keys().forEach(requireContext);
try {
    importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
    console.log(error);
}
export default Vue.extend({});
</script>

<style lang="scss" scoped></style>
