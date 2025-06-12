import { useState } from 'react';
import './VideoUploadModal.scss'
import { FileUploader } from "react-drag-drop-files";
import { createsubSection } from '../../../Api/courseApi';
import { toast } from 'react-toastify';

export const VideoUploadModal = (props)=>{
    const fileTypes = ["mp4", "mkv"];
    const [videos, setVideos] = useState([""])
    const [temp, setTemp] = useState()
    const changeHandler = (file)=>{
        setTemp(file)
    }
    const uploadHandler = ()=>{
        props.setLoading(true)
        
        const payload = {
            videoFile: temp,
            sectionId: props.sectionID,
            title: temp?.name,
            duration: temp?.duration,
            description: temp?.name
        }
        var form_data = new FormData();

        for ( var key in payload ) {
            form_data.append(key, payload[key]);
        }
        form_data.append('access_token', localStorage.getItem('auth_token'))
        createsubSection(form_data).then((res)=>{
            toast.success("video uploaded successfully")
            setVideos((prev)=>[...prev, temp])
        

        }).catch((err)=>{
            toast.error("error while uploading file")
        })
        props.setLoading(false)

    }
    const toggleUploadModal = ()=>{
        props.setShowVideoUploadModal(false)
    } 
    return (
        <div className='video-uploader-wrapper'>
            {
                videos.map((video, index)=>{
                    return (
                        <div className='video-uploader'>
                <div className='video-uploader-input-wrapper'>
                    <FileUploader  handleChange={changeHandler} name="file"  type={fileTypes} maxSize={10240}/>
                    <div className='video-name-display'>
                        {videos[index+1]?.name}
                    </div>
                </div>
            
            <div className='video-uploader-submit-button'>
                    <button  className='video-uploader-submit-button-upload' onClick={uploadHandler}>Upload</button>
            </div>

            </div>
                    )
                })
            }
            <button  className='video-uploader-submit-button-close' onClick={toggleUploadModal}>close</button>
        </div>
    )
}