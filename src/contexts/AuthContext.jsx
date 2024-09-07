import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
}

function reducer(state, action){
    switch(action.type){
        case "login": return{
            ...state,
            user: action.payLoad,
            isAuthenticated: true
        }

        case "logout": return{
            ...state,
            user: null,
            isAuthenticated: false
        }

        default:{
            throw new Error("Action Unknown");
        }
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

function AuthProvider({children}){
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

    function login(email, password){
        if(email === FAKE_USER.email && password === FAKE_USER.password){
            dispatch({type: "login", payLoad: FAKE_USER});
            return true;
        }
        return false;
    }

    function logout(){
        dispatch({type: "logout"});
    }

    return <AuthContext.Provider value={{
        user,
        isAuthenticated,
        login,
        logout
    }}>
        {children}
    </AuthContext.Provider>
}

function useAuth(){
    const context = useContext(AuthContext);

    if(context === undefined){
        throw new Error("AuthContext is used outside the AuthProvider");
    }

    return context;
}

export {AuthProvider, useAuth};