import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/common/clone';
import { nanoid } from 'nanoid';
import day from 'dayjs';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
    } as RootStore,
    getters: {
        // tags
        findTag: (state) => (id: string) => {
            return state.tagList.filter((t) => t.id === id)[0];
        },
        getItemName: (state) => (id: string) => {
            const tag = state.tagList.filter((tag) => tag.id === id)[0];
            return tag ? tag.name : '';
        },
        getItemIcon: (state) => (id: string) => {
            const tag = state.tagList.filter((tag) => tag.id === id)[0];
            return tag ? tag.iconName : '9999';
        },
        // 获取 收入的标签
        income: (state) => {
            return state.recordList.filter((item) => item.category === '+');
        },
        // 获取 今日收入的金额
        incomeMoney: () => (today: string) => {
            const todayIncome = (store.getters.income as RecordItem[]).filter(
                (item) => day(item.createdAt).format('MM') === today
            );
            return todayIncome.map((item) => item.amount);
        },
        // 获取 支出的标签
        expenses: (state) => {
            return state.recordList.filter((item) => item.category === '-');
        },
        // 获取 本月支出的金额
        expensesMoney: () => (today: string) => {
            const mouthExpenses = (store.getters.expenses as RecordItem[]).filter(
                (item) => day(item.createdAt).format('DD') === today
            );
            return mouthExpenses.map((item) => item.amount);
        },
        // 获取当日的总收入或总支出
        dayTotalList: (state) => (type: string) => {
            // 日期从大到小排
            const newList = [...state.recordList]
                .filter((r) => r.category === type)
                .sort((a, b) => day(b.createdAt).valueOf() - day(a.createdAt).valueOf());
            if (newList.length === 0) {
                return [];
            }

            type Result = { title: string; total?: number; items: RecordItem[] }[];
            const result: Result = [
                { title: day(newList[0].createdAt).format('MM/DD'), items: [newList[0]] },
            ];
            for (let i = 1; i < newList.length; i++) {
                const current = newList[i];
                const last = result[result.length - 1];
                if (day(last.title).isSame(day(current.createdAt), 'day')) {
                    last.items.push(current);
                } else {
                    result.push({
                        title: day(current.createdAt).format('MM/DD'),
                        items: [current],
                    });
                }
            }
            // 将金额相加
            result.map(
                (group) =>
                    (group.total = group.items.reduce((sum, item) => {
                        return sum + item.amount;
                    }, 0))
            );
            return result;
        },
    },
    mutations: {
        // records
        fetchRecords(state) {
            state.recordList = JSON.parse(
                window.localStorage.getItem('recordList') || '[]'
            ) as RecordItem[];
            store.commit('saveRecords');
        },
        saveRecords(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        },
        createRecord(state, record: RecordItem) {
            if (record.tagIds.length === 0) {
                alert('请输入标签!');
                return;
            }
            if (record.amount <= 0) {
                alert('请输入金额!');
                return;
            }

            const newRecord: RecordItem = clone(record);
            state.recordList.push(newRecord);
            store.commit('saveRecords');
            window.alert('保存成功');
            window.location.reload();
        },
        // tags
        fetchTags(state) {
            let localTags = JSON.parse(window.localStorage.getItem('tagList') || '[]');
            if (localTags.length === 0) {
                localTags = [
                    { id: nanoid(10), name: '餐饮', iconName: '1', mold: '-' },
                    { id: nanoid(10), name: '娱乐', iconName: '2', mold: '-' },
                    { id: nanoid(10), name: '日用', iconName: '3', mold: '-' },
                    { id: nanoid(10), name: '通讯', iconName: '4', mold: '-' },
                    { id: nanoid(10), name: '果蔬', iconName: '5', mold: '-' },
                    { id: nanoid(10), name: '交通', iconName: '6', mold: '-' },
                    { id: nanoid(10), name: '烟酒', iconName: '7', mold: '-' },
                    { id: nanoid(10), name: '数码', iconName: '8', mold: '-' },
                    { id: nanoid(10), name: '服饰', iconName: '9', mold: '-' },
                    { id: nanoid(10), name: '宠物', iconName: '10', mold: '-' },
                    { id: nanoid(10), name: '旅行', iconName: '11', mold: '-' },
                    { id: nanoid(10), name: '美容', iconName: '12', mold: '-' },
                    { id: nanoid(10), name: '社交', iconName: '13', mold: '-' },
                    { id: nanoid(10), name: '汽车', iconName: '14', mold: '-' },
                    { id: nanoid(10), name: '住房', iconName: '15', mold: '-' },
                    { id: nanoid(10), name: '书籍', iconName: '16', mold: '-' },
                    { id: nanoid(10), name: '长辈', iconName: '17', mold: '-' },
                    { id: nanoid(10), name: '彩票', iconName: '18', mold: '-' },
                    { id: nanoid(10), name: '学习', iconName: '19', mold: '-' },
                    { id: nanoid(10), name: '办公', iconName: '20', mold: '-' },
                    { id: nanoid(10), name: '礼物', iconName: '21', mold: '-' },
                    { id: nanoid(10), name: '运动', iconName: '22', mold: '-' },
                    { id: nanoid(10), name: '零食', iconName: '23', mold: '-' },
                    { id: nanoid(10), name: '维修', iconName: '24', mold: '-' },
                    { id: nanoid(10), name: '工资', iconName: '01', mold: '+' },
                    { id: nanoid(10), name: '兼职', iconName: '02', mold: '+' },
                    { id: nanoid(10), name: '理财', iconName: '03', mold: '+' },
                    { id: nanoid(10), name: '礼金', iconName: '04', mold: '+' },
                    { id: nanoid(10), name: '其他', iconName: '05', mold: '+' },
                ] as Tag[];
            }
            state.tagList = [...localTags];
            store.commit('saveTags');
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
        createTag(state, payload: Payload) {
            const { name, iconName, mold } = payload;
            state.tagList.push({ id: nanoid(10), name, iconName, mold });
            store.commit('saveTags');
            window.location.reload();
        },
        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            state.tagList.splice(index, 1);
            store.commit('saveTags');
            window.location.reload();
        },
        updateTag(state, payload: Payload) {
            const { id, name, iconName, mold } = payload;
            const newTags = state.tagList.map((tag) =>
                tag.id === id ? { id, name, iconName, mold } : tag
            );
            state.tagList = [...newTags];
            store.commit('saveTags');
            window.location.reload();
        },
    },
});

export default store;
