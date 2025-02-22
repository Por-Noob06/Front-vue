<template>
  <div class="flex">
    <Nav />
    <div class="flex-1 h-screen bg-[#ECDFCC] p-6 ml-64 rounded-xl">
      <h1 class="font-bold text-2xl mb-4">Profile</h1>
      <div class="bg-[#3C3D37] flex flex-col items-center px-8 py-6 rounded-xl shadow-md w-4/12 mx-auto">
        <!-- Image -->
        <div class="flex flex-col items-center mb-4">
          <input type="file" id="imageUpload" class="hidden" @change="handleImageUpload" />
          <label for="imageUpload" class="cursor-pointer">
            <img :src="profileImage" class="w-32 h-32 rounded-full border-2 border-[#ECDFCC] object-cover" />
          </label>
          <button class="text-sm text-[#ECDFCC] font-serif mt-2 hover:border-b-2 rounded-sm" @click="triggerFileInput">
            Change image
          </button>
        </div>

        <!-- Edit & Cancel Buttons -->
        <div class="flex justify-center w-full px-4">
          <font-awesome-icon v-if="!isEditing" icon="pen" class="icon-edit text-[#ECDFCC] cursor-pointer" @click="toggleEdit" />
          <font-awesome-icon v-if="isEditing" icon="times" class="icon-cancel text-[#ECDFCC] cursor-pointer ml-4" @click="cancelEdit" />
        </div>

        <!-- Input Fields -->
        <div class="w-full space-y-4 mt-4">
          <input v-model="user.fname" type="text" placeholder="First name" class="w-full p-2 border rounded-md" :disabled="!isEditing" @input="checkChanges" />
          <input v-model="user.lname" type="text" placeholder="Last name" class="w-full p-2 border rounded-md" :disabled="!isEditing" @input="checkChanges" />
          <input v-model="user.email" type="email" placeholder="Email" class="w-full p-2 border rounded-md" :disabled="!isEditing" @input="checkChanges" />
        </div>

        <!-- Save Button -->
        <button v-if="isEditing" class="bg-[#1E201E] text-white px-4 py-2 rounded-md w-32 mt-4" :disabled="!hasChanges" @click="updateProfile">
          Save
        </button>
      </div>
    </div>
</div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import Nav from '@/Nav.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPen, faTimes);

const user = ref({ fname: '', lname: '', email: '' });
const originalUser = ref({});
const isEditing = ref(false);
const hasChanges = ref(false);
const profileImage = ref('https://via.placeholder.com/96');
const originalProfileImage = ref('https://via.placeholder.com/96');

const triggerFileInput = () => {
  document.getElementById('imageUpload').click();
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target.result;
      checkChanges();
    };
    reader.readAsDataURL(file);
  }
};

const fetchUserData = async () => {
  try {
    const email = localStorage.getItem("userMail");
    const response = await api.get(`/user?email=${email}`, { withCredentials: true });
    user.value = response.data;
    originalUser.value = { ...response.data };

    if (response.data.profileImage) {
      profileImage.value = response.data.profileImage;
      originalProfileImage.value = response.data.profileImage;
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données utilisateur:', error);
  }
};

const toggleEdit = () => {
  isEditing.value = true;
};

const cancelEdit = () => {
  user.value = { ...originalUser.value };
  profileImage.value = originalProfileImage.value;
  isEditing.value = false;
  hasChanges.value = false;
};

const checkChanges = () => {
  hasChanges.value = JSON.stringify(user.value) !== JSON.stringify(originalUser.value) || profileImage.value !== originalProfileImage.value;
};

const updateProfile = async () => {
  try {

      await api.post(`/update/${user.value.id}`, {
      fname: user.value.fname,
      lname: user.value.lname,
      email: user.value.email,
    }, { withCredentials: true });

    console.log('Your Profil was changed with Successful');
    originalUser.value = { ...user.value };
    originalProfileImage.value = profileImage.value;
    isEditing.value = false;
    hasChanges.value = false;

  } catch (error) {
    console.error('Error : ', error);
  }
};


onMounted(fetchUserData);
</script>


<style scoped>
.cursor-pointer {
  cursor: pointer;
}

input:disabled {
  background-color: #ECDFCC;
  color: black;
  border: 1px solid #ccc;
  cursor: not-allowed;
}
button:disabled{
  background-color: #697565;
}
.icon-edit, .icon-cancel {
  color: #ECDFCC;
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.icon-edit:hover, .icon-cancel:hover {
  color: #ECDFCC;
  transform: scale(1.1);
}
.icon-cancel:hover{
  transform: scale(1.5);
}

.icon-edit:active, .icon-cancel:active {
  opacity: 0.7;
}

/*
  base color
  1E201E
  3C3D37
  697565
  ECDFCC
 */
</style>
