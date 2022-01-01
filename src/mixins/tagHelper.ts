import Vue from "vue";
import Component from "vue-class-component";

// You can declare mixins as the same style as components.
@Component
export class tagHelper extends Vue {
    createTag() {
        const name = window.prompt("请输入标签名");
        // if (!name) {
        //     return window.alert("标签名不可为空");
        // }
        this.$store.commit("createTag", name);
        if (this.$store.state.createTagError) {
            window.alert(this.$store.state.createTagError.message);
        }
    }
}
