import {connect, useDispatch} from 'react-redux';
import {
    getUsersThunkCreator,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFetching,
    toggleFollow, toggleRequestIsInProgress
} from '../../redux/users-reducer';
import {AppDispatchType, StateType, UserType} from '../../types/types';
import React from 'react';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {usersAPI} from '../../api/api';


type UsersAPIPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followRequestsInProgress: string[]
    setUsers (users: Array<UserType>): void // todo - такой синтаксис типизации это тоже самое, что через стрелку?
    setCurrentPage (currentPage: number): void
    setTotalUsersCount (totalUsersCount: number): void
    toggleFetching (isFetching: boolean): void
    toggleFollow (userId: string): void
    toggleRequestIsInProgress (userId: string, toggle: boolean): void
    getUsers (currentPage: number, pageSize: number): any // todo - fix any
}

class UsersAPI extends React.Component<UsersAPIPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (page: number) => {
        this.props.toggleFetching(true)

        usersAPI.getUsers(page, this.props.pageSize)
            .then(data => {

                this.props.toggleFetching(false)
                this.props.setUsers(data.items)
            })

        this.props.setCurrentPage(page)
    }

    toggleFollow = (user: UserType) => {
        usersAPI.toggleFollow(user, this.props.toggleFollow, this.props.toggleRequestIsInProgress)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> :
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    onPageChange={this.onPageChange}
                    toggleFollow={this.toggleFollow}
                    followRequestsInProgress={this.props.followRequestsInProgress}
                />}
        </>
    }
}

const mapStateToProps = (state: StateType) => {
    return {
        users: state.pageUsers.users,
        pageSize: state.pageUsers.pageSize,
        totalUsersCount: state.pageUsers.totalUsersCount,
        currentPage: state.pageUsers.currentPage,
        isFetching: state.pageUsers.isFetching,
        followRequestsInProgress: state.pageUsers.followRequestsInProgress
    }
}

export const UsersContainer = connect(mapStateToProps, {
    toggleFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleFetching,
    toggleRequestIsInProgress,
    getUsers: getUsersThunkCreator
})(UsersAPI)