<script lang="ts">
import { defineComponent } from 'vue';
import { fetchUsers, User } from '../services/ApiService';

export default defineComponent({
    data() {
        return {
            users: [] as User[],
            currentPage: 0,
            totalPages: 0,
        };
    },
    async mounted() {
        try {
            let data = await fetchUsers();
            this.users = data.users;
            this.currentPage = data.page;
            this.totalPages = data.total_pages;
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async loadMore() {
            try {
                const data = await fetchUsers(this.currentPage + 1);
                this.users = data.users;
                this.currentPage = data.page;
            } catch (error) {
                console.error(error);
            }
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
            <h1 class="GET-title">Working with GET request</h1>
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
    </div>
</template>

<style scoped lang="scss">
.main-container {
    background-color: #f8f8f8;
}

.navbar {
    background-color: white;
    display: flex;
    justify-content: center;
}

.navbar-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 100%;
    max-width: 1286px;
}

.logo-img {
    width: 104px;
    padding-left: 60px;
}

.button-container {
    display: flex;
    gap: 10px;
    padding-right: 60px;
}

button {
    background-color: #F4E041;
    width: 100px;
    height: 34px;
    border-radius: 80px;
    border: 0;
}

.backgroundimage-container {
    width: 100%;
    height: calc(100vh - 60px);
    max-height: 650px;
    max-width: 1170px;
    background-image: url('../assets/pexels-alexandr-podvalny-1227513.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.backgroundimage-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000080;
    z-index: 1;
}

.backgroundimage-content {
    position: relative;
    z-index: 2;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 380px;
    top: 50%;
    transform: translateY(-50%);
    align-items: center;
}

.GET-container {
    margin: 140px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
}

.GET-title {
    color: #000000DE;
}

.card-container {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 29px;
    max-width: 1168px;
    padding: 0px 60px;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background-color: #fff;
    border-radius: 16px;
    height: 254px;
    max-width: 370px;
    padding: 20px;
}

.card div{
    width: 100%;
}

.card p{
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.user-img img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
}
</style>
