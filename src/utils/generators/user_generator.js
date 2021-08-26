const fs = require('fs')
const MS_IN_DAY = 86400000
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
const USER_SETTINGS = {
    name: {
        minLength: 1,
        maxLength: 7
    },
    tags: {
        minTagsCount: 2
    }
}
const LAST_NAMES = [
    'people',
    'history',
    'way',
    'art',
    'world',
    'information',
    'map',
    'family',
    'government',
    'health',
    'system',
    'computer',
    'meat',
    'year',
    'thanks',
    'music',
    'person',
    'reading',
    'method',
    'data',
    'food',
    'understanding',
    'theory',
    'law',
    'bird',
    'literature',
    'problem',
    'software',
    'control',
    'knowledge',
    'power',
    'ability',
    'economics',
    'love',
    'internet',
    'television',
    'science',
    'library',
    'nature',
    'fact',
    'product',
    'idea',
    'temperature',
    'investment',
    'area',
    'society',
    'activity',
    'story',
    'industry',
    'media'
]
const FIRST_NAMES = [
    'abandoned',
    'able',
    'absolute',
    'adorable',
    'adventurous',
    'academic',
    'acceptable',
    'acclaimed',
    'accomplished',
    'accurate',
    'aching',
    'acidic',
    'acrobatic',
    'active',
    'actual',
    'adept',
    'admirable',
    'admired',
    'adolescent',
    'adorable',
    'adored',
    'advanced',
    'afraid',
    'affectionate',
    'aged',
    'aggravating',
    'aggressive',
    'agile',
    'agitated',
    'agonizing',
    'agreeable',
    'ajar',
    'alarmed',
    'alarming',
    'alert',
    'alienated',
    'alive',
    'all',
    'altruistic',
    'amazing',
    'family',
    'ambitious',
    'ample',
    'amused',
    'amusing',
    'anchored',
    'ancient',
    'angelic',
    'angry',
    'anguished'
]

const writeToFile = (users) => {
    const str = JSON.stringify({ users })
    fs.writeFile('./public/users.json', str, (err) => {
        if (err) {
            console.error('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '')
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

const genFullName = () =>
    `${capitalize(FIRST_NAMES[getRandomInt(0, FIRST_NAMES.length)])} ${capitalize(
        LAST_NAMES[getRandomInt(0, LAST_NAMES.length)]
    )}`
const genCreatedDate = (id) => new Date(new Date() - id * MS_IN_DAY)
const genUserName = (minLength, maxLength) => {
    const len = getRandomInt(minLength, maxLength)
    const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    return Array.apply(null, Array(len))
        .map(() => {
            return allowedChars.charAt(Math.floor(Math.random() * allowedChars.length))
        })
        .join('')
}
const genTags = (minTagsCount) => {
    const randTagsCount = getRandomInt(minTagsCount, TAGS.length)
    const set = new Set()

    for (let i = 0; i < randTagsCount; i++) {
        set.add(TAGS[getRandomInt(0, TAGS.length)])
    }

    return [...set]
}

// main
const generate = (idx) => {
    const id = idx
    const username = `${genUserName(
        USER_SETTINGS.name.minLength,
        USER_SETTINGS.name.maxLength
    )}_${id}`

    return {
        id,
        username,
        created_at: genCreatedDate(id),
        edited_at: null,
        fullname: genFullName(),
        email: `${username}@gmail.com`,
        tags: genTags(USER_SETTINGS.tags.minTagsCount),
        curator: null
    }
}

const setCurators = (users, usersCount) => {
    const getRandomCurator = () => users[getRandomInt(0, usersCount)].id
    return users.map((user) => {
        const curatorId = getRandomCurator()
        if (user.id !== curatorId) {
            user.curator = curatorId
        }

        return user
    })
}

const init = () => {
    const recordsCount = getRandomInt(100, 150)

    const users = [...Array(recordsCount)].map((_, idx) => generate(idx))

    const usersWithCurators = setCurators(users, recordsCount)
    writeToFile(usersWithCurators)
}

init()
