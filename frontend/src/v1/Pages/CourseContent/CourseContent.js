import { useEffect, useState } from 'react'
import './CourseContent.scss'
import { fetchCourseContent } from '../../Api/courseApi'
import { useParams } from 'react-router'
import { getToken } from '../../Utils/generalUtils'
export const CourseContent = () => {
  const [videoList, setVideoList] = useState([])
  const [activeChapter, setActiveChapter] = useState(0)
  const [activeVideo, setActiveVideo] = useState(0)
  const [showPlaylist, setShowPlaylist] = useState(true)
  const [content, setContent] = useState([])
//   const {courseId} = useParams();
const courseId = "6635c85c34f3f70968725738";

  useEffect(() => {
    const payload = {
        courseId: courseId,
        access_token: getToken()
    }
    fetchCourseContent(payload).then((data)=>{
        console.log(data.data);
        setContent(data.data.course.courseContent)
    }).catch((err)=>{
        console.error(err.message);
    })
    
  }, [])
  console.log(content,"content");
  const handleChapterClick = (chapterIndex) => {
    setActiveChapter(chapterIndex)
    setShowPlaylist(false)
    togglePlaylist()
  }

  const handleVideoClick = (chapterIndex, videoIndex) => {
    setActiveChapter(chapterIndex)
    setActiveVideo(videoIndex)
  }

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist)
  }
  useEffect(()=>{
    if(activeVideo==null){
        setActiveVideo(0)
    }
  },[activeVideo])
  console.log(activeChapter,"active chapter");
  console.log(activeVideo,"active video");

  return (
    <div className="course-content-wrapper">
      <div className="main-vedio">
        <div className="main-video-header">
          <h2>
            {activeChapter !== null &&
              activeVideo !== null &&
              content[activeChapter]?.subSections[activeVideo].title}
          </h2>
        </div>
        <div className="course-video-section">
          {activeChapter !== null && activeVideo !== null && (
            <video
              src={content[activeChapter]?.subSections[activeVideo].videoUrl}
              controls
              className="course-video"
            ></video>
          )}
          <p className="description">
            <b>Description: </b>
            {activeChapter !== null &&
              activeVideo !== null &&
              content[activeChapter]?.subSections[activeVideo].description}
          </p>
        </div>
      </div>
      <div className="course-playlist-wrapper" style={{ width: '25%' }}>
        <div className="playlist-header">
          <h2>Playlist</h2>
          <button onClick={togglePlaylist}>
            {showPlaylist ? 'Close Playlist' : 'Open Playlist'}
          </button>
        </div>
        <div
          className="course-videos-list"
          
        >
          {content.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="course-chapter-wrapper">
              <div
                className="course-chapter-title"
                onClick={() => handleChapterClick(chapterIndex)}
               
              >
                {chapter?.sectionName}
              </div>
              {activeChapter === chapterIndex && (
                <div className="course-video-list"
                style={{ display: showPlaylist ? 'block' : 'none' }}
                
                >
                  {chapter?.subSections.map((video, videoIndex) => (
                    <div
                      key={videoIndex}
                      className="course-video-title"
                      onClick={() => handleVideoClick(chapterIndex, videoIndex)}
                      
                    >
                      <p>{video.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
      </div>
      
    </div>
  )
}

