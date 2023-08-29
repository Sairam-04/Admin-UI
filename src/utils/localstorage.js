const setAdmin = (token, role) =>{
    localStorage.setItem("token",token);
    localStorage.setItem("role", role);
}

const getAdmin = () =>{
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return {
        "token": token,
        "role": role
    }
}

const removeAdmin = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
}

export {setAdmin, getAdmin, removeAdmin}