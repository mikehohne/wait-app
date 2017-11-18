import React from 'react'
import { FormGroup, FormControl, Button, Image, Label } from 'react-bootstrap'
import Profile from './Profile'

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
          }).then(function(results) {
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

        
        
        const landingPageContainer = {
            display: 'flex',
            justifyContent: 'center'
        }

        const titleStyle = {
            fontFamily: 'Spectral SC, serif'
        }
        const inputStyles = {
            color: 'blue',
            marginTop: '1rem',
            textAlign: 'center'
        }

        if(user){
            return (
            <div className="container">
                <Profile
                    user={user}
                    profileName={displayName}
                    profileImage={imageUrl}
                    logout={() => this.logoutUser()}
                    updateProfile={(displayName,imageUrl) => this.userProfileUpdate(displayName, imageUrl)}
                />
            </div>
            )
        }

        return (
            <div className="container" style={landingPageContainer}>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <h1 style={titleStyle}>Welcome To Waiting</h1>
                        <FormControl
                            style={inputStyles}
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            placeholder="Enter Your Email"
                        />
                        <FormControl
                            style={inputStyles}
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
                            type="submit" >
                        Login / Signup
                        </Button>
                    </FormGroup>
                    <Button onClick={() => this.resetUserPassword(email)}>Forgot Password</Button>
                </form>
            </div>
        )
    }
}

export default Form