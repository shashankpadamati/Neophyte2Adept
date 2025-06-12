import './AboutusBanner.scss'

export const AboutusBanner = (props)=>{
    return (
        <div>
            <div className="about-us-banner-wrapper">
                {
                    props.side === "left" &&
                 <div className="about-us-banner-left-div">
                    <img src={props.imageUrl} className="about-us-banner-image"/>
                </div>
                }
                
                <div className="about-us-banner-middle-div">
                    <div className="about-us-banner-heading">
                       <h2> {props?.heading}</h2>
                    </div>
                    <div className="about-us-banner-description">
                        {props?.description}
                    </div>
                    
                </div>
                {
                    props.side === "right" &&
                    <div className="about-us-banner-right-div">
                    <img src={props.imageUrl} className="about-us-banner-image"/>
                    </div>
                }
                
            </div>
        </div>
    )
}