import React from 'react';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {News} from './components/Content/News/News';
import {Music} from './components/Content/Music/Music';
import {Settings} from './components/Content/Settings/Settings';
import {UsersContainer} from './components/Users/UsersContainer';
import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
import ProfileContainer from './components/Content/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './login/Login';
import {connect, Provider} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import {compose} from 'redux';
import {StateType} from './types/types';
import {Preloader} from './components/common/Preloader/Preloader';
import store from './redux/redux-store';

type AppPropsType = {
    initialized: boolean
    initializeApp(): void
}

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                </div>
            </div>

        );
    }
}

const MSTP = (state: StateType) => ({
    initialized: state.app.initialized
})


let AppContainer = compose(
    withRouter,
    connect(MSTP, {initializeApp}))(App) as React.ComponentType
;

export let AppMain = (props: any) => {
    return <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
}