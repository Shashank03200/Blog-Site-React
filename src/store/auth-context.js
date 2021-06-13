import { createContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

const AuthContext = createContext({
    currentUser: '',
    isLoggedIn: false,
    userId: null,
    token: null,
    isButtonVisible: false,
    setNewBtnState: () => { },
    loginHandler: (localId, idToken) => { },
    logoutHandler: () => { }
})


export const AuthContextProvider = (props) => {

    // const history = useHistory();
    const initialToken = localStorage.getItem('idToken');
    const initialId = localStorage.getItem('userId');
    const initialUser = JSON.parse(localStorage.getItem('currentUser'));


    const [authData, setAuthData] = useState({
        idToken: initialToken,
        userId: initialId
    });
    const isLoggedIn = !!authData.idToken;
    const [currentUser, setCurrentUser] = useState(initialUser);
    const [isButtonVisible, setIsButtonVisible] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            setIsButtonVisible(true)
        } else {
            setIsButtonVisible(false)
        }
    }, [isLoggedIn])


    function loginHandler(localId, idToken, userObj) {

        localStorage.setItem('userId', localId)
        localStorage.setItem('idToken', idToken);

        localStorage.setItem('currentUser', JSON.stringify(userObj))
        setCurrentUser(userObj);
        setAuthData(prevState => {
            return {
                ...prevState,
                idToken: idToken,
                userId: localId
            }
        });

    }

    useEffect(() => {
        const removeUser = async () => {
            if (!authData.idToken) {

                localStorage.removeItem('userId');
                localStorage.removeItem('idToken');
                localStorage.removeItem('currentUser');

                setCurrentUser(null);

            }
        }
        removeUser();
    }, [authData.idToken])

    function logoutHandler() {

        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            setAuthData(prevState => {
                return {
                    ...prevState,
                    idToken: null,
                    userId: null
                }
            })
        }).catch((error) => {
            // An error happened.
        });



    }

    function setNewBtnState(btnProp) {
        setIsButtonVisible(btnProp)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId: authData.userId, token: authData.idToken, currentUser, isButtonVisible, loginHandler, logoutHandler, setNewBtnState }}>
            {props.children}
        </AuthContext.Provider>
    )
}



export default AuthContext;