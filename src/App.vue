<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
    beforeCreate() {
        this.$store.commit('fetchRecords');
        this.$store.commit('fetchTags');
    }
}
</script>
<style lang="scss">
@import '~@/assets/style/index.scss';

#app {
    max-width: 520px;
    margin: 0 auto;
    box-shadow: 0 1rem 3rem rgb(31 45 61 / 13%);
}
</style>
