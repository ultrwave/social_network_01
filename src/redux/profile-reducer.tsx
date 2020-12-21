import {v1} from 'uuid';
import {
    ActionTypes,
    PostsDataType,
    ProfileAddPostActionType,
    ProfileUpdateNewPostTextActionType
} from './state';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

type PageStateType = {
    postsData: Array<PostsDataType>
    newPostText: string
}

const profileReducer = (state: PageStateType, action: ActionTypes) => {

    switch (action.type) {

        case ADD_POST: // Add post (profile)
            let newPost: PostsDataType = {
                id: v1(),
                message: state.newPostText,
                likesCount: 0
            }
            state.postsData = [newPost, ...state.postsData]
            state.newPostText = ''
            return state

        case UPDATE_NEW_POST_TEXT: // New post input
            state.newPostText = action.text
            return state

        default:
            return state
    }
}

export const addPostActionCreator = ():ProfileAddPostActionType => {
    return {
        type: ADD_POST
    }
}

export const updateNewPostTextActionCreator = (text: string):ProfileUpdateNewPostTextActionType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        text: text
    }

}

export default profileReducer