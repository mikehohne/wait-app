import React from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

import config from './../authentication/config'
import * as firebase from 'firebase'

class Form extends React.Component {

    state = {
        newUser: [],
        email: 'mik@hotmail.com',
        pWord: '1234',
        errors: []
    }

    componentDidMount() {
        firebase.initializeApp(config)        
        
    }

    signUpNewUsers = (email,password) => {
        email = this.state.email
        password = this.state.pWord
        firebase.auth().createUserWithEmailAndPassword(email,password).catch((err) => {
            if(err){
               this.setState({ errors: err })
            }
        })
    }

    render() {
        
        const { email, pWord, errors } = this.state

        console.log(errors);

        return (
            <div className="container">
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
                    <Button onClick={this.signUpNewUsers}>Test</Button>
                </form>
            </div>
        )
    }
}

export default Form