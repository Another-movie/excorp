<template>
    <div class="user-card">
        <div class="user-card__avatar" :style="{ color: getRandomHex() }">{{ logo }}</div>
        <div class="user-card__info">
            <div class="user-card__info--name">{{ user.fullname }}</div>
            <div class="user-card__info--date">{{ createdDayString }}</div>
        </div>
        <img @click.stop="$emit('delete', user.id)" src="@/assets/icon_trash.svg" alt="" />
    </div>
</template>

<script>
import { getRandomHex } from '@/utils/generators/color_generator'
import { getMostRangeDifference } from '@/utils/helpers'

export default {
    name: 'UserCard',
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    computed: {
        logo() {
            const [firstName, lastName] = this.user.fullname.split(' ')
            return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
        },
        createdDayString() {
            const diff = new Date().getTime() - new Date(this.user.created_at).getTime()
            const fields = getMostRangeDifference(diff)

            return fields ? `Created ${fields[0]} ${fields[1]} ago` : 'Created today'
        }
    },
    methods: {
        getRandomHex
    }
}
</script>

<style lang="scss" scoped>
.user-card {
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 13px;

    img {
        cursor: pointer;
    }

    &__info {
        text-align: left;
        width: 80%;

        &--name {
            font-weight: 600;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.8);
            margin-bottom: 6px;
        }

        &--date {
            font-weight: 500;
            font-size: 13px;
            color: rgba(0, 0, 0, 0.4);
        }
    }

    &__avatar {
        align-items: center;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        display: flex;
        font-weight: bold;
        justify-content: center;
        height: 44px;
        width: 44px;
    }
}
</style>
