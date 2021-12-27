import recordListModel from "@/models/recordList";

export default {
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => recordListModel.create(record),
};
