<template>
    <div>
        <label class="formItem">
            <span class="name">{{ this.fieldName }}</span>
            <input
                :type="type || 'text'"
                :placeholder="placeholder"
                :value="x(value)"
                @input="onValueChanged($event.target.value)"
            />
        </label>
    </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
    @Prop() readonly value!: string;
    @Prop({ required: true }) fieldName!: string;
    @Prop() placeholder?: string;
    onValueChanged(value: string) {
        this.$emit("update:value", value);
    }
    @Prop(String) type?: string;
    x(value: string) {
        if (this.type) {
            return dayjs(value).format("YYYY-MM-DD");
        } else return value;
    }
}
</script>

<style lang="scss" scoped>
.formItem {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    .name {
        padding-right: 16px;
    }
    input {
        height: 40px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
    }
}
</style>
