import './ContactUs.scss'

const ContactUs=()=>{
    return(
        <div>
        <div className="mainmap">
        

    <div className="form3">
        <form action="" className="feedbackform">
            <h1 className='contact-heading'>Neophyte To Adept</h1>
            <h2 className='contact-heading'>Feedback and Queries</h2>
         
           <label htmlFor="Selectisssue" className='labels'>Select Issue</label>
            <select name="slctissue" id="Selectissue" required>
                <option value="" id='option'>SELECT AN ISSUE</option>
                <option value="Feedback">Feedback</option>
                <option value="Course related Queries"> Course Related Queries</option>
                <option value="Paymnet related querires">Course Payment Related Issues</option>
                <option value="Purchased course issue">Any Issue in Purchased Course</option>
                <option value="Review related queries">Review Related Queries</option>
                <option value="Improvement Related queries">Content Improvement Related Queries</option>
            </select>
           
           
           <label htmlFor="mail" className='labels'>Email Address</label>
            <input type="email" id="input" required/>

         
            
            
            <label htmlFor="contactnumber" className='labels'>Contact Number</label>
            <input type="tel" id="input"/>
            
            <label htmlFor="feedback" className='labels'>Drop your feedback/query</label>
            <textarea name="feedback" id="feedback" cols="30" rows="5" placeholder="Max Allowed Characters:300" required></textarea>

            
            <button type="submit" id="submit">Submit</button>
           
            
        </form>
    </div>
    <div className="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.6622730186723!2d75.53326897533081!3d31.395874574271186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a51d30c180edf%3A0x5b7633718d17ef33!2sDr%20B%20R%20Ambedkar%20National%20Institute%20of%20Technology%20Jalandhar!5e0!3m2!1sen!2sin!4v1699039352118!5m2!1sen!2sin" width={600} height={450}  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
    </div>
    </div>

    )
}

export default ContactUs;