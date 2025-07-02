<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { getUsers, getPositions, postUser, User, Position } from '../services/ApiService';

    const users       = ref<User[]>([]);
    const currentPage = ref(0);
    const totalPages  = ref(0);
    const positions   = ref<Position[]>([]);
    const name        = ref('');
    const email       = ref('');
    const phone       = ref('');
    const position    = ref('');
    const file = ref<File | null>(null);
    const validImage  = ref(true);
    const successPost = ref(false);
    const selectedFileName = ref('');
    const showUsers = ref(true);


    onMounted(async () => {
        try {
            const userData     = await getUsers();
            const positionData = await getPositions();
            users.value       = userData.users;
            currentPage.value = userData.page;
            totalPages.value  = userData.total_pages;
            positions.value   = positionData;
        } 
        catch (e) { 
            console.error(e); 
        }
    });

    const isNameValid = computed(() => (name.value.length >= 2 && name.value.length <= 60) || name.value.length==0);

    const isEmailValid = computed(() => {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return email.value.length>0 ? emailRegex.test(email.value) : true;
    });

    const isPhoneValid = computed(() => {
        if (phone.value.length === 0) return true;
        const phoneRegex = /^\+?38\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/;
        return phoneRegex.test(phone.value);
    });

    const isFormValid = computed(() => 
        isNameValid.value && name.value.length>0 &&
        isEmailValid.value && email.value.length>0 &&
        isPhoneValid.value && phone.value.length>0 &&
        position.value !== '' &&
        validImage.value &&
        selectedFileName.value !== ''
    );

    async function submitForm() {
        if (!isFormValid.value) return;

        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('email', email.value);
        formData.append('phone', phone.value);
        formData.append('position_id', position.value);
        if (file.value) formData.append('photo', file.value);

        try {
            const response = await postUser(formData);
            currentPage.value = 0;
            successPost.value = true;
            loadMore();
            console.log('Response:', response);
        } 
        catch (error) {
            console.error('Error creating user:', error);
        }
        }

    async function loadMore() {
        try {
            showUsers.value = false;
            await new Promise(resolve => setTimeout(resolve, 300));
            const userData = await getUsers(currentPage.value + 1);
            users.value = userData.users;
            currentPage.value = userData.page;
            showUsers.value = true;
        } 
        catch (error) {
            console.error(error);
        }
    }

    function handleFileUpload(event: Event) {
        const image = (event.target as HTMLInputElement).files?.[0] ?? null;
        file.value = image;
        selectedFileName.value = image?.name ?? '';

        if (!selectedFileName.value.endsWith('.jpg') && !selectedFileName.value.endsWith('.jpeg')) {
            validImage.value = false;
            return;
        }

        if (!image || image.size > 5 * 1024 * 1024){
            validImage.value = false;
            return;  
        } 

        const img = new Image();
        const url = URL.createObjectURL(image);
        img.onload = () => {
            validImage.value = img.width === 70 && img.height === 70;
            URL.revokeObjectURL(url);
        };
        img.onerror = () => {
            validImage.value = false;
            URL.revokeObjectURL(url);
        };
        img.src = url;
    }
</script>

<template>
    <div class="main-container">
        <nav class="navbar">
            <div class="navbar-inner">
                <div class="logo-img">
                    <img src="../assets/Logo.svg" alt="Logo" />
                </div>

                <div class="button-container">
                    <a href="#getSection"><button>Users</button></a>
                    <a href="#postSection"><button>Sign up</button></a>
                </div>
            </div>
        </nav>
        <div class="backgroundimage-container">
            <div class="backgroundimage-content">
                <h1>Test assignment for front-end developer</h1>
                <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a
                    vast understanding of User design thinking as they'll be building web interfaces with accessibility
                    in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                </p>
                <a href="#postSection"><button>Sign up</button></a>
            </div>
        </div>
        <div class="GET-container" id="getSection">
            <h1 class="title">Working with GET request</h1>
            <div
                key="users"
                class="card-container"
                :class="{ 'fade-hidden': !showUsers }"
            >
                <div class="card" v-for="user in users" :key="user.id">
                    <div class="user-img">
                        <img :src="user.photo" alt="User Image" />
                    </div>
                    <div><p v-overflow-tooltip>{{ user.name }}</p></div>
                    <div>
                        <p>{{ user.position }}</p>
                        <p v-overflow-tooltip>{{ user.email }}</p>
                        <p>{{ user.phone }}</p>
                    </div>
                </div>
            </div>
            <button 
                @click="loadMore()" :disabled="currentPage >= totalPages" 
                style="width: 120px;"
            >
            Show more
            </button>
        </div>
        <transition name="fade" mode=out-in>
            <div class="POST-container" id="postSection" v-if="!successPost">
                <h1 class="title">Working with POST request</h1>
                <form class="post-form" @submit.prevent="submitForm">
                    <div class="input-container">
                        <input class="form-input"
                            type="text"
                            v-model="name" 
                            :class="{ 'input-error': !isNameValid}"
                            placeholder="Your name" 
                            required />
                        <span 
                            v-if="!isNameValid"
                            class="error-explain"
                        >
                            User name, should be 2-60 characters
                        </span>
                    </div>
                    <div class="input-container">
                        <input class="form-input" 
                            type="email" 
                            v-model="email"
                            :class="{ 'input-error': !isEmailValid }"
                            placeholder="Email" 
                            required />
                        <span 
                            v-if="!isEmailValid" 
                            class="error-explain"
                        >
                            User email, must be a valid email according to RFC2822
                        </span>
                    </div>
                    <div class="input-container">
                        <input class="form-input" 
                            type="tel" 
                            v-model="phone"
                            :class="{ 'input-error': !isPhoneValid }"
                            placeholder="Phone"
                            required />
                        <span class="tel-format">+38 (XXX) XXX - XX - XX</span>
                    </div>
    
                    <div class="radio-container">
                        <p>Select your position</p>
                       <div v-for="selectPosition in positions" :key="selectPosition.id" class="radio-wrapper">
                            <label class="radio-label">
                                <input
                                class="radio-input"
                                type="radio"
                                :value="selectPosition.id"
                                v-model="position"
                                />
                                <span class="custom-radio"></span>
                                {{ selectPosition.name }}
                            </label>
                        </div>
                    </div>
    
                    <div class="file-upload">
                        <label for="imageUpload" class="upload-label">
                            <div class="custom-file-button" :class="{ 'input-error': !validImage }">Upload</div>
                            <div class="file-name" :class="{ 'input-error-filename': !validImage }">
                                <p>{{ selectedFileName ? selectedFileName : "Upload your photo" }}</p>
                            </div>
                        </label>
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/jpg, image/jpeg"
                            @change="handleFileUpload"
                        />
                        <span 
                            v-if="!validImage" 
                            class="error-explain"
                        >
                            User photo should be jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB.
                        </span>
                    </div>
    
                </form>
                <button @click="successPost=true">Sign up</button>
            </div>
            <div class="POST-success" v-else>
                <h1 class="title">User successfully registered</h1>
                <div class="success-img">
                        <img src="../assets/success-image.svg" alt="Success POST" />
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped src="./MainComponent.scss"></style>