<template>
  <section class="h-full w-full flex flex-col justify-center items-center">
    <!-- Messages d'erreur et de succès -->
    <div v-if="errorMessage || successMessage" class="bg-[#ECDFCC] px-16 py-3 relative bottom-2 rounded-lg">
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

    <div id="reset-form" class="w-full max-w-sm mx-auto p-6 bg-[#F3C5C5] shadow-lg rounded-lg">
      <form @submit.prevent="verifyCode" class="space-y-4">
        <legend>
          <h2 class="text-2xl font-semibold text-center text-gray-700">Reset Your Password</h2>
        </legend>

        <!-- Input email avec bouton envoyer intégré -->
        <div class="relative flex items-center">
          <input type="email" v-model="email" placeholder="Email"
            class="w-full p-3 border border-gray-300 text-[#1E201E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C3D37] pr-[120px]" />
          <button type="button" @click="sendCode" :disabled="isButtonDisabled"
            class="absolute right-1 top-1 bottom-1 bg-[#1E201E] text-white px-3 rounded-md transition text-sm"
            :class="{'bg-gray-500 cursor-not-allowed': isButtonDisabled, 'hover:bg-[#697565]': !isButtonDisabled}">
            {{ isButtonDisabled ? `${countdown}s` : "Envoyer" }}
          </button>
        </div>

        <!-- Input Code -->
        <input type="text" v-model="verificationCode" placeholder="Write the code"
          class="w-full p-3 border border-gray-300 text-[#1E201E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C3D37]" />

        <!-- Bouton Confirmer -->
        <button type="submit"
          class="bg-[#1E201E] w-full text-white px-4 py-2 rounded-lg hover:bg-[#3C3D37] transition">
          Confirmer
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

const email = ref("");
const verificationCode = ref("");
const serverCode = ref(null);
const errorMessage = ref("");
const successMessage = ref("");
const router = useRouter();
const isButtonDisabled = ref(false);
const countdown = ref(0);
let timer = null;

const sendCode = async () => {
  try {
    const response = await api.post("/sendCode", { email: email.value });
    serverCode.value = response.data.code;
    successMessage.value = "Code envoyé à votre email.";

    // Désactiver le bouton et lancer le compte à rebours
    isButtonDisabled.value = true;
    countdown.value = 60;
    timer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--;
      } else {
        isButtonDisabled.value = false;
        clearInterval(timer);
      }
    }, 1000);

  } catch (error) {
    errorMessage.value = "Error when sending code "+ error ;
  }

  // Effacer les messages après 3 secondes
  setTimeout(() => {
    errorMessage.value = "";
    successMessage.value = "";
  }, 3000);
};

const verifyCode = () => {
  if (verificationCode.value === serverCode.value) {
    successMessage.value = "Code Verify. Please wait...";
    setTimeout(() => router.push({
      path :"/change-password",
      query: {email: email.value},
    }), 2000);
  } else {
    errorMessage.value = "Please verify your code, Resend if Possible...";
  }
};
</script>


<style>
@keyframes progress {
  0% { width: 100%; }
  100% { width: 0%; }
}

.animate-progress {
  animation: progress 3s linear forwards;
}
</style>
