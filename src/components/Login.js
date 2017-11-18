import React, { Component } from 'react'
import { FormGroup, FormControl, Button, Image, Label } from 'react-bootstrap'


class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }


    render() {
        const inputStyles = {
            color: 'blue',
            marginTop: '1rem',
            textAlign: 'center'
        }

        const { email, password } = this.state
        const { LoginUsers } = this.props

        return (
            <form>
                <FormGroup>
                    <FormControl
                        style={inputStyles}
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        placeholder="Enter Your Email" />
                    <FormControl
                        style={inputStyles}
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        placeholder="Enter Your Password" />
                    <Button onClick={() => LoginUsers(email,password)}>Login</Button>
                </FormGroup>
            </form>
        )
    }
}

export default Login