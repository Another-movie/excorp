<template>
    <div class="user-profile">
        <div class="user-profile__main">
            <div class="user-profile__main--avatar">{{ firstChars }}</div>
            <div class="user-profile__main--fullname">{{ user.fullname }}</div>
            <div class="user-profile__main--username">@{{ user.username }}</div>
        </div>
        <div class="user-profile__fields">
            <label class="user-profile__field" @dblclick="disableCreatedAt = false">
                Created at
                <input type="date" v-model="createdAt" :disabled="disableCreatedAt" />
            </label>
            <label class="user-profile__field" @dblclick="disableUsername = false">
                Username
                <input type="text" v-model="user.username" :disabled="disableUsername" />
            </label>
            <label class="user-profile__field" @dblclick="disableEmail = false">
                Email
                <input type="text" v-model="user.email" :disabled="disableEmail" />
            </label>
            <label class="user-profile__field" @dblclick="disableTags = false">
                Tags
                <div class="user-profile__field--tags">
                    <div
                        v-for="tag in tags"
                        :key="tag.id"
                        @click="toggleTag(tag)"
                        class="user-profile__field--tag"
                        :class="{
                            'user-profile__field--tag--selected':
                                isSelectedTag(tag.id) && !disableTags,
                            'user-profile__field--tag--disabled': disableTags
                        }"
                    >
                        {{ tag.name }}
                    </div>
                </div>
            </label>
            <label class="user-profile__field" @dblclick="disableCurator = false">
                Curator
                <select v-model="user.curator" :disabled="disableCurator">
                    <option disabled value="">Выберите один из вариантов</option>
                    <template v-for="u in users">
                        <option :key="u.id" v-if="u.id !== user.id" :value="u.id">
                            {{ u.username }}
                        </option>
                    </template>
                </select>
            </label>
        </div>
        <div class="user-profile__buttons">
            <button class="save" @click="saveChanges" :disabled="!hasChanges">
                <img src="@/assets/icon_download.svg" alt="" />Save changes
            </button>
            <button @click="discardChanges" :disabled="!hasChanges">
                <img src="@/assets/icon_back.svg" alt="" />Discard
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { isEqualObjs } from '@/utils/helpers'
const TAGS = [
    { id: 0, name: '#cod' },
    { id: 1, name: '#r' },
    { id: 2, name: '#pcgamer' },
    { id: 3, name: '#fortniteclips' },
    { id: 4, name: '#gamerlife' },
    { id: 5, name: '#nintendoswitch' },
    { id: 6, name: '#pubg' },
    { id: 7, name: '#dota2' },
    { id: 8, name: '#retrogaming' }
]

export default {
    name: 'UserProfile',
    data: () => ({
        baseUser: {},
        user: {},
        tags: TAGS,
        disableCreatedAt: true,
        disableUsername: true,
        disableEmail: true,
        disableTags: true,
        disableCurator: true
    }),
    async created() {
        const { id } = this.$route.params
        this.user = JSON.parse(JSON.stringify(this.getUserById(id)))
        this.baseUser = JSON.parse(JSON.stringify(this.getUserById(id)))
    },
    computed: {
        ...mapGetters('users', { getUserById: 'getUser', users: 'getUsers' }),
        firstChars() {
            const name = this.user.fullname.split(' ')

            return name.length > 1
                ? `${name[0].charAt(0)}${name[1].charAt(0)}`.toUpperCase()
                : name[0].charAt(0).toUpperCase()
        },
        createdAt: {
            get() {
                const date = this.user.created_at ? new Date(this.user.created_at) : new Date()
                const month = ('0' + (date?.getMonth() + 1)).slice(-2)
                const day = ('0' + date?.getDate()).slice(-2)
                const year = date?.getFullYear()

                return `${year}-${month}-${day}`
            },
            set(value) {
                this.user.created_at = new Date(value)
            }
        },
        hasChanges() {
            return !isEqualObjs(this.user, this.baseUser)
        }
    },
    methods: {
        ...mapMutations('users', {
            mUpdateUser: 'UPDATE_USER_BY_ID'
        }),
        saveChanges() {
            this.mUpdateUser(this.user)
            this.$router.push({ name: 'UsersList' })
        },
        discardChanges() {
            const { id } = this.$route.params
            this.user = JSON.parse(JSON.stringify(this.getUserById(id)))
            this.disableCreatedAt = true
            this.disableUsername = true
            this.disableEmail = true
            this.disableTags = true
            this.disableCurator = true
        },
        isSelectedTag(id) {
            return !!this.user.tags?.find((tag) => tag.id === id)
        },
        toggleTag(tag) {
            if (!this.disableTags) {
                const idx = this.user.tags.findIndex((t) => t.id === tag.id)

                return idx > -1 ? this.user.tags.splice(idx, 1) : this.user.tags.push(tag)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.user-profile {
    background: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    margin: 16px auto;
    max-width: 500px;
    padding: 16px;

    &__main {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 34px;

        &--avatar {
            align-items: center;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            display: flex;
            font-weight: bold;
            height: 100px;
            justify-content: center;
            margin-bottom: 24px;
            width: 100px;
        }

        &--fullname {
            font-weight: 600;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.8);
            margin-bottom: 8px;
        }

        &--username {
            font-weight: 500;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.4);
        }
    }

    &__fields {
        display: flex;
        flex-direction: column;
        margin: 32px auto;
        width: 100%;
    }

    &__field {
        display: flex;
        flex-direction: column;
        font-weight: 600;
        font-size: 13px;
        text-align: left;
        margin-bottom: 16px;
        width: 100%;

        select {
            padding: 10px;
            margin-top: 8px;
        }

        &--tags {
            margin-top: 8px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.05);
            border-radius: 5px;
            position: relative;
            word-break: break-all;
        }

        &--tag {
            background: rgba(0, 0, 0, 0.05);
            cursor: pointer;
            display: inline-block;
            font-weight: 400;
            font-size: 14px;
            margin: 0 4px 4px 0;
            padding: 4px;

            &--selected {
                color: #fff;
                background: rgb(51, 105, 237);
            }

            &--disabled {
                color: gray;
                background: #2c3e50;
            }
        }
        input {
            background: rgba(0, 0, 0, 0.05);
            border: none;
            border-radius: 5px;
            box-sizing: border-box;
            font-weight: 500;
            font-size: 14px;
            padding: 10px;
            margin-top: 8px;
            outline: none;
            width: 100%;

            &:disabled {
                color: rgba(0, 0, 0, 0.08);
            }
        }
    }

    &__buttons {
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: 100%;

        button {
            align-items: center;
            border: none;
            border-radius: 5px;
            box-sizing: border-box;
            cursor: pointer;
            display: flex;
            justify-content: center;
            padding: 8px;
            width: 48%;

            &:disabled {
                background: #dbdbdb;
                cursor: not-allowed;
            }

            img {
                margin-right: 10px;
            }
        }

        .save {
            color: #fff;
            background: rgba(0, 0, 0, 0.8);
        }
    }
}
</style>
