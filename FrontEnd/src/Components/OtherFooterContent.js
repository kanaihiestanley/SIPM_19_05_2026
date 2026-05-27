    import React from 'react';
    import { useState, useEffect } from "react";
    import facebook from '../Components/images/socialHandlesIcon/facebook.svg';
    import google from '../Components/images/socialHandlesIcon/envelope-at.svg';
    import instagram from '../Components/images/socialHandlesIcon/instagram.svg';
    import twitter from '../Components/images/socialHandlesIcon/twitter.svg';
    import youtube from '../Components/images/socialHandlesIcon/youtube.svg';
    import telephonePlus from '../Components/images/socialHandlesIcon/telephone-plus.svg';
    import geoFill from '../Components/images/socialHandlesIcon/geo-fill.svg';

    const OtherFooterContent = () => {

        const [isBlinking, setIsBlinking] = useState(false);

        useEffect(() => {
            const intervalId = setInterval(() => {
            setIsBlinking((prev) => !prev);
            }, 1000);
        
            return () => clearInterval(intervalId);
        }, []);
                
            return(      
                    <section className="container-fluid otherFooterBG">
                        <div className="text-white">
                            
                                <div className="row pt-3 ps-3">
                                    <div className="col-4 col-lg-4 col-md-6 col-sm-12 pt-3">                                    
                                            <a href="/OurLocation">                                        
                                                <span className="text-white">
                                                    <h4>Our Address</h4>                                            
                                                    <address className="fw-bold">
                                                        <p>
                                                        <img src={geoFill} style={{width: '30px', height: '30px'}} alt="geo" />
                                                            7, Sambosh Street,<br/>
                                                            Moshalashi Bus-Stop, Shasha Akowonjo, <br/>
                                                            Lagos, Nigeria.
                                                        </p>
                                                    </address>                                                                                     
                                                </span>
                                            </a>
                                            <button className={`blinking-button ${isBlinking ? 'blink' : ''}`}>
                                                <a className="dropdown-item fw-bold" href="/LivestreamUserDisplay">
                                                    <strong>Go Live !</strong>
                                                </a>
                                            </button>
                                    </div>
                                    
                                    <div className="col-4 col-lg-4 col-md-6 col-sm-12 pt-3">
                                        <div className="fw-bold text-white">
                                            <h4>Email Us</h4>  
                                            <address className="">
                                                <img src={google} alt="email"  style={{width: '30px', height: '30px'}}/><nbsp />
                                                <a className="text-white" href="mailto:solutioncenterchrch@gmail.com"> Email: solutioncenterchrch@gmail.com</a>
                                            </address>                  
                                        </div>
                                    </div>
                                    <div className="col-4 col-lg-4 col-md-6 col-sm-12 pt-3">
                                        <div className="info_contact">
                                            <h4>Call Us</h4>
                                            <a href="mailto:+2348091461222">
                                                <img src={telephonePlus} alt="phone" style={{width: '30px', height: '30px'}}/>&nbsp                                            <span className="text-white">
                                                    +234 8091 461 222
                                                </span>
                                            </a>
                                        </div>
                                        
                                        <div className="info_social pt-5 pb-5">
                                            <div className="d-flex">
                                                <h5 className="info_heading">
                                                Follow Us
                                                </h5>
                                            </div>
                                            
                                            <div clasName="social_box ">
                                                <a href="/">
                                                    <img src={facebook} style={{width: '30px', height: '30px'}} alt="fb" />
                                                </a>
                                                <a href="/" className="ps-5">
                                                    <img src={twitter} style={{width: '30px', height: '30px'}} alt="twitter" />
                                                </a>
                                                <a href="/" className="ps-5">
                                                    <img src={instagram} alt="instagram" style={{width: '30px', height: '30px'}} />
                                                </a>
                                                <a href="/" className="ps-5">
                                                <i className="bi bi-envelope-at"></i>
                                                    <img src={youtube} alt="youtube" style={{width: '30px', height: '30px'}} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>                            
                                </div>
                            
                        </div>
                    </section>      
                    

            )
        
    }

    export default OtherFooterContent