import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {AppMain} from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store'
import {Provider} from 'react-redux';
import {StateType} from './types/types';
import {BrowserRouter} from 'react-router-dom';

// export const globalRender = (state: StateType) => {
//     ReactDOM.render(
//         // <React.StrictMode>
//         <BrowserRouter>
//             <Provider store={store}>
//                 <App/>
//             </Provider>
//         </BrowserRouter>
//         // </React.StrictMode>
//         ,
//         document.getElementById('root')
//     );
// }
// globalRender(store.getState())

export const globalRender = (state: StateType) => {
    ReactDOM.render(
        <AppMain/>
        ,
        document.getElementById('root')
    );
}


store.subscribe(() => {
    let state = store.getState()
    globalRender(state)
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



