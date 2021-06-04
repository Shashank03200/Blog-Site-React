import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
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

    const [token, setToken] = useState(initialToken);

    const isLoggedIn = !!token;

    const [userId, setUserId] = useState(initialId);
    const [isButtonVisible, setIsButtonVisible] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            setIsButtonVisible(true)
        } else {
            setIsButtonVisible(false)
        }
    }, [isLoggedIn])

    function loginHandler(localId, idToken) {
        setToken(idToken);
        localStorage.setItem('userId', localId)
        setUserId(localId)
        localStorage.setItem('idToken', idToken);

    }

    function logoutHandler() {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userId')
        localStorage.removeItem('idToken')
    }

    function setNewBtnState(btnProp) {
        setIsButtonVisible(btnProp)
    }



    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, token, isButtonVisible, loginHandler, logoutHandler, setNewBtnState }}>
            {props.children}
        </AuthContext.Provider>
    )
}



export default AuthContext;