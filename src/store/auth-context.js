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

    const [authData, setAuthData] = useState({
        idToken: initialToken,
        userId: initialId
    });
    const isLoggedIn = !!authData.idToken;

    const [isButtonVisible, setIsButtonVisible] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            setIsButtonVisible(true)
        } else {
            setIsButtonVisible(false)
        }
    }, [isLoggedIn])


    function loginHandler(localId, idToken) {

        localStorage.setItem('idToken', idToken);
        localStorage.setItem('userId', localId);

        setAuthData({
            idToken: idToken,
            userId: localStorage
        })
    }

    function logoutHandler() {
        setAuthData(prevState => {
            return {
                idToken: null,
                userId: null
            }
        })
        localStorage.removeItem('userId')
        localStorage.removeItem('idToken')
    }

    function setNewBtnState(btnProp) {
        setIsButtonVisible(btnProp)
    }



    return (
        <AuthContext.Provider value={{ isLoggedIn, userId: authData.userId, token: authData.idToken, isButtonVisible, loginHandler, logoutHandler, setNewBtnState }}>
            {props.children}
        </AuthContext.Provider>
    )
}



export default AuthContext;