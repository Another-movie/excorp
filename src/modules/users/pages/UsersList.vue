<template>
    <div class="users-list">
        <input
            class="users-list__search"
            type="text"
            placeholder="Search users"
            v-model="searchQuery"
        />
        <div class="users-list__actions">
            <div class="users-list__actions--whatisthis">X items</div>
            <div class="users-list__actions--sort" @click="toSort = !toSort">
                {{ toSort ? 'Reset' : 'Sort by Date' }}
            </div>
        </div>
        <div class="users-list__users">
            <user-card
                class="users-list__card"
                v-for="user in toDisplayUsers"
                :key="user.id"
                :user="user"
                @click.native="handleCardClick(user.id)"
                @delete="deleteUserById"
            ></user-card>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import UserCard from '@/modules/users/components/UserCard'
export default {
    name: 'UserList',
    components: { UserCard },
    data: () => ({
        searchQuery: '',
        toSort: false
    }),
    computed: {
        ...mapState('users', ['users']),
        toDisplayUsers() {
            const filteredUsers = this.users.filter((user) => {
                const { fullname, username } = user
                const [firstName, lastName = ''] = user.fullname.split(' ')

                return (
                    firstName.includes(this.searchQuery) ||
                    lastName.includes(this.searchQuery) ||
                    fullname.includes(this.searchQuery) ||
                    username.includes(this.searchQuery)
                )
            })

            return this.toSort ? this.sortedByDate(filteredUsers) : filteredUsers
        }
    },
    methods: {
        ...mapMutations('users', {
            deleteUserById: 'DELETE_USER_BY_ID'
        }),
        handleCardClick(id) {
            this.$router.push({ name: 'UserProfile', params: { id } })
        },
        sortedByDate(records) {
            return records.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }
    }
}
</script>

<style lang="scss" scoped>
.users-list {
    background: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    margin: 16px auto;
    max-width: 500px;
    padding: 16px;
    @media (max-width: 767px) {
        margin: 0;
        max-width: unset;
        width: calc(100% - 32px);
    }

    &__search {
        background: rgba(0, 0, 0, 0.05);
        border: none;
        border-radius: 5px;
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 24px;
        outline: none;
        padding: 8px;
        text-align: center;
        width: calc(100% - 16px);
    }

    &__users {
        margin-top: 12px;
        max-height: 500px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    &__actions {
        display: flex;
        font-weight: 600;
        font-size: 13px;
        justify-content: space-between;

        &--sort {
            cursor: pointer;
            color: #2f80ed;
        }

        &--whatisthis {
            color: rgba(0, 0, 0, 0.2);
            text-decoration: line-through;
        }
    }

    &__card {
        margin-bottom: 8px;
    }
}
</style>
