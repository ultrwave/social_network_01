import {v1} from 'uuid';
import profileReducer, {addPostAC, updateNewPostTextAC} from './profile-reducer';
import dialogsReducer, {addMessageAC, updateNewMessageTextAC} from './dialogs-reducer';


//======== TYPES ======================================================

type StoreType = {
    _state: StateType
    _callSubscriber: (s: StateType) => void
    getState: () => StateType
    subscribe: (callback: any) => void // ?
    dispatch: (action: ActionTypes) => void
}

export type StateType = {
    pageProfile: {
        postsData: Array<PostsDataType>
        newPostText: string
    }
    pageDialogs: {
        dialogsData: DialogsDataType
        dialogItems: Array<DialogItemType>
        newMessageText: string
    }
}

export type DialogsDataType = {
    [id: string]: Array<MessageDataType>
}

export type DialogItemType = {
    id: string
    name: string
}

export type MessageDataType = {
    id: string
    isMine: boolean
    message: string
}

export type PostsDataType = {
    id: string
    message: string
    likesCount: number
}

export type PageProfileActionType =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof updateNewPostTextAC>

export type PageDialogsActionType =
    ReturnType<typeof addMessageAC> |
    ReturnType<typeof updateNewMessageTextAC>

export type ActionTypes = // ?
    PageProfileActionType |
    PageDialogsActionType

//======== DATA ======================================================

const dialogItemId1 = v1()
const dialogItemId2 = v1()
const dialogItemId3 = v1()
const dialogItemId4 = v1()

const dialogItems: Array<DialogItemType> = [
    {id: dialogItemId1, name: 'Friend 1'},
    {id: dialogItemId2, name: 'Friend 2'},
    {id: dialogItemId3, name: 'Friend 3'},
    {id: dialogItemId4, name: 'Friend 4'},
]

const dialogMessagesData1: Array<MessageDataType> = [
    {id: v1(), isMine: true, message: 'Hi!'},
    {id: v1(), isMine: false, message: 'Hello!'},
    {id: v1(), isMine: true, message: 'Whats up?'},
    {id: v1(), isMine: true, message: 'Good day!'},
    {id: v1(), isMine: false, message: 'Yo!'}
]

const dialogMessagesData2: Array<MessageDataType> = [
    {id: v1(), isMine: false, message: 'Apple'},
    {id: v1(), isMine: true, message: 'Peanut'},
    {id: v1(), isMine: false, message: 'Banana'},
    {id: v1(), isMine: true, message: 'Peach'},
]

const dialogMessagesData3: Array<MessageDataType> = [
    {id: v1(), isMine: false, message: 'Tomato'},
    {id: v1(), isMine: false, message: 'Cucumber'},
    {id: v1(), isMine: true, message: 'Carrot'},
]

const dialogMessagesData4: Array<MessageDataType> = [
    {id: v1(), isMine: false, message: 'Winter'},
    {id: v1(), isMine: false, message: 'Spring'},
]

const dialogsData: DialogsDataType = {
    [dialogItemId1]: dialogMessagesData1,
    [dialogItemId2]: dialogMessagesData2,
    [dialogItemId3]: dialogMessagesData3,
    [dialogItemId4]: dialogMessagesData4
}

const postsData: Array<PostsDataType> = [
    {id: v1(), message: 'It\'s my first post!', likesCount: 12},
    {id: v1(), message: 'Hello!', likesCount: 432},
    {id: v1(), message: 'Good day!', likesCount: 2}
]

//========= STORE =====================================================

const store: StoreType = {
    _state: {
        pageProfile: {
            postsData: [...postsData],
            newPostText: '',
        },
        pageDialogs: {
            dialogsData: dialogsData,
            dialogItems: [...dialogItems],
            newMessageText: 'Shift+click to send as friend',
        }
    },
    _callSubscriber(s: StateType) {
    },
    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer
    },

    dispatch(action: ActionTypes) {

        this._state.pageProfile = profileReducer(this._state.pageProfile, action)
        this._state.pageDialogs = dialogsReducer(this._state.pageDialogs, action)

        this._callSubscriber(this._state)

    }
}

export default store



