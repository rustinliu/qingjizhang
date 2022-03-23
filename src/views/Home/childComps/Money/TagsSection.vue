<template>
    <div class="tags-wrapper">
        <ol>
            <li
                v-for="tag in moldTags"
                :key="tag.id"
                @click="toggleTag(tag.id)"
                :class="{ selected: selectedTagIds.indexOf(tag.id) >= 0 }"
            >
                <Icon :iconName="tag.iconName" />
                <span>{{ tag.name }}</span>
            </li>
            <li @click="toEdit">
                <Icon iconName="set" />
                <span>
                    <span>设置</span>
                </span>
            </li>
        </ol>
        <router-view />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Edit from '../Edit/Edit.vue';

@Component
export default class TagsSection extends Vue {
    @Prop(Array) tags: Tag[] | undefined;
    @Prop(Array) readonly tagIds!: number[];
    @Prop(String) readonly type!: string;

    get moldTags() {
        if (this.tags !== undefined) {
            return this.tags.filter((tag) => tag.mold === this.type);
        }
        return null;
    }

    selectedTagIds: string[] = [];

    toggleTag(tagId: string) {
        const index = this.selectedTagIds.indexOf(tagId);
        if (index >= 0) {
            this.selectedTagIds = this.selectedTagIds.filter((item) => item !== tagId);
        } else {
            this.selectedTagIds = [tagId];
            this.$emit('update:tagIds', this.selectedTagIds);
        }
    }
    toEdit() {
        this.$router.push({ name: 'Edit' });
    }
}
</script>

<style lang="scss" scoped>
$theme-color: #bba1cb;
.tags-wrapper {
    padding: 20px 38px;

    > ol {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        margin-right: -24px;

        > li {
            width: 20%;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 2px 3px 4px #ddd;
            padding: 10px 12px;
            margin-top: 24px;
            margin-right: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            font-size: 12px;

            > span {
                padding-top: 5px;
            }

            .icon {
                width: 28px;
                height: 28px;
                fill: rgba(0, 0, 0, 0.6);
            }
        }

        .selected {
            background-color: $theme-color;
            box-shadow: 1px 2px 2px #ddd;
        }
    }
}
</style>
