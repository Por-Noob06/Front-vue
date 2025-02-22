<template>
  <nav class="w-64 h-screen bg-[#ECDFCC] text-[#ecf0f1] p-5 fixed left-0 top-0 flex flex-col justify-between rounded-r-lg">
    <div>
      <div class="text-center mb-5">
        <h2 class="text-xl font-bold text-[#1E201E]">Mon App</h2>
      </div>
      <ul class="space-y-4">
        <li v-for="link in links" :key="link.name" @click="goto(link.path)"
            class="p-2 border-b border-gray-500 rounded-r-lg hover:bg-[#697565] cursor-pointer">
          <router-link :to="link.path" class="block w-full text-[#1E201E] font-semibold">{{ link.name }}</router-link>
        </li>
      </ul>
    </div>
    <div @click="logout" class="p-2 rounded-r-lg hover:bg-[#697565] cursor-pointer flex justify-between">
      <h3 class="text-lg font-semibold text-[#1E201E]">Log out</h3>
      <font-awesome-icon  icon="sign-out-alt" class="text-black text-2xl" />
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSignOutAlt);


const router = useRouter()

const links = ref([
  { name: 'Home', path: '/home' },
  { name: 'Profile', path: '/user.profile' },
  { name: 'Contact', path: '/home' },
])

const goto = (path) => {
  router.push(path)
}

const logout = async () => {
  localStorage.removeItem('userToken')
  localStorage.removeItem('userId')
  localStorage.removeItem('userMail')
  setTimeout(() => {
    router.push("/");
  }, 1500);
}
</script>

<style>

/*
  base color
  1E201E
  3C3D37
  697565
  ECDFCC
 */
 </style>
