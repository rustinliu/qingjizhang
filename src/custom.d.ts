type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    creatdAt?: Date;
};

interface Window {
    tagList: Tag[];
    createTag: (name: string) => void;
    removeTag: (id: string) => boolean;
    updateTag: tagListModel["update"];
    findTag: (id: string) => Tag | undefined;
}

type Tag = {
    id: string;
    name: string;
};
type tagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => "success" | "duplicated";
    save: () => void;
    update: (
        id: string,
        name: string
    ) => "success" | "not found" | "duplicated";
    remove: (id: string) => boolean;
};
