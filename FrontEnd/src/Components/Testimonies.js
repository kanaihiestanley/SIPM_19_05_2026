import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import { useEffect } from "react";
import 'bootstrap/dist/js/bootstrap.bundle';
import OtherHeaderContent from "./OtherHeaderContent";
import OtherFooterContent from "./OtherFooterContent";
// import axios from 'axios';
// import {useGalleryPostContext} from "./hooks/useGalleryPostContext";


const Testimonies = () => {   

    // const { GalleryPosts, dispatch } = useGalleryPostContext();

    // useEffect(() => {
    //     axios.get('http://localhost:4000/api/sipmRoute/')
    //         .then((response) => {
    //             dispatch({ type: 'SET_GalleryPOSTS', payload: response.data });
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, [dispatch]);

    
    return(
        <div className="bg-info" style={{height: '800px'}}>
            <OtherHeaderContent />
            <h1 className="text-outline-info display-1">Testimonies</h1> 
            <div className="text-center">
                
                <div className="row">
                    <div className="col-lg-4 bg-success col-md-6 ">
                        
                    </div>
                    

                    <div className="col-lg-4 col-md-6">
                        <div className="accordion" id="accordionExample">                    
                            <div className="accordion-item bg-warning">
                                <h2 className="accordion-header">
                                <button className="accordion-button bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Accordion Item #1
                                </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                                </div>
                            </div>
                            
                            <div className="accordion-item w-5 bg-warning">
                                <h2 className="accordion-header">
                                <button className="accordion-button collapsed bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Accordion Item #2
                                </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                                </div>
                            </div>
                            
                            <div className="accordion-item bg-warning">
                                <h2 className="accordion-header">
                                <button className="accordion-button collapsed bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Accordion Item #3
                                </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                                </div>
                            </div>
                            <div className="card">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>

                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        </div>    
                    </div>

                    <div className="col-lg-4 bg-secondary col-md-6">
                        Lorem Ipsum is simply dummy text of the printing and 
                        typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
                        ever since the 1500s, when an unknown printer took a galley of type and scrambled 
                        it to make a type specimen book. It has survived not only five centuries, but 
                        also the leap into electronic typesetting, remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing 
                        Lorem Ipsum passages, and more recently with desktop publishing software like 
                        Aldus PageMaker including versions of Lorem Ipsum.
                        <div className="card">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>

                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>

            <OtherFooterContent />
                        
        </div>
    )
    
}

export default Testimonies