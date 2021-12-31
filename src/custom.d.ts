type rootState = {
    recordList: RecordItem[];
    tagList: Tag[];
    currentTag?: Tag;
};
type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    creatdAt?: string;
};

interface Window {}

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
