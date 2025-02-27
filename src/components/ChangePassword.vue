<template>
  <div class="bg-[#3C3D37] p-6 rounded-xl shadow-md w-1/2 mx-auto mt-28">
    <h2 class="text-[#ECDFCC] text-xl font-bold mb-4 text-center">Change Password</h2>

    <div class="space-y-4">
      <input
        v-model="oldPassword"
        type="password"
        placeholder="Old Password"
        class="input-field"
      />
      <input
        v-model="newPassword"
        type="password"
        placeholder="New Password"
        class="input-field"
      />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        class="input-field"
      />

      <button
        class="btn-submit"
        :disabled="!canSubmit"
        @click="changePassword"
      >
        Change
      </button>

      <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">
        {{ errorMessage }}
      </p>
      <p v-if="successMessage" class="text-green-500 text-sm text-center mt-2">
        {{ successMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import api from '@/services/api';
import { defineProps } from 'vue';

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const props = defineProps({
  currentPassword: String
});

const canSubmit = computed(() => {
  return oldPassword.value && newPassword.value && confirmPassword.value;
});

const changePassword = async() => {
  errorMessage.value = '';
  successMessage.value = '';

  const [oldPasswordFromProps, userId] = props.currentPassword.split("/");

  if (oldPassword.value !== oldPasswordFromProps) {
    errorMessage.value = 'Vérifiez votre ancien mot de passe.';
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Les nouveaux mots de passe ne correspondent pas.';
    return;
  }
    try{
      const response = await api.patch(`update-password/${userId}`, {
        oldPassword: oldPassword.value,
        password: newPassword.value,
    });
    successMessage.value = "Mot de passe mis à jour avec succès !";
    }catch(error){
      errorMessage.value = error.message;
    }

  // Simuler une requête au serveur
  setTimeout(() => {
    successMessage.value = 'Votre mot de passe a été changé avec succès !';
    oldPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
  }, 1000);
};

</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #697565;
  background-color: #ECDFCC;
  color: #1E201E;
  border-radius: 6px;
  outline: none;
}

.input-field:focus {
  border-color: #697565;
  background-color: #fff;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: #1E201E;
  color: #ECDFCC;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-submit:disabled {
  background-color: #697565;
  cursor: not-allowed;
}

.btn-submit:hover:disabled{
  background-color: #697565;
}
</style>
