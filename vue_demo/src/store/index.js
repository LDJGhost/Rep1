 //该文件用于创建Vuex中最为核心的store
 import Vuex from 'vuex'
 import Vue from "vue";

 const actions = {}

 const mutations = {}

 const state = {}

 Vue.use(Vuex)

 export default new Vuex.Store({
     actions,
     mutations,
     state,
 })