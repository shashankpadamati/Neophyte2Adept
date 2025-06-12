import requestMaker from "../Lib/NetworkHandler"

export const CreateCourse = (data)=>{
    const url = `course/createCourse`
    const payload = data
    const params = {}
    return requestMaker(url, "post", {payload,params}, {
        'Content-Type': 'multipart/form-data'
      })
}

export const fetchCategories = ()=>{
    const url = `course/showAllCategories`
    const payload = {}
    const params = {}
    return requestMaker(url, "get", {payload,params})

}

export const createChapter = (data)=>{
    const url = `course/addSection`
    const payload = {...data}
    const params = {}
    return requestMaker(url, "post", {payload,params})
}
export const createsubSection = (data)=>{
    const url = `course/addSubSection`
    const payload = data
    const params = {}
    return requestMaker(url, "post", {payload,params}, {
        'Content-Type': 'multipart/form-data'
      })
}

export const fetchInstructorCourses = (data) =>{
    const url = `course/getInstructorCourses`
    const payload = data
    const params = {}
    return requestMaker(url, "post", {payload,params})
}

export const fetchEnrolledCourses = (data)=>{
    const url = `course/getEnrolledCourses`
    const payload = data
    const params = {}
    return requestMaker(url, "post", {payload,params})

}


export const fetchAllCourses = (data)=>{
    const url = `course/getAllCourses`
    const payload = {}
    const params = {...data}
    return requestMaker(url, "get", {payload,params})

}

export const fetchHomeCategories = (data)=>{
    const url = `course/homePage/courses`;
    const payload = {};
    const params = {...data}
    return requestMaker(url, "get", {payload,params})
}
export const fetchHomePageCategories = (data)=>{
    const url = `course/homePage/categories`;
    const payload = {};
    const params = {...data}
    return requestMaker(url, "get", {payload,params})
}

export const fetchCourseDetails = (data)=>{
    const url = `course/getCourseDetails`;
    const payload = {...data};
    const params = {};
    return requestMaker(url, "post", {payload,params})
}

export const enrollCourse = (data)=>{
    const url = `course/enrollCourse`;
    const payload = {...data};
    const params = {};
    return requestMaker(url, "post", {payload,params})
}

export const fetchCourseContent = (data)=>{
    const url = `course/course_content`;
    const payload = {...data};
    const params = {};
    return requestMaker(url, "post", {payload,params});
}
