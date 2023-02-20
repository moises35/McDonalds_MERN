const getToken = () => {
    return localStorage.getItem("token");
};

const isAuthorized = () => {
    const token = getToken();
    return token && token !== "expiredToken";
}


export { getToken, isAuthorized };