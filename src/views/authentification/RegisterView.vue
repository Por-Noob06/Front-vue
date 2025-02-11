<template>
  <section class="h-full w-full flex flex-col justify-center items-center">
    <div
      v-if="successMessage"
      class="bg-[#ECDFCC] px-16 py-3 relative bottom-2 rounded-lg">
        <p class="text-green-800 text-sm text-center"><i class="fa-solid fa-circle-check fa-xl" style="color: #3C3D37;"></i> {{ successMessage }}</p>
        <div class="w-full h-1 bg-red-400 mt-2 relative overflow-hidden rounded-sm">
          <div class="absolute top-0 h-full bg-[#1E201E] animate-progress"></div>
        </div>
      </div>
      <div id="signin-form" class="w-full max-w-sm mx-auto p-6 bg-[#F3C5C5] shadow-lg rounded-lg">
        <form @submit.prevent="register" id="register" class="space-y-4">

          <legend class="text-2xl font-semibold text-center text-gray-700">Sign up</legend>

          <div class="space-y-2">
            <input type="text" v-model="fname" placeholder="First name" required
              class="w-full p-3 border border-gray-300 rounded-lg text-base text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#3C3D37]"/>
          </div>

          <div class="space-y-2">
            <input type="text" v-model="lname" placeholder="Last name"
              class="w-full p-3 border border-gray-300 rounded-lg text-base text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#3C3D37]"/>
          </div>

          <div class="space-y-2">
            <input type="email" v-model="email" placeholder="example@email.com" required
              class="w-full p-3 border border-gray-300 rounded-lg text-base text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#3C3D37]"/>
          </div>

          <div class="space-y-2">
            <input type="password" v-model="password" placeholder="Password" required
              class="w-full p-3 border border-gray-300 rounded-lg text-base text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#3C3D37]"/>
          </div>

          <div class="space-y-2">
            <input type="password" v-model="confirmPassword" placeholder="Confirm password" required
              class="w-full p-3 border border-gray-300 rounded-lg text-base text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#3C3D37]"/>
          </div>

          <p v-if="errorMessage" class="text-red-600 text-sm text-center">{{ errorMessage }}</p>

          <div class="flex flex-col items-center space-y-3">
            <button type="submit"
              class="w-full bg-[#1E201E] text-white py-2 rounded-lg hover:bg-[#3C3D37] transition">
              Register
            </button>
            <h4 class="text-sm text-gray-600">
              <router-link to="/" class="text-pink-600 hover:underline">Already have an account?</router-link>
            </h4>
          </div>
        </form>
      </div>
  </section>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; // Importer Vue Router
  import api from '@/services/api';

  const fname = ref("");
  const lname = ref("");
  const email = ref("");
  const password = ref("");
  const type = ref("");
  const fnameMaj = ref("");
  const lnameMaj = ref("");
  const confirmPassword = ref("");


  // pour les messages
  const successMessage = ref("");
  const errorMessage = ref("");

  const router = useRouter();

  const register = async () => {

    if (password.value !== confirmPassword.value) {
      errorMessage.value = "Passwords do not match!";
      return;
    }

    type.value = "user";
    fnameMaj.value = fname.value.charAt(0).toUpperCase() + fname.value.slice(1);
    lnameMaj.value = lname.value.charAt(0).toUpperCase() + lname.value.slice(1);

    const userData = {
      fname: fnameMaj.value,
      lname: lnameMaj.value,
      email: email.value,
      type: type.value,
      password: password.value,
    };

    try {
      const response = await api.post('/register', userData);
      console.log("Registration successful");

      successMessage.value = "Registration successful! Redirecting to login...";
      errorMessage.value = "";
      // Redirection vers la page de connexion après 2 secondes
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error.response);

      // Affichage du message d'erreur
      errorMessage.value = error.response?.data?.message || "An error occurred during registration.";
      successMessage.value = "";
    }
  };
</script>

<style scoped>

</style>
