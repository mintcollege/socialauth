import './App.css';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth'
import {firebaseConfig} from "./config/firebase";
import {useState} from "react";
import {Routes, Route, Navigate, Link as Lk, Outlet} from "react-router-dom";
import {EmailPage, PrivatePage, PublicPage} from "./components/Pages";
import {SiteRoutes} from "./config/routes";
import {useStore} from "./config/store";






export const RestrictedRoutes = ({to, check, ...props}) => {
    return !!check && <Outlet /> || <Navigate to={to} {...props} />
};

function App() {
    // const [is_auth, setIsAuth] = useState(false)        // Better to save this in zustand not here
    // const login = useStore(state => state.login)
    // const is_auth = useStore(state => state.is_auth)
    const [login, is_auth, logout, user] = useStore(state => [
            state.login, state.is_auth, state.logout, state.user
    ])
    // const [user, setUser] = useState(null)              // Better to save this in zustand not here

    const firebase = initializeApp(firebaseConfig, 'myapp');
    const googleProvider = new GoogleAuthProvider()
    // const fbProvider = new FacebookAuthProvider()
    const auth = getAuth(firebase)

    const handleSignIn = async () => {
        await signInWithPopup(auth, googleProvider)
            .then(res => {
                console.log(res)
                // Send data to the db via axios
                if(res.user) {
                    login(res.user)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="App">
            <h1>Google Authentication Demo</h1>
            {is_auth ? (
                <>
                    <button onClick={handleLogout}>Log out now</button>
                    <p>Welcome {user.displayName}!</p>
                </>
            ) : (
                <button onClick={handleSignIn}>Log in with Google</button>
            )}

            {is_auth ? (
                <>
                    <h2>You can see me if you're signed in.</h2>
                    <img src={user.photoURL} />
                </>
            ) : (
                <h2>You are not signed in.</h2>
            )}
            <ul>
                <li><Lk to={'/public'}>Public</Lk></li>
                <li><Lk to={'/private'}>Private</Lk></li>
                <li><Lk to={'/email'}>Email</Lk></li>
                <li>
                    <Link to={'/guestonly'} className={'mylink'} title={'MYLINK'} data-abc={123} data-userid={523454}>
                        <p>Guestonly</p>
                        <div>Hello</div>
                    </Link>
                </li>
            </ul>

            <SiteRoutes is_auth={is_auth} />

        </div>
    );
}


export const Link = props => {
    const is_auth = useStore(state => state.is_auth)
    const clickWatcher = () => {
        if(!is_auth) {
            console.log('I got clicked!')
        }
        // a`   xios.get('url')
        //     .then(res => {})
        //     .catch(err => {})

        if(true) console.log('do something')
        else {
            console.log('do another thing')
        }
    }


    return <Lk to={props.to} onClick={clickWatcher} {...props}>
        {props.children}
    </Lk>
}

export default App;
