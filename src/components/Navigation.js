import React from 'react'
import { Button } from 'react-bootstrap'
import {
    Modal, 
    NavBar, 
    ButtonDropdown, 
    Tabs, 
    Tab
} from 'simple-react-bootstrap'
import { Link, Route } from 'react-router-dom'
import firebase from 'firebase'


import Login from './Login'



class Navigation extends React.Component {

    state = {
        user: '',
        loggedIn: false
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                this.setState({ 
                    user: user,
                    loggedIn: true
                 })
            }
        })
    }

    loginUsers = (email,password) => {
        let count = 0;
        firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
            if(err) {
                this.setState({ 
                    password: '',
                    errors: err
                 })
            }
        })
    }


    render() {

        const { user, loggedIn } = this.state
        return (
            <NavBar>
                <NavBar.Header>
                    <NavBar.Brand>
                        <a style={{ cursor: 'pointer' }}>Waiting</a>
                    </NavBar.Brand>
                    <NavBar.Toggle />
                </NavBar.Header>
                <NavBar.Nav style={{ float: 'right'}}>
                <Link to="/login">Login</Link>
                <Route path="/login" exact render={() => (
                    <Login
                        LoginUsers={(email,password) => {
                            this.loginUsers(email,password);
                        }} />
                )} />
                </NavBar.Nav>   
            </NavBar>
        )
    }
}

export default Navigation