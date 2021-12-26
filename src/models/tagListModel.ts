const localStorageKeyName = "tagList";
type tagListModel = {
    data: string[];
    fetch: () => string[];
    create: (name: string) => "success" | "duplicated";
    save: () => void;
};
const tagListModel: tagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(
            window.localStorage.getItem(localStorageKeyName) || "[]"
        );
        return this.data;
    },
    save() {
        window.localStorage.setItem(
            localStorageKeyName,
            JSON.stringify(this.data)
        );
    },
    create(name) {
        if (this.data.indexOf(name) >= 0) {
            return "duplicated";
        }
        this.data.push(name);
        this.save();
        return "success";
    },
};
export default tagListModel;
