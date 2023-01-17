import api from "./api";

const getPublicContent = () => {
    return api.get("/test/all");
};

const getUserBoard = () => {
    return api.get("/test/user");
};

const getMasterBoard = () => {
    return api.get("/test/mod");
};


const UserService = {
    getPublicContent,
    getUserBoard,
    getMasterBoard,
};

export default UserService;
