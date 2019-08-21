<template>
  <div class="todo-index">
    <el-data-table
      v-bind="tableConfig"
      ref="dataTable"
    >
    <el-table-column prop="completed" label="完成状况">
        <template slot-scope="{ row }">
          <span class="status" :class="{complated: row.completed}">{{ row.completed ? '完成' : '未完成'}}</span>
        </template>
    </el-table-column>
    </el-data-table>
  </div>
</template>

<script>
import { onMounted, value, createElement as h } from 'vue-function-api'
import ELDataTable from "@femessage/el-data-table";

import { getTodoFolderList, todoApi } from '@/services/v1'


const form = [
  {
    type: 'input',
    id: 'text',
    label: '待办内容',
    el: {placeholder: '请输入'},
    rules: [
      {required: true, message: '请输入代办内容', triggle: 'blur'},
    ]
  },
  {
    type: 'switch',
    id: 'completed',
    label: '是否完成',
    default: false,
    // options: [{label: '未完成', value: 0},{label: '已完成', value: 1}]
  },
  {
    type: 'select',
    id: 'todo_folder_id',
    label: '类目',
    options: [],
    rules: [
      {type: 'number', required: true, message: '请选择类目', triggle: 'change'},
    ]
  }
]

export default {
  name: "Todo",
  components: {
    [ELDataTable.name]: ELDataTable
  },
  setup(props, ctx) {
    const { dateFormat } = ctx.root;

    let categoryList = value([])
    let tableForm = value(form)
    let categoryMap = new Map()


    onMounted(() => {

      getTodoFolderList({pageSize: 999}).then(({ payload }) => {
        categoryList.value = payload.list.map(item => ({label: item.title, value: item.id}))
        // 设置 options
        tableForm.value[form.length - 1].options = categoryList.value
        categoryMap = new Map([...categoryList.value.map(v => [v.value, v.label])])
      })
    })


    return {
      categoryList,
      tableConfig: {
        url: todoApi,
        todoApi,
        dataPath: "payload.list",
        totalPath: "payload.total",
        columns: [
          {
            type: 'selection'
          },
          {
            prop: 'text',
            label: '内容'
          },
          {
            label: '类目',
            formatter: row => categoryMap.get(row.todo_folder_id)
          },
          // {
          //   label: '是否完成',
          //   formatter: ({completed}) => {
          //     const text = completed ? '完成' : '未完成'
          //     const className = completed ? 'status complated' : 'status'
          //     return <span class={className}>{text}</span>
          //   }
          // },
          {
            label: "创建时间",
            formatter: row => dateFormat(row.createdAt)
          },
          {
            label: "更新时间",
            formatter: row => dateFormat(row.updatedAt)
          }
        ],
        form: tableForm,
        formAttrs: {
          labelWidth: '100px'
        }
      }
    }
  }
};
</script>

<style lang="less">
.todo-index {
  .el-dialog__body {
    .el-input {
      width: 350px;
    }
  }

  .status {
    position: relative;
    padding-left: 15px;
    &.complated:before {
      background: #409EFF;
    }
    &:before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      content: '';
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background: #eee;
    }
  }
}
</style>
