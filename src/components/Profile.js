import React from 'react'
import { Button, FormGroup, FormControl, Image } from 'react-bootstrap'

class Profile extends React.Component {

    state = {
        name: '',
        image: ''
    }
    
    componentDidMount() {
        this.setState({
            name: this.props.profileName,
            image: this.props.profileImage
        })
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    render(){

        const { user, logout, updateProfile } = this.props
        const { name, image } = this.state
        
        return(
            <div className="container">
                <h1>Welcome {user.email}</h1>
                <Button onClick={logout}>Logout</Button>
                    <FormGroup>
                        <FormControl
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            placeholder="Add a Display Name" >
                        </FormControl>
                        <FormControl
                            type="text"
                            name="image"
                            value={image}
                            onChange={this.handleChange}
                            placeholder="Add an Image" >
                        </FormControl>
                        <Image src={image} rounded />
                        <Button onClick={() => updateProfile(name, image)}>Update Profile</Button>
                    </FormGroup>
            </div>
        )
    }

}

export default Profile