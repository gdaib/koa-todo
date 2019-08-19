<template>
  <div class="category-main">
    <el-data-table v-bind="tableConfig">

    </el-data-table>
  </div>
</template>

<script>
import ELDataTable from "el-data-table";

import {todoFolderApi } from '@/services/v1'

export default {
  components: {
    [ELDataTable.name]: ELDataTable
  },
  setup() {
    return {
      tableConfig: {
        url:todoFolderApi,
      }
    }
  }
};
</script>

<style>
</style>