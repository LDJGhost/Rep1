<template>
  <div class="Container"
       @click="HandleChecked(itemData.id)">
    <input type="checkbox" class="checkBox" :checked="itemData.completed">
    <p style="font-size: 20px; cursor: default">{{itemData.name}}</p>
    <img src="../assets/img/delete.png" class="deleteBtn" ref="deleteBtn" @click.stop="Delete(itemData.id)">
  </div>
</template>

<script>
import 'animate.css'
export default {
  name: "MyItem",
  props: {
    itemData: Object,
  },
  methods: {
    HandleChecked (id) {
      console.log(id)
      this.$bus.$emit('changeChecked', id)
    },
    Delete (id) {
      this.$bus.$emit('deleteItem', id)
    }
  }
}
</script>

<style scoped>
  .Container{
    display: flex;
    justify-content: space-between;
    /*background-color: cornflowerblue;*/
    height: 70px;
    width: 100%;
    background-color: white;
    margin-bottom: 30px;
    border-radius: 20px;
    line-height: 70px;
    align-items: center;
    transition: all 1s;
  }
  .Container:hover{
    box-shadow: 5px 10px 15px rgb(0,0,0,0.1);
  }
  .Container:hover .deleteBtn{
    opacity: 0.8;
  }
  .checkBox{
    margin-left: 20px;
    height: 20px;
    width: 20px;
  }
  .deleteBtn{
    cursor: pointer;
    opacity: 0;
    height: 25px;
    margin-right: 20px;
    transition: opacity 0.3s;
  }
  img:hover{
    opacity: 1!important;
  }
</style>