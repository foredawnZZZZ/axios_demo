<template>
  <div class="hello">
    <van-contact-list
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
import axios from 'axios'
import { ContactList, ContactEdit, Popup } from 'vant'
export default {
  name: 'HelloAxios',
  components: {
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [Popup.name]: Popup
  },
  data () {
    return {
      instance: null,
      list: [],
      editingContact: {},
      isEdit: false,
      showEdit: false
    }
  },
  methods: {
    async getList () {
      let res = await this.$Ajax.getContartList()
      if (res.code === 200) {
        this.list = res.data
      }
    },
    onAdd () {
      this.showEdit = true
      this.isEdit = false
    },
    onEdit (info) {
      this.showEdit = true
      this.isEdit = true
      this.editingContact = info
    },
    async onSave (info) {
      if (this.isEdit) {
        let res = await this.$Ajax.EditContartJson(info)
        if (res.code === 200) {
          this.getList()
          this.showEdit = false
          this.editingContact = {}
        }
      } else {
        let ret = await this.$Ajax.newContartJson(info)
        if (ret.code === 200) {
          this.getList()
          this.showEdit = false
          this.editingContact = {}
        }
      }
    },
    async onDelete (info) {
      let res = await this.$Ajax.DeleteContart({
        id: info.id
      })
      if (res.code === 200) {
        this.getList()
        this.showEdit = false
      }

      this.instance.delete('/contact', {
        params: {
          id: info.id
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.getList()
          this.showEdit = false
        }
      })
    }
  },
  created () {
    this.instance = axios.create({
      baseURL: 'http://localhost:9000/api',
      timeout: 1200
    })
    this.getList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .van-popup {
    height: 100%
  }
  .van-contact-list__add {
    z-index: 0;
  }
</style>
