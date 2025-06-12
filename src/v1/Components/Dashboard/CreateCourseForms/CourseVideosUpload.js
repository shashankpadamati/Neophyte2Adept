import './CourseVideosUpload.scss'
import plusButton from '../../../../Assets/svgs/plus-symbol-button-svgrepo-com.svg'
import { useState } from 'react'
import { FaFolderPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { createChapter } from '../../../Api/courseApi';
import { toast } from 'react-toastify';
import Modal from '../../Modal';
import { VideoUploadModal } from './VideoUploadModal';

export const CourseVideosUpload = (props)=>{
    const [sections, setSections] = useState([{name:'', }])
    const [name, setName] = useState("")
    const [showVideoUploadModal, setShowVideoUploadModal] = useState(false)
    const [sectionID, setSectionId] = useState()
    
    const changeHandler = (e, index)=>{
        sections[index]["name"] = e.target.value
    }
    const addSection = ()=>{
        setSections((prev)=>([...prev, {name:""}]))
    }
    const createHandler =  (sectionName)=>{
        props.setLoading(true)
        setShowVideoUploadModal(true)
        const payload = {
            "sectionName": sectionName,
            "courseId": props?.course?._id,
            "access_token": localStorage.getItem('auth_token')
        } 
        createChapter(payload).then((res)=>{
            toast.success("created chapter successfully")
            
            setSections(sections.map(section => {
                if (section.name === res.data.section.name) {
                    return { ...section, id: res.data.section._id };
                }
                return section;
            }))
            setSectionId(res.data.section._id)
            console.log(res.data.section._id,"Created section id");
            setShowVideoUploadModal(true)
            setSections((prev)=>([...prev, {name:""}]))
        })
        .catch((err)=>{
            toast.error("error while creating chapter")
        })
        props.setLoading(false)

    }
    return (
        <div>
            <Modal show={showVideoUploadModal}>
                <VideoUploadModal setShowVideoUploadModal={setShowVideoUploadModal} setLoading={props.setLoading} sectionID={sectionID}/>
            </Modal>
            <div className="chapter-create-wrapper">
                {
                sections.map((section, index)=>(
                    <div className='chapter-create-input-wrapper' key={index}>
                        <div className='chapter-create-input'>
                            <input type='text' name='sectionName' className="chapter-create-section-name" onChange={(e)=>changeHandler(e,index)} placeholder='Enter Chapter Name'/>
                            <button className='chapter-create-create-button' onClick={()=>createHandler(section.name)}>{`Create`}</button>
                        </div>
                        <button className='add-button' onClick={()=>addSection(section.name)}> <FaFolderPlus className='add-button-img' /></button>
                        <button className='add-button'> <MdDelete className='add-button-img' /></button>

                    </div>
                ))
                
                }
            </div>
            

        </div>
    )
}