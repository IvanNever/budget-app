<template>
  <div class="budget-list-wrap">
    <ElCard :header="header">
      <div class="filter-buttons">
        <el-button type="success" @click="filterItem('INCOME')">Income</el-button>
        <el-button type="danger" @click="filterItem('OUTCOME')">Outcome</el-button>
        <el-button type="primary" @click="filterItem('ALL')">All items</el-button>
      </div>
      <template v-if="!isEmpty">
        <div v-for="(item, prop) in filterItem(filter)" :key="prop">
          <BudgetListItem  :item="item"/>
        </div>
      </template>
      <ElAlert v-else type="info" :title="emptyTitle" :closable="false"/>
    </ElCard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import BudgetListItem from '@/components/BudgetListItem';
export default {
  name: "BudgetList",
  components: {
    BudgetListItem,
  },
  data: () => ({
    header: "Budget List",
    emptyTitle: "Empty List",
    filter: "ALL",
  }),
  computed: {

    ...mapGetters("dataList", ["budgetList"]),

    isEmpty() {
      return !Object.keys(this.budgetList).length;
    },
  },
  methods: {

    filterItem(value) {
      this.filter = value;
      if (value === 'ALL') return this.budgetList;
      const filteredList = Object.entries(this.budgetList).filter(([,val]) => val.type === value);
      return filteredList.reduce((acc, item) => {
        acc[item[0]] = item[1];
        return acc;
      }, {});
    },

  },
}
</script>

<style scoped>
.budget-list-wrap {
  max-width: 500px;
  margin: auto;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}
.budget-value {
  font-weight: bold;
  margin-left: auto;
  padding-right: 20px;
}
.filter-buttons {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
}
</style>