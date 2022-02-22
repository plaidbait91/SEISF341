import React from 'react' ;
import {GoogleLogout} from 'react-google-login' ;

const clientId = '980895739592-obqt1v1p1vng0co9bfdnkr0r3pff4kp3.apps.googleusercontent.com' ;

function Logout({childToParent}) {
    const onSuccess = () => {
        childToParent("", "", "");
        alert('Logout made successfully');
    };

    return (
        <div>
        <GoogleLogout 
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}>
            </GoogleLogout>
        </div>
    );
}
export default Logout ;