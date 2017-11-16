import React from 'react'
import { FormGroup, FormControl, Button, Image } from 'react-bootstrap'

import config from './../authentication/config'
import * as firebase from 'firebase'

const FB = firebase.initializeApp(config);
const User = firebase.auth().currentUser;
const DB = FB.database();

class Form extends React.Component {

    state = {
        newUser: [],
        email: '',
        password: '',
        errors: [],
        user: '',
        displayName: '',
        imageUrl: ''
    }


    componentDidMount() {
        FB.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                this.setState({ 
                    user: user,
                    newEmail: user.email,
                    displayName: user.displayName == null ? '' : user.displayName,
                    imageUrl: user.photoURL == null ? 'http://www.precisionplasticball.com/wp-content/themes/ppb-default/img/materials-module-figure.jpg' : user.photoURL
                 })
            }
        })
    }

    signUpNewUsers = (email,password) => {
        FB.auth().createUserWithEmailAndPassword(email,password)
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
        let count = 0;
        FB.auth().signInWithEmailAndPassword(email, password).catch((err) => {
            if(err) {
                this.setState({ 
                    password: '',
                    errors: err
                 })
            }
        })
    }

    logoutUser = () => {
        FB.auth().signOut().then(() =>{
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

    resetUserPassword = (email) => {
        FB.auth().sendPasswordResetEmail(email)
        .then((results) => {
            console.log('Sent?')
            // Email sent.
        })
        .catch(function(error) {
            console.log('Not Sent!')
        })
    }

    writeUserData = (userId, email, username) =>  {
        DB.ref('users/' + userId).set({
          email,
          username
        }).then(() => {
            console.log('success');
            this.setState({ 
                newEmail: email,
                username: username
            })
        }).catch((err) => {
            console.error(err)
        })
    }

    
    userProfileUpdate = (displayName, photoURL) => {
        firebase.auth().currentUser.updateProfile({
            displayName,
            photoURL
          }).then(function() {
            // Update successful.
            this.setState({
                displayName: displayName,
                imageUrl: photoURL
            })
          }).catch(function(error) {
            // An error happened.
          });
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
        
        const { email, password, errors, user, newEmail, username, displayName, imageUrl } = this.state

        if(user){
            return (
            <div className="container">
                <h1>Hello {user.email}</h1>
                <Button onClick={this.logoutUser}>Logout</Button>
                    <FormGroup>
                        <FormControl
                            type="text"
                            name="displayName"
                            value={displayName}
                            onChange={this.handleChange}
                            placeholder="Add a Display Name" >
                        </FormControl>
                        <FormControl
                            type="text"
                            name="imageUrl"
                            value={imageUrl}
                            onChange={this.handleChange}
                            placeholder="Add an Image" >
                        </FormControl>
                        <Image src={imageUrl} rounded />
                        <Button onClick={() => this.userProfileUpdate( displayName, imageUrl)}>Update Profile</Button>
                    </FormGroup>
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
                    <Button onClick={() => this.resetUserPassword(email)}>Forgot Password</Button>
                </form>
            </div>
        )
    }
}

export default Form