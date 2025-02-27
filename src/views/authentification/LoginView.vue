<template>
  <section class=" h-full w-full flex flex-col justify-center items-center">
      <div v-if="errorMessage || successMessage"
        class="bg-[#ECDFCC] px-16 py-3 relative bottom-2 rounded-lg"
      >
        <h3 class="text-sm text-red-600">
          <i v-if="errorMessage" class="fas fa-circle-xmark fa-xl" style="color: black;"></i>
          {{ errorMessage }}
        </h3>
        <h3 class="text-sm text-green-600">
          <i v-if="successMessage" class="fas fa-circle-check fa-xl" style="color: black;"></i>
          {{ successMessage }}
        </h3>
        <div class="w-full h-1 bg-red-400 mt-2 relative overflow-hidden rounded-sm">
          <div class="absolute top-0 left-0 h-full bg-[#1E201E] animate-progress"></div>
        </div>
      </div>
    <div id="login-form" class="w-full max-w-sm mx-auto p-6 bg-[#F3C5C5] shadow-lg rounded-lg">
        <form @submit.prevent="login" class="space-y-4">
            <legend>
                <h2 class="text-2xl font-semibold text-center text-gray-700">Sign in</h2>
            </legend>
            <input type="email" v-model="email" placeholder="Email"
                class="w-full p-3 border border-gray-300  text-[#1E201E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C3D37]"/>
            <input type="password" v-model="password" placeholder="Mot de passe"
                class="w-full p-3 border border-gray-300 text-[#1E201E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C3D37]"/>
            <div class="flex flex-col items-center justify-between column">
              <div class=" w-full flex m-2">
                <label class="flex flex-row items-start al text-base text-gray-600">
                    <input type="checkbox" name="remember" class="mr-2 relative top-2"><label>Remember me</label>
                </label>
                <router-link :to="'/verify-code'" class="text-[#1E201E] text-end w-1/2 ml-5">Forgot Password</router-link>
              </div>
              <button type="submit"
                  class="bg-[#1E201E] w-full text-white px-4 py-2 rounded-lg hover:bg-[#3C3D37] transition"
                  >
                  Sign in
              </button>
            </div>
            <h4 class="text-center text-sm text-[#1E201E] w-full">
                <router-link :to="'/register.user'" class="text-[#1E201E]">Sign up</router-link>
            </h4>
            <h4 class="text-center text-sm text-[#1E201E] w-full">
            </h4>
        </form>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const route = useRouter();
const isAuthenticated = ref(false);

onMounted(() => {
  localStorage.removeItem('userToken');
  isAuthenticated.value = localStorage.getItem('userToken') !== null;
  if (isAuthenticated.value) {
    route.push("/home");
  }
});

const login = async () => {
  try {
    const response = await api.post("/login", {
      email: email.value,
      password: password.value,
    });

    console.log("You are logged in", response);

    localStorage.setItem("userToken", response.data.token);
    localStorage.setItem("userMail", response.data.user.email);
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("account", response.data.user.type);

    successMessage.value = "Verification successfull";
    setTimeout(()=>{
      errorMessage.value = ""
      successMessage.value = ""
      route.push("/home");
    },2000)

  } catch (error) {
    console.log("Erreur:", error.response?.data || error);
    errorMessage.value = "Check your password or mail";
    setTimeout(()=>{
      errorMessage.value = "";

    },3000);
  }
};
</script>


<style>

  @keyframes progress {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }

  .animate-progress {
    animation: progress 3s linear forwards;
  }
</style>
