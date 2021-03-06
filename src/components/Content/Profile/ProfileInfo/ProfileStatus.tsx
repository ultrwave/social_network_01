import React, {ChangeEvent} from 'react';

type ProfileStatusType = {
    status: string
    updateUserStatus(status: string): void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        const newStatus = this.state.status.trim()
        if (this.state.editMode && (this.props.status !== newStatus)) {
            this.props.updateUserStatus(newStatus)
        }
        this.setState({editMode: true})
    }

    deActivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateUserStatus(this.state.status)
    }

    inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.target.value})
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}
                        >{this.props.status || '-----'}</span>
                    </div>
                    :
                    <div>
                        <input autoFocus={true}
                               onBlur={this.deActivateEditMode}
                               value={this.state.status}
                               onChange={this.inputHandler}
                        />
                    </div>}
            </div>
        )
    }
}
