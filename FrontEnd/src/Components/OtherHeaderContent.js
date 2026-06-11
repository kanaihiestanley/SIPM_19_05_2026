import React from 'react';
import { Component } from "react";
import sipmLogo from './images/Sipm-Logo.png'
import { NavLink } from "react-router-dom";


class OtherHeaderContent extends Component {
    render(){

        
        
        return(
            <div className="otherHeaderContent" style={{ height: '650px'}}>
                <nav className="navbar navbar-expand-lg otherHeaderContent">
                    <div className="container-fluid">
                        {/* <a className="navbar-brand  position-fixed top-0 end-0" href="/">
                            <img src={sipmLogo} alt="logo" style={{width: '50px', height: '50px', borderRadius: '360%'}} />
                        </a> */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" style={{zIndex: 9999, position: 'relative'}} >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav fixed-top">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">
                                        <img className="logo" src={sipmLogo} alt="logo" style={{width: '50px', height: '50px', borderRadius: '360%'}} />
                                    </a>
                                </li>
                                <li className="nav-item">                                    
                                    <NavLink className="nav-link text-white fw-bold active" aria-current="page" to="/OurServices" style={{textShadow: '2px 2px 0 #000'}}>Program</NavLink>                                    
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-white fw-bold" to="/Testimonies" style={{textShadow: '2px 2px 0 #000'}}>Testimonies</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-white fw-bold" to="/OurContact" style={{textShadow: '2px 2px 0 #000'}}>Contact</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white fw-bold" href="/AboutUs" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{textShadow: '2px 2px 0 #000'}}>
                                        About Us
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><NavLink className="dropdown-item" to="/AboutSIPM">About SIPM</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/AboutPastor">About Pastor Yinka</NavLink></li>
                                        
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link text-white fw-bold" to="/HomeBiblePost" style={{textShadow: '2px 2px 0 #000'}}>Bible Post Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-white fw-bold" to="/HomeGallery" style={{textShadow: '2px 2px 0 #000'}}>Gallery Dashboard</NavLink>
                                </li>
                                {/* TO STREAM FACEBOOK LIVE */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white fw-bold" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{textShadow: '2px 2px 0 #000'}}>
                                        Stream LIVE Service
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><NavLink className="dropdown-item" to="/">Live Stream Dashboard</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/">Live Streaming</NavLink></li>                                        
                                    </ul>
                                </li>

                                {/* TO STREAM YOUTUBE PASTOR MSG */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white fw-bold" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{textShadow: '2px 2px 0 #000'}}>
                                        Stream The Word
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><NavLink className="dropdown-item" to="/HomeYTLiveStream">Live Stream Dashboard</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/YTStreamPost">Streaming Messages</NavLink></li>                                        
                                    </ul>
                                </li>

                                 {/* TO STREAM YOUTUBE PASTOR MSG */}
                                 <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white fw-bold" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{textShadow: '2px 2px 0 #000'}}>
                                        Stream Facebook
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><NavLink className="dropdown-item" to="/">Facebook Dashboard</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/">Go Live</NavLink></li>                                        
                                    </ul>
                                </li>

                            </ul>
                        </div>
                        <div className="text-white banner-flier">
                            <h1>SIPM...</h1> 
                            <br />                       
                            <h3>A Place Where Your Spiritual Needs meet Divine Solution</h3>
                        </div>
                        
                    </div>
                </nav>
                <div className="SubOtherHeaderBanner"></div>
            </div>
            
        )
    }
}

export default OtherHeaderContent