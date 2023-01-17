import api from "./api";
import TokenService from "./token.service";

const register = (login, password, contactData) => {
    return api
    .post("/auth/register", {
        login,
        contactData,
        password
    })
        .then(
            (response) => {
                console.log(response.data.accessToken)
                if (response.data.accessToken) {
                    TokenService.setUser(response.data);
                }
                return response.data;
            }
        );
};

const login = (login, password) => {
    return api
        .post("/auth/login", {
            login,
            password
        })
        .then(
            (response) => {
            console.log(response.data.accessToken)
            if (response.data.accessToken) {
                TokenService.setUser(response.data);
            }
            return response.data;
        }
        );
};

const logout = () => {
    TokenService.removeUser();
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
