import React, {ChangeEvent, createRef, useRef} from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostsDataType} from '../../../../redux/state';

type MyPostsDataType = {
    data: Array<PostsDataType>
    addPost: (msg: string) => void
    newPostInput: (t: string) => void
    newPostText: string
}

export function MyPosts(props: MyPostsDataType) {

    const newPostRef = createRef<HTMLTextAreaElement>()

    const addPost = () => {
        let text = newPostRef.current?.value
        if (text && text.trim()) {
            props.addPost(text)
            if (newPostRef.current && newPostRef.current.value) {
                newPostRef.current.focus()
            }
        }
    }

    const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.newPostInput(e.currentTarget.value)
    }

    const posts = props.data.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    return (
        <div>
            <span className={Style.postButton}>My Posts</span>
            <div className={Style.addPostSection}>
                <textarea ref={newPostRef}
                          className={Style.text}
                          value={props.newPostText}
                          onChange={inputHandler}
                />
                <button className={Style.postButton} onClick={addPost}>Send new post</button>
            </div>
            <div className={Style.posts}>
                {posts}
            </div>
        </div>
    )
}