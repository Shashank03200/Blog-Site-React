import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    email: '',
    isLoggedIn: false,
    userId: null,
    token: null,
    isButtonVisible: false,
    setNewBtnState: () => { },
    loginHandler: (localId, idToken) => { },
    logoutHandler: () => { }
})


export const AuthContextProvider = (props) => {

    const initialToken = localStorage.getItem('idToken');
    const initialId = localStorage.getItem('userId');
    const initialEmail = localStorage.getItem('email');

    const [authData, setAuthData] = useState({
        idToken: initialToken,
        userId: initialId
    });
    const isLoggedIn = !!authData.idToken;
    const [email, setEmail] = useState(initialEmail);
    const [isButtonVisible, setIsButtonVisible] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            setIsButtonVisible(true)
        } else {
            setIsButtonVisible(false)
        }
    }, [isLoggedIn])


    function loginHandler(localId, idToken, email) {

        localStorage.setItem('idToken', idToken);
        localStorage.setItem('email', email)
        setAuthData(prevState => {
            return {
                ...prevState,
                idToken: idToken,
                userId: localId
            }
        });
        setEmail(email);
    }

    function logoutHandler() {
        setAuthData(prevState => {
            return {
                ...prevState,
                idToken: null,
                userId: null
            }
        })
        setEmail(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('idToken');
        localStorage.removeItem('email');
    }

    function setNewBtnState(btnProp) {
        setIsButtonVisible(btnProp)
    }



    return (
        <AuthContext.Provider value={{ isLoggedIn, userId: authData.userId, token: authData.idToken, email, isButtonVisible, loginHandler, logoutHandler, setNewBtnState }}>
            {props.children}
        </AuthContext.Provider>
    )
}



export default AuthContext;