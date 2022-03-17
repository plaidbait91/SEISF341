import React from 'react' ;
import {GoogleLogin} from 'react-google-login' ;
// refresh token
import {refreshTokenSetup} from './utils/refreshToken' ;

const clientId = '980895739592-obqt1v1p1vng0co9bfdnkr0r3pff4kp3.apps.googleusercontent.com' ;

function Login({childToParent,handleLoginStatus}) {
    // const [name, setName] = useState();
    // const [email, setEmail] = useState();
    // const [pplink, setPPLink] = useState();
    const onSuccess = (res) => {
        childToParent(res.profileObj.name, res.profileObj.email, res.profileObj.imageUrl);
        handleLoginStatus(true);
        //initializing the setup
        refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
        handleLoginStatus(false);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop: '100px'}}
                isSignedIn={true}
            />
            {/* <h1>Name: {name}</h1>
            <h2>Email ID: {email}</h2>
            <img src={pplink} alt="Profile Photo" /> */}
        </div>
    );
}

export default Login ;