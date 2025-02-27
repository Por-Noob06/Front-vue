<template>
  <div class="flex-1 h-full bg-[#ECDFCC] p-6 rounded-xl mt-16">
    <div class="bg-[#3C3D37] flex flex-col items-center px-8 py-6 rounded-xl shadow-md w-1/2 mx-auto">
      <h1 class="text-white font-bold text-2xl mb-8">Disable or Delete Account</h1>
      <div class="text-center text-start text-[#ECDFCC] mb-4 flex ">
        <p>Archiving an account means that the user will no longer be able to log in. Only administrators can reactivate an archived account.
        </p>
        <button class="bg-[#1E201E] text-white px-4 py-2 rounded-md w-32 mt-4" @click="archiveAccount">
          Archive
        </button>
      </div>
      <p class="text-white font-Arial">Deleting an account permanently erases the data.</p>
      <button class="bg-red-600 text-white px-4 py-2 rounded-md w-3/4 mt-4" @click="deleteAccount">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/services/api';

const user = ref({ id: 1 }); // Exemple d'utilisateur avec un ID

const archiveAccount = async () => {
  try {
    await api.post(`/user/${user.value.id}/archive`);
    alert("Le compte a été archivé avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'archivage du compte", error);
  }
};

const deleteAccount = async () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce compte ? Cette action est irréversible.")) {
    try {
      await api.delete(`/user/${user.value.id}`);
      alert("Le compte a été supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression du compte", error);
    }
  }
};
</script>

<style scoped>
button:hover {
  opacity: 0.8;
}
</style>
