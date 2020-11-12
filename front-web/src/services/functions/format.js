import { BASE_URL_API } from './../constants/constants'

export const formatData = (dateTime) => {
    const date = dateTime.split('T')[0]
    const splitted = date.split('-')
    return `${splitted[2]}/${splitted[1]}/${splitted[0]}`
}

export const formatUrlImage = (path) => `${BASE_URL_API}/Images/${path}`

export const formatedTodayInDate = () => {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 1}`
}