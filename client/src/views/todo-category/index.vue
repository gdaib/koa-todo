<template>
  <div class="category-main">
    <el-data-table v-bind="tableConfig"></el-data-table>
  </div>
</template>

<script>
import ELDataTable from "@femessage/el-data-table";

import { todoFolderApi } from "@/services/v1";

export default {
  components: {
    [ELDataTable.name]: ELDataTable
  },
  setup(props, ctx) {
    const { dateFormat } = ctx.root;

    return {
      tableConfig: {
        url: todoFolderApi,
        dataPath: "payload.list",
        totalPath: "payload.total",
        columns: [
          {
            prop: "title",
            label: "标题"
          },
          {
            label: "创建时间",
            formatter: row => dateFormat(row.createdAt)
          },
          {
            label: "更新时间",
            formatter: row => dateFormat(row.updatedAt)
          }
        ],
        form: [
          {
            type: "input",
            id: "title",
            label: "类目标题",
            rules: [
              {
                trigger: "blur",
                required: true,
                message: "请输入类目标题"
              }
            ]
          }
        ],
        searchForm: [
          {
            type: 'input',
            id: 'title',
            label: "类目名称",
            el: {
              placeholder: '请输入'
            }
          }
        ]
      }
    };
  }
};
</script>

<style>
</style>