
const getToken = () => {
    return localStorage.getItem("token");
};

const isAuthorized = () => {
    const token = getToken();
    return token && token !== "expiredToken";
}

const limpiarTodos = (res) => {
    if (res.status === 401 && res.statusText === "Unauthorized") {
        localStorage.clear();
        window.location.href = "/";
    }
    localStorage.clear();
}
export { getToken, isAuthorized, limpiarTodos };