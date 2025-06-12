import { useEffect, useState } from "react"
import DragAndDrop from "../../DragAndDrop"
import './CourseInformation.scss'
import { CreateCourse, fetchCategories } from "../../../Api/courseApi"
import { toast } from "react-toastify"

const CourseInformation = (props)=>{
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [whatYouWillLearn, setWhatYourWillLearn] = useState("")
    const [price, setPrice] = useState()
    const [thumbnail, setThumbnail] = useState()
    const [formData, setFormData] = useState({})
    const data = new FormData()
    const changeHandler = (e)=>{
        console.log(e.target,"target");
        setFormData((prev)=>({...prev, [e.target.name]: e.target.value}))
        data.append(e.target.name, e.target.value)
    }
    const fileHandler = (file, fieldName) => {
        console.log(file, "file");
        setFormData((prev) => ({ ...prev, [fieldName]: file }));
        data.append(fieldName, file)
    };
    const submitHandler = async (e)=>{
        e.preventDefault()
        props.setLoading(true)
        // props.setLoading(true)
        try {
            if(!formData["courseName"] || !formData["courseDescription"] || !formData["whatYouWillLearn"] || !formData["price"] || !formData["thumbnail"]){
                return toast.error("Enter Details Correctly")
            }
            
            var form_data = new FormData();

            for ( var key in formData ) {
                form_data.append(key, formData[key]);
            }
            form_data.append('access_token', localStorage.getItem('auth_token'))
            
            const res = await CreateCourse(form_data)
            toast.success("created course successfully")
            props.setCourse(res.data.data)
          
            props.setPage((prev)=>prev+1) 
            
        } catch (error) {
            toast.error("error while creating course");
        }
        props.setLoading(false)


        // props.setLoading(false)
        
    }
    console.log(formData,"form data");
    const [categories, setCategories] = useState([])
    
    useEffect(()=>{
        props.setLoading(true)
        fetchCategories().then((res)=>{
            setCategories(res.data.data)
        }).catch((err)=>{
            toast.error("error while fetching categories")
        })
        props.setLoading(false)
    },[])
    console.log(categories,"categories");

    return (
        <div>
            <div className="course-information-wrapper">
                <form encType="multipart/form-data" className="course-information-form" onSubmit={submitHandler}>
                    
                    <div className="course-information-div">
                    <label htmlFor="course-information-title" className="course-information-label">Course Title</label>
                    <input type="text" name="courseName" placeholder="Enter Course Title Here" 
                    onChange={changeHandler}
                    id="course-information-title" className="course-information-text-input"/>
                    </div>
                    
                   <div className="course-information-div">
                   <label htmlFor="course-information-description" className="course-information-label">Course Description</label>
                    <textarea placeholder="Enter Course Description Here" name="courseDescription" id="course-information-description" 
                    onChange={changeHandler}
                    className="course-information-textarea-input"/>
                   </div>

                    <div className="course-information-div">
                    <label htmlFor="course-information-learning-objectives" className="course-information-label">Learning Objectives </label>
                    <textarea placeholder="Learning Objectives " name="whatYouWillLearn" id="course-information-learning-objectives" 
                    onChange={changeHandler}
                    className="course-information-textarea-input"/>
                    </div>

                    <div className="course-information-div">
                    <label htmlFor="course-information-title" className="course-information-label">Enter Price of Course (in ₹) </label>
                    <input type="number" name="price"  id="course-information-title" className="course-information-text-input"
                    onChange={changeHandler}
                    />
                    </div>
                    <div className="course-information-div">
                        <select className="course-information-dropdown" name="category" onChange={changeHandler}>
                        <option >
                                    select a category
                                </option>
                            {
                                
                            categories?.map((category)=>(
                                <option className="course-information-option" value={category._id}>
                                    {category.name}
                                </option>
                            ))
                            }
                        </select>

                    </div>

                  
                    <div className="course-information-div">
                    <DragAndDrop 
                    label="Course Thumbnail"
                    value={formData?.thumbnail}
                    name="thumbnail"
                    onChange={(file) => fileHandler(file, "thumbnail")}
                    />
                    </div>
                    <div className="course-information-next-button-wrapper">
                        <button className="course-information-next-button">Next <span class="arrow-icon">&#9654;</span></button>
                    </div>

                </form>

            </div>
        </div>
    )

}

export default CourseInformation;