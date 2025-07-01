<script lang="ts">
import { defineComponent } from 'vue';
import { fetchUsers, fetchPositions, User, Position } from '../services/ApiService';

export default defineComponent({
    data() {
        return {
            users: [] as User[],
            currentPage: 0,
            totalPages: 0,
            positions: [] as Position[],
            name: '',
            email: '',
            phone: '',
            position: '',
            nameTouched: false,
            emailTouched: false,
            phoneTouched: false
        };
    },
    async mounted() {
        try {
            let userData = await fetchUsers();
            let positionData = await fetchPositions();
            this.users = userData.users;
            this.currentPage = userData.page;
            this.totalPages = userData.total_pages;
            this.positions = positionData;
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async loadMore() {
            try {
                const userData = await fetchUsers(this.currentPage + 1);
                this.users = userData.users;
                this.currentPage = userData.page;
            } catch (error) {
                console.error(error);
            }
        },
        isNameValid() {
            return this.name.length >= 2 && this.name.length <= 60;
        },
        isEmailValid() {
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            return emailRegex.test(this.email);
        },
        isPhoneValid() {
            return this.phone.startsWith('+380');
        }
    }
});
</script>

<template>
    <div class="main-container">
        <nav class="navbar">
            <div class="navbar-inner">
                <div class="logo-img">
                    <img src="../assets/Logo.svg" alt="Logo" />
                </div>

                <div class="button-container">
                    <button>Users</button>
                    <button>Sign up</button>
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
                <button>Sign up</button>
            </div>
        </div>
        <div class="GET-container">
            <h1 class="title">Working with GET request</h1>
            <div class="card-container">
                <div class="card" v-for="user in users" :key="user.id">
                    <div class="user-img">
                        <img :src="user.photo" alt="User Image" />
                    </div>
                    <div><p>{{ user.name }}</p></div>
                    <div>
                        <p>{{ user.position }}</p>
                        <p>{{ user.email }}</p>
                        <p>{{ user.phone }}</p>
                    </div>
                </div>
            </div>
            <button 
                @click="loadMore" :disabled="currentPage >= totalPages" 
                style="width: 120px;"
            >
            Show more
            </button>
        </div>
        <div class="POST-container">
            <h1 class="title">Working with POST request</h1>
            <form class="post-form">
                <input class="form-input"
                    type="text"
                    v-model="name" 
                    :class="{ 'input-error': !isNameValid() && nameTouched }"
                    placeholder="Your name" 
                    @blur="this.nameTouched = true;"
                    required />
                <input class="form-input" 
                    type="email" 
                    v-model="email"
                    :class="{ 'input-error': !isEmailValid() && emailTouched }"
                    placeholder="Email" 
                    @blur="this.emailTouched = true;"
                    required />
                <div class="tel-container">
                    <input class="form-input" 
                        type="tel" 
                        v-model="phone"
                        :class="{ 'input-error': !isPhoneValid() && phoneTouched }"
                        placeholder="Phone"
                        @blur="this.phoneTouched = true;" 
                        required />
                    <span class="tel-format">+38 (XXX) XXX - XX - XX</span>
                </div>

                <div class="radio-container">
                    <div v-for="selectPosition in positions" :key="selectPosition.id">
                        <input
                            type="radio"
                            :value="selectPosition.name"
                            v-model="position"
                        />
                        <label :for="selectPosition.id">{{ selectPosition.name }}</label>
                    </div>
                </div>

                <input class="form-input" type="file" accept="image/*" />

                <button type="submit">Sign up</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped src="./MainComponent.scss"></style>