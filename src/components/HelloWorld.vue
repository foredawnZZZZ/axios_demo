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
    getList () {
      this.instance.get('/contactList')
        .then(res => {
          let data = res.data
          if (data.code === 200) {
            this.list = data.data
          }
        })
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
    onSave (info) {
      if (this.isEdit) {
        this.instance.put('/contact/edit', info)
          .then(res => {
            console.log(res)
            if (res.data.code === 200) {
              this.getList()
              this.showEdit = false
            }
          })
      } else {
        this.instance.post('/contact/new/json', info)
          .then(res => {
            console.log(res)
            if (res.data.code === 200) {
              this.getList()
              this.showEdit = false
            }
          })
      }
    },
    onDelete (info) {
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
