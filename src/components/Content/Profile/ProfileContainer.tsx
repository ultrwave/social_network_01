import React from 'react';
import Style from './Profile.module.css';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {StateType, UserProfileType} from '../../../types/types';
import {getProfileThunk, getStatusThunk, updateStatusThunk} from '../../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../../hoc/withAuthRedirect';
import {compose} from 'redux';

export type MDTPType = {
    getProfileThunk: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
}

export type MSTPType = {
    profile: UserProfileType | null
    status: string
}

export type MSTPIsAuthType = {
    isAuth: boolean
}

type MatchType = {
    userId: string
}

export type ProfileContainerPropsType = RouteComponentProps<MatchType> & MDTPType & MSTPType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2';
        }
        this.props.getProfileThunk(userId)
        this.props.getUserStatus(userId)
    }

    showMeButton = true

    render() {
        return (
            <div className={Style.content}>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateUserStatus={this.props.updateUserStatus}
                />
                {this.showMeButton && < span style={{
                    'fontWeight': 'bold',
                    'cursor' : 'pointer',
                    'margin' : '0 10px',
                    'backgroundColor' : 'red',
                    'color': 'wheat',
                    'position' : 'absolute',
                    'top' : '200px',
                    'border' : '1px solid wheat',
                    'padding' : '1px 2px'
                }}
                    onClick={() => {
                        this.props.getProfileThunk('13836')
                        this.props.getUserStatus('13836')
                        this.showMeButton = false
                    }}>Me</span>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: StateType): MSTPType => ({
    profile: state.pageProfile.profile,
    status: state.pageProfile.status
})

export default compose(
    connect(
        mapStateToProps,
        {
            getProfileThunk,
            getUserStatus: getStatusThunk,
            updateUserStatus: updateStatusThunk
        }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer) as React.ComponentType