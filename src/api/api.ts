import axios from 'axios';
import {UserType} from '../types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '9b61cb41-6326-4a3b-b5b4-20d19c98a067'
    }
})

export const usersAPI = {

    getUsers(currentPage: number = 1, count: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${count}`)
            .then(response => response.data)
    },

    toggleFollow(user: UserType) {
        return !user.followed ?
            (instance.post(`follow/${user.id}`, {}) // todo - как убрать дублирование кода?
                .then(response => response.data.resultCode))
            :
            (instance.delete(`follow/${user.id}`)
                .then(response => response.data.resultCode))
    },

    authMe(authFn: (id: string, email: string, login: string) => void) {
        instance.get('auth/me')
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    authFn(id, email, login)
                }
            })
    }

}