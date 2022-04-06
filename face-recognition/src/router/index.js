import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import CurriculumHome from '@/components/teachers/CurriculumHome'
import AdjustCourse from '@/components/teacher/AdjustCourse'
import Timetable from '@/components/teacher/Timetable'
import EnterToClass from '@/components/teacher/EnterToClass'
import EnterToRecord from '@/components/teacher/EnterToRecord'
import StudentRegistration from '@/components/admin/StudentRegistration'
import StudentChooseCourses from '@/components/admin/StudentChooseCourses'
import AdjustCourse1 from '@/components/admin/AdjustCourse'

import TotalFocus from '@/components/focus/TotalFocus'
import PersonalFocus from '@/components/focus/PersonalFocus'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/teacher/timetable',
      component: Timetable
    },
    {
      path: '/teacher/enterToClass',
      component: EnterToClass
    },
    {
      path: '/teacher/enterToRecord',
      component: EnterToRecord
    },
    {
      path: '/teacher/AdjustCourse',
      component: AdjustCourse
    },
    {
      path: '/admin/studentRegistration',
      component: StudentRegistration
    },
    {
      path: '/admin/studentChooseCourses',
      component: StudentChooseCourses
    },
    {
      path: '/admin/adjustCourse',
      component: AdjustCourse1
    },
    {
      path: '/CurriculumHome',
      component: CurriculumHome
    },

    {
      path: '/focus/TotalFocus',
      component: TotalFocus
    },

    {
      path: '/focus/PersonalFocus',
      component: PersonalFocus
    }
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
