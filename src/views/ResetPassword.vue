<template>
  <div class="h-full w-full flex flex-col justify-center items-center">

    <!-- Message d'erreur ou succès -->
    <div v-if="errorMessage || successMessage"
      class="bg-[#ECDFCC] px-6 py-3 mb-4 relative rounded-lg shadow-md w-96">
      <h3 v-if="errorMessage" class="text-sm text-red-600 flex items-center gap-2">
        <i class="fas fa-circle-xmark fa-xl text-black"></i>
        {{ errorMessage }}
      </h3>
      <h3 v-if="successMessage" class="text-sm text-green-600 flex items-center gap-2">
        <i class="fas fa-circle-check fa-xl text-black"></i>
        {{ successMessage }}
      </h3>
      <div class="w-full h-1 bg-red-400 mt-2 relative overflow-hidden rounded-sm">
        <div class="absolute top-0 left-0 h-full bg-[#1E201E] animate-progress"></div>
      </div>
    </div>

    <div class="bg-[#ECDFCC] p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">
      <h2 class="text-[#1E201E] text-2xl font-semibold mb-4 text-center">
        Changer le mot de passe
      </h2>

      <div class="space-y-4">
        <input
          v-model="newPassword"
          type="password"
          placeholder="Nouveau mot de passe"
          class="w-full px-4 py-2 border border-[#697565] text-[#1E201E] rounded-lg outline-none focus:ring-2 focus:ring-[#697565] focus:bg-white transition"
        />
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirmer le mot de passe"
          class="w-full px-4 py-2 border border-[#697565] text-[#1E201E] rounded-lg outline-none focus:ring-2 focus:ring-[#697565] focus:bg-white transition"
        />

        <button
          :disabled="!canSubmit"
          @click="changePassword"
          class="w-full px-4 py-2 rounded-lg text-[#ECDFCC] bg-[#1E201E] hover:bg-[#3C3D37] transition disabled:bg-[#697565] disabled:cursor-not-allowed"
        >
          Changer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import api from "@/services/api";
import router from "@/router";

const route = useRoute();
const email = ref(route.query.email || "");

const newPassword = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");


const canSubmit = computed(() => newPassword.value.length >= 3 && newPassword.value === confirmPassword.value);

const changePassword = async () => {
  if (!canSubmit.value) {
    errorMessage.value = "Password doesn't match or check if there is characters ";
    successMessage.value = "";
    return;
  }

  try {
    await api.patch(`/reset-password/${email.value}`, {
      password: newPassword.value,
    });

    successMessage.value = "Your password is updated, Redirecting...";
    errorMessage.value = "";

    setTimeout(() => {
      successMessage.value = "";
      // router.push('/login');
      router.push("/");
    }, 3000);
  } catch (error) {
    errorMessage.value = "Fail to update password : " + (error.response?.data?.message || error.message);
  }
};
</script>

<style scoped>
@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
.animate-progress {
  animation: progress 3s linear forwards;
}
</style>
