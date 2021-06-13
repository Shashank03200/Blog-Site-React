import React, { useContext } from 'react';
import AuthContext from '../store/auth-context';

const ProfileImageIcon = (props) => {
    const authCtx = useContext(AuthContext);
    return (

        <img src={authCtx.currentUser.photoURL} style={
            {
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                marginRight: '5px'

            }
        }
            alt="userpicture"
        />

    )
}
export default ProfileImageIcon;