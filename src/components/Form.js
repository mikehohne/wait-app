import React from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

import config from './../authentication/config'
import * as firebase from 'firebase'

class Form extends React.Component {

    state = {
        newUser: []
    }

    componentDidMount() {
        firebase.initializeApp(config)
    }

    signUpNewUsers = (email,password) => {
        firebase.auth().createUserWithEmailAndPassword(email,password).catch((err, results) =>{
            if(err){
                return (
                    <div>Error Occurred</div>
                )
            }
            this.setState({ newUser: results })
        })
    }

    render() {
        return(
            <div className="container">
                <form>
                    <FormGroup>
                        <h1>Login or Signup</h1>
                        <FormControl placeholder="Enter Your Username"/>
                        <FormControl.Feedback />
                        <br />
                        <FormControl placeholder="Enter Your Password"/>
                        <FormControl.Feedback />
                        <br />
                        <Button
                            bsStyle="success"
                            bsSize="large"
                            type="submit">
                        Login / Signup
                        </Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

export default Form