import React, {Component, useEffect} from 'react'
import {useStore} from "../config/store";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Link} from "../App";



export const GuestOnly = () => {
    return (
        <h1>This is for guests only</h1>
    )
}



export const PrivatePage = () => {
    // const nav = useNavigate()
    // if(!is_auth) nav.push('/public')
    const is_auth = useStore(state => state.is_auth)

    return (
        <>
            <h1>This page is private</h1>
            <PostList age={123} />
        </>
    )
}
export const EmailPage = () => {
    // const nav = useNavigate()
    // if(!is_auth) nav.push('/public')

    return (
            <h1>Your Inbox</h1>
    )
}

export const PublicPage = () => {
    const [postdata, setPostdata] = useState([])
    const [username, setUsername] = useState('')

    useEffect(() => {
        // Load initial data once the component loads
    }, [])

    return (
            <h1>This page is public</h1>
    )
}


class PostList extends Component {
    state = {
        postdata: [],
        username: '',
        age: 123,
        is_auth: useStore.getState().is_auth
    }

    // constructor(props) {
    //     super(props);
    // }

    // Lifecycle method
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')     // Promise
            .then(res => {
                console.log(res)
                this.setState({postdata: res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    buttonclicker = () => {
        console.log('I am here!')
    }

    render() {
        const {username} = this.state
        const {age} = this.props

        return (
            <>
                <h1>Hello, I'm {username}</h1>
                <h2>I am {age} years old</h2>
                <p>{this.state.is_auth.toString()}</p>
                <button onClick={this.buttonclicker}>Click me</button>
                {this.state.postdata.map(item => {
                    return (
                        <div key={item.id} >
                            <Link to={'#'}>{item.title}</Link>
                        </div>
                    )
                })}
            </>
        )
    }
}
