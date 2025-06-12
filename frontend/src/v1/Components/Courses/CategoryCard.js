
import './CategoryCard.scss'
import { useNavigate } from 'react-router';
export const CategoryCard = ({category})=>{
    const navigate = useNavigate();
    // const navigationHandler = (category)=>{
    //     const category_name = category?.name.replace("", "_");
    //     navigate(`/courses/${category_name}`, {state: category?.course})
    // }
    return (
        <div>
            <div className="categories-wrapper">
                <div className="heading">
                        <img src={category?.logo} className="category-logo"/>

                    <div className="category-name">
                        {category?.name}
                    </div>
                </div>
                <div className="category-description">
                    <div>{category?.description}</div>
                </div>
                <div className="learn-more-button">
                 <pre className='vector' >Learn More <span className='vector'>&gt;</span></pre>
                </div>
            </div>
        </div>
    )
}