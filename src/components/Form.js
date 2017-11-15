import React from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

import config from './../authentication/config'
import * as firebase from 'firebase'

class Form extends React.Component {

    state = {
        newUser: [],
        email: '',
        password: '',
        errors: [],
        user: ''
    }

    componentDidMount() {
        firebase.initializeApp(config)        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                this.setState({ user: user })
            } 
        })
    }

    signUpNewUsers = (email,password) => {
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((results) => {
            console.log(results)
        })
        .catch((err) => {
            console.log(err)
            if(err){
               this.setState({ 
                   password: '',
                   errors: err 
                })
            }
        })        
    }

    loginUsers = (email,password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
            if(err) {
                this.setState({ errors: err })
            }
        })
    }

    logoutUser = () => {
        firebase.auth().signOut().then(() =>{
            this.setState({ 
                user: '',
                email: '',
                password: ''
            })
        })
        .catch((err) => {
            if(err) {
                console.log('Cannot Logout')
            }
        })
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { email, password } = this.state
        this.signUpNewUsers(email,password)
    }

    render() {

        const errorStyle = {
            color: 'red'
        };
        
        const { email, password, errors, user } = this.state

        if(user){
            return (
            <div>
                <h1>Hello {user.email}</h1>
                <Button onClick={this.logoutUser}>Logout</Button>
            </div>
            )
        }



        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <h1>Login or Signup</h1>
                        <FormControl
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            placeholder="Enter Your Email"
                        />
                        <FormControl
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            placeholder="Enter Your Password"
                        />
                        { errors && (
                            <h5 style={errorStyle}>{errors.message}</h5>
                        )}
                        <Button
                            bsStyle="success"
                            bsSize="large"
                            type="submit">
                        Login / Signup
                        </Button>
                    </FormGroup>
                    <Button onClick={() => this.loginUsers(email,password)}>Login</Button>
                </form>
            </div>
        )
    }
}

export default Form