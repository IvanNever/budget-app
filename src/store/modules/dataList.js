import Vue from 'vue';

const budgetStore = {
  namespaced: true,
  state: {
    list: {
      1: {
        type: 'INCOME',
        value: 100,
        comment: 'Some comment',
        id: 1,
      },
      2: {
        type: 'OUTCOME',
        value: -50,
        comment: 'Some outcome comment',
        id: 2,
      },
    },
  },
  getters: {
    budgetList: ({ list }) => Object.values(list)
  },
  mutations: {
    DELETE_ITEM(state, id) {
      Vue.delete(state.list, id);
    }
  },
  actions: {
    onDeleteItem({ commit }, id) {
      commit("DELETE_ITEM", id);
    },
  },
};

export default budgetStore;