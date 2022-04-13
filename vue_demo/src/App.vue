<template>
  <div id="app">
    <div class="basicBox">
      <MyHeader :addItem="addItem" :listLength="listData.length"></MyHeader>
      <MyList :list-data="useData" :listHeight="test"></MyList>
      <MyFooter :sendList="useData" :check-all="checkAll" :deleteDone="deleteDone"></MyFooter>
    </div>

  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyList from './components/MyList.vue'
import MyFooter from './components/MyFooter.vue'

export default {
  name: 'App',
  data(){
    return{
      listData: [
        {id: '0', name:'吃饭', completed: false},
        {id: '1', name:'睡觉', completed: false},
        {id: '2', name:'打豆豆', completed: false},
      ],
      useData:[],
      test: '',
      pushDone: false
    }
  },
  methods: {
    //用listData初始化useData
    pushList(){
      const _this = this
      for (let i = 0; i < this.listData.length; i++){
        setTimeout(function (){
          _this.useData.push(_this.listData[i])
        },i*500)
      }
      this.pushDone = true
    },
    addItem(obj){
      if(this.test === '100px'){
        this.test = '110px'
      }else{
        this.test = this.listHeight + 100 +'px'
      }
      setTimeout(() => {
        // this.listData.push(obj)
        this.useData.push(obj)
      },250)
    },
    changeChecked(id) {
      this.useData.forEach((item) => {
        if(item.id === id){
          item.completed = !item.completed
        }
      })
    },
    deleteItem(id) {
      this.useData = this.useData.filter((item) => {
        return item.id !== id
      })
      setTimeout(() =>{
        this.test = this.listHeight +'px'
      }, 1000)
    },
    checkAll(isCheck){
      this.useData.forEach((item) => {
        item.completed = isCheck
      })
    },
    deleteDone(){
      this.useData = this.useData.filter((item) => {
        return item.completed !== true
      })
      setTimeout(() =>{
        this.test = this.listHeight +'px'
      }, 1000)
    }
  },
  components: {
    MyHeader,
    MyList,
    MyFooter
  },
  computed: {
    listHeight(){
      if(!this.pushDone) {
        return this.listData.length * 100 + 10
      } else if(this.pushDone && this.useData.length !== 0){
        return this.useData.length * 100 + 10
      }else{
        return 100
      }
    }
  },
  mounted() {
    this.test = this.listHeight+'px'
    this.pushList()
    this.$bus.$on('changeChecked', this.changeChecked)
    this.$bus.$on('deleteItem', this.deleteItem)
  },
  beforeDestroy() {
    this.$bus.$off('changeChecked')
    this.$bus.$off('deleteItem')
  }
}
</script>

<style>
  #app{
    padding: 10px;
  }
  body,html{
    background-color: rgb(244,244,244);
    height: 100%;
    width: 100%;
  }
  *{
    margin: 0;
    padding: 0;
  }
  .basicBox{
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    max-width: 50%;
    min-width: 450px;
    margin: 50px auto;
    transition: all 1s;
    min-height: 1px;
    overflow: hidden;
  }
</style>
