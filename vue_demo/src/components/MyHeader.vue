<template>
  <div class="Container">
    <input v-model="text" @keydown.enter="add" placeholder="请输入事项名">
    <div class="space"></div>
    <button @click="add" >添加</button>
  </div>
</template>

<script>
  export default {
    name: "MyHeader",
    data(){
      return{
        text: '',
        listId : this.listLength
      }
    },
    props: ['addItem', 'listLength'],
    methods: {
      add(){
        if(this.text === ''){
          alert('事项名不能为空')
        }else {
          const obj = {id: this.listId+'', name: this.text, completed: false}
          console.log(this.listLength)
          this.addItem(obj)
          this.text = ''
          this.listId++
        }
      },
    }
  }
</script>

<style scoped>
  .Container{
    display: flex;
    justify-content: space-between;
  }
  input{
    height: 50px;
    width: 85%;
    border-radius: 20px;
    outline: none;
    padding-left: 20px;
    border: black 1px solid;
    margin-bottom: 20px;
    font-size: 17px;
  }
  button{
    cursor: pointer;
    width: 100px;
    height: 50px;
    border: none;
    background-color: cornflowerblue;
    color: white;
    border-radius: 20px;
    margin-left: 1px;
    font-size: 17px;
    opacity: 0.9;
  }
  button:hover{
    opacity: 1;
  }
  .space{
    width: 20px;
  }
</style>