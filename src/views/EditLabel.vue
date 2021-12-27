<template>
    <layout
        ><div class="navBar">
            <Icon class="leftIcon" name="left" @click="goBack" />
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <div class="form-wrapper">
            <FormItem
                :value="tag.name"
                @update:value="update"
                field-name="标签名"
                placeholder="请输入标签名"
            />
        </div>
        <div class="button-wrapper">
            <Button @click="remove">删除标签</Button>
        </div>
    </layout>
</template>

<script lang="ts">
import tagListModel from "@/models/tagListModel";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Account/FormItem.vue";
import Button from "@/components/Button.vue";

@Component({
    components: { FormItem, Button },
})
export default class EditLabel extends Vue {
    tag?: { id: string; name: string } = undefined;
    created() {
        const id = this.$route.params.id;

        tagListModel.fetch();
        const tags = tagListModel.data;
        const tag = tags.filter((t) => t.id === id)[0];
        if (tag) {
            this.tag = tag;
        } else {
            this.$router.replace("/404");
        }
    }
    update(name: string) {
        if (this.tag) {
            tagListModel.update(this.tag.id, name);
        }
    }
    remove() {
        if (this.tag) {
            if (tagListModel.remove(this.tag.id)) {
                this.$router.back();
            }
        }
    }
    goBack() {
        this.$router.back();
    }
}
</script>

<style lang="scss" scoped>
.navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .leftIcon {
        height: 24px;
        width: 24px;
        left: 16px;
    }
    .rightIcon {
        height: 24px;
        width: 24px;
    }
}
.form-wrapper {
    background-color: #fff;
    margin-top: 8px;
}
.button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
}
</style>
