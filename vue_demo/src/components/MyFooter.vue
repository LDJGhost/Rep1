<template>
  <div class="footer" v-show="all!==0">
    <div class="checkBox">
      <input type="checkbox" v-model="isAll"/>
      <span>全选</span>
    </div>

    <div>已完成: {{done}}/{{all}}</div>
    <button @click="deleteDone">删除已选中</button>
  </div>
</template>

<script>
  export default {
    name: "MyFooter",
    props: ['sendList', 'checkAll', 'deleteDone'],
    computed:{
      done(){
        let count = 0
        this.sendList.forEach((item) =>{
          if(item.completed === true) count++
        })
        return count
      },
      all(){
        return this.sendList.length
      },
      isAll:{
        get(){
          return this.all === this.done && this.done > 0
        },
        set(value){
          this.checkAll(value)
        }
      }
    }
  }
</script>

<style scoped>
  .footer{
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    background-color: rgb(240,242,245);
    text-align: center;
    height: 80px;
    width: 100%;
    border-radius: 20px;
    line-height: 70px;
    font-size: 18px;
  }
  button{
    margin-right: 2%;
    margin-left: 5%;
    cursor: pointer;
    width: 130px;
    height: 45px;
    border: none;
    background-color: cornflowerblue;
    color: white;
    border-radius: 20px;
    font-size: 15px;
    opacity: 0.9;
  }
  button:hover{
    opacity: 1;
  }
  .checkBox{
    margin-left:4%;
    width: 130px;
    display: flex;
    align-items: center;
  }
  input{
    margin-right: 8%;
    height: 20px;
    width: 20px;
  }
</style>