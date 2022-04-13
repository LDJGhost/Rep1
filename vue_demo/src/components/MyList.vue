<template>
  <div class="ListContainer" :style="{height: listHeight}">
    <transition-group
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__backInDown"
        leave-active-class="animate__backOutDown">
      <MyItem v-for="i in listData" :key="i.id" :item-data="i"></MyItem>
    </transition-group>
<!--    <MyItem v-for="i in listData" :key="i.id" :item-data="i"></MyItem>-->
    <div class="empty" v-show="listData.length === 0">暂无事项</div>
  </div>
</template>

<script>
import MyItem from '../components/MyItem'

export default {
  name: "MyList",
  components: {
    MyItem
  },
  props: {
    listData: Array,
    listHeight: String
  },
  computed:{

  }
}
</script>

<style scoped>
  .ListContainer{
    background-color: rgb(240,242,245);
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    box-sizing: border-box;
    transition: all 1s;
    height: 0px;
    overflow: hidden;
    min-width: 50%;
  }
  .empty{
    width: 100%;
    text-align: center;
    color: gray;
    height: 50px;
    line-height: 50px;
  }
</style>