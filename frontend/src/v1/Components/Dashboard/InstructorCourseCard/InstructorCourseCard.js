import './InstructorCourseCard.scss'
import { MdEdit } from "react-icons/md";


export const InstructorCourseCard = ({Course})=>{
    return (
        <div>
            <div className="instructor-course-card-wrapper">
                <div className='instructor-course-thumbnail-wrapper'>
                    <img src={Course?.thumbnail} className='instructor-course-thumbnail'/>
                </div>
                <div className='instructor-course-details-wrapper'>
                    <h3 className='instructor-course-details-title'>
                        {Course?.courseName}
                    </h3>
                    <div className='instructor-course-details-description'>
                        {Course?.description.slice(0,70)+"..."}
                    </div>
                </div>
                <div className='instructor-course-details-price'>
                        price (in ₹)

                    <span className='instructor-course-price'>
                        {Course?.price}
                    </span>
                </div>
                <div className='instructor-course-edit'>
                <MdEdit />

                </div>

            </div>
        </div>
    )
}