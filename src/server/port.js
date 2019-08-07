const PORT = {
  // 获取联系人
  getContartList: {
    method: 'get',
    url: '/contactList'
  },
  // 新建联系人- form表单
  newContartForm: {
    method: 'post',
    url: '/contact/new/form'
  },
  // 新建联系人- json
  newContartJson: {
    method: 'post',
    url: '/contact/new/json'
  },
  // 编辑联系人
  EditContartJson: {
    method: 'put',
    url: '/contact/edit'
  },
  // 删除联系人
  DeleteContart: {
    method: 'delete',
    url: '/contact'
  }
}
export default PORT
