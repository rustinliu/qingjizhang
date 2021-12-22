<template>
    <div
        class="layout-wrapper"
        :class="classPrefix && `${classPrefix}-wrapper`"
    >
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <slot />
        </div>
        <Nav />
    </div>
</template>

<script lang="ts">
export default {
    props: ["classPrefix"],
    name: "Layout",
};
</script>

<style lang="scss" scoped>
.content {
    overflow: auto;
    flex-grow: 1;
}
.layout-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.layout-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>
