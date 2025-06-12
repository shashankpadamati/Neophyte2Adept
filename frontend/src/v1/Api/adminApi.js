import requestMaker from "../Lib/NetworkHandler";

export const fetchDashboardContent = ()=>{
    const url =  `admin/dashboard`;
    const params = {};
    const payload = {};

    return requestMaker(url, "post", {params, payload})
}

export const fetchDashboardStudentsContent = ()=>{
    const url =  `admin/students`;
    const params = {};
    const payload = {};

    return requestMaker(url, "get", {params, payload})
}

export const fetchDashboardTutorsContent = ()=>{
    const url =  `admin/tutors`;
    const params = {};
    const payload = {};

    return requestMaker(url, "get", {params, payload})
}