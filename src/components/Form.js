import React from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

import config from './../authentication/config'
import * as firebase from 'firebase'

class Form extends React.Component {

    state = {
        newUser: [],
        email: 'mikehohne21@hotmail.com',
        pWord: 'giants26',
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
        email = this.state.email
        password = this.state.pWord
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((results) => {
            console.log(results)
        })
        .catch((err) => {
            if(err){
               this.setState({ errors: err })
            }
        })        
    }

    loginUsers = (email,password) => {
        email = this.state.email,
        password = this.state.pWord
        firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
            if(err) {
                this.setState({ errors: err })
            }
        })
    }

    g

    logoutUser = () => {
        firebase.auth().signOut().then(() =>{
            this.setState({ user: '' })
        })
        .catch((err) => {
            if(err) {
                console.log('Cannot Logout')
            }
        })
    }

    render() {
        
        const { email, pWord, errors, user } = this.state


        return (
            <div className="container">
            {  user && (
               <div>
                   <Button onClick={this.logoutUser}>Logout</Button>
               </div>
            )}
                <form>
                    <FormGroup>
                        <h1>Login or Signup</h1>
                        { errors.code && (
                            <h5>{errors.message}</h5>
                        )}
                        <FormControl placeholder="Enter Your Username"/>
                        <FormControl.Feedback />
                        <br />
                        <FormControl placeholder="Enter Your Password"/>
                        <FormControl.Feedback />
                        <br />
                        <Button
                            bsStyle="success"
                            bsSize="large"
                            type="submit"
                        >
                        Login / Signup
                        </Button>
                    </FormGroup>
                    <Button onClick={this.signUpNewUsers}>Signup</Button>
                    <Button onClick={this.loginUsers}>Login</Button>
                </form>
            </div>
        )
    }
}

export default Form