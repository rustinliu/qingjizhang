<template>
    <div class="nav-wrapper">
        <div class="content">
            <slot></slot>
        </div>
        <Nav></Nav>
    </div>
</template>

<style lang="scss" scoped>
.nav-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.content {
    border: 1px solid #000;
    flex-grow: 1;
    overflow: auto;
}
</style>
