// import React from 'react';
// import sipmLogo from './images/Sipm-Logo.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from './Login_Context/AuthContext';



// const HeaderContent = () => {
//   const { user, logout, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <div> 
//       <div className="position-fixed bannerLogo" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{zIndex: '99999'}}>
//         <img src={sipmLogo} alt='logo'/>
//       </div>
      
//       <div className="offcanvas offcanvas-end fw-10 fw-bold" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
//         <div className="offcanvas-header">                        
//           <img src={sipmLogo} className='offcanvasLogo' alt='logo'/>
//           <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//         </div>
        
//         <div className="offcanvas-body">
//           <ul className="nav flex-column">
//             {/* Navigation Links */}
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>                               
//             </li>
//             <li className="nav-item">                                
//               <Link className="nav-link" to="/ourservices">Our Program</Link>                                
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/discoveryou">Discover You</Link>                              
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/ourcontact">Contact Us</Link>  
//             </li>
            
//             <li className="nav-item dropdown">
//               <Link className="nav-link dropdown-toggle fw-bold" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                 About Us
//               </Link>
//               <ul className="dropdown-menu">
//                 <li><Link className="dropdown-item fw-bold text-primary" to="/aboutsipm">About SIPM</Link></li>
//                 <li><Link className="dropdown-item fw-bold text-primary" to="/aboutpastor">About Pastor Yinka</Link></li>
//               </ul>
//             </li>   

//             {/* Protected routes - only for authenticated users */}
//             {isAuthenticated && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/homebiblepost">Bible Post Dashboard</Link> 
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/gallery">Gallery Dashboard</Link>                                
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/flyers">Flyers Dashboard</Link>                                
//                 </li>
                
//                 <li className="nav-item dropdown">
//                   <Link className="nav-link dropdown-toggle fw-bold" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                     Stream LIVE Service
//                   </Link>
//                   <ul className="dropdown-menu">
//                     <li><Link className="dropdown-item fw-bold text-primary" to="/">Live Stream Dashboard</Link></li>
//                     <li><Link className="dropdown-item fw-bold text-primary" to="/">Live Streaming</Link></li>
//                   </ul>
//                 </li>
                
//                 <li className="nav-item dropdown">
//                   <Link className="nav-link dropdown-toggle fw-bold" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                     Stream The Word
//                   </Link>
//                   <ul className="dropdown-menu">
//                     <li><Link className="dropdown-item fw-bold text-primary" to="/">Youtube Dashboard</Link></li>
//                     <li><Link className="dropdown-item fw-bold text-primary" to="/ytstreampost">Watch Messages</Link></li>
//                   </ul>
//                 </li>

//                 <li className="nav-item dropdown">
//                   <Link className="nav-link dropdown-toggle fw-bold" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                     Stream Facebook
//                   </Link>
//                   <ul className="dropdown-menu">
//                     <li><Link className="dropdown-item fw-bold text-primary" to="/">Facebook Dashboard</Link></li>
//                     <li><Link className="dropdown-item fw-bold text-primary" to="/">Go Live</Link></li>
//                   </ul>
//                 </li>
//               </>
//             )}

//             <hr className="my-3" />
            
//             {/* Authentication Section */}
//             <li className="nav-item">
//               <div className="fw-bold text-secondary mb-2">ACCOUNT</div>
//             </li>
            
//             {isAuthenticated ? (
//               <li className="nav-item">
//                 <div className="dropdown">
//                   <button className="btn btn-primary dropdown-toggle w-100 text-start" data-bs-toggle="dropdown">
//                     <span role="img" aria-label="user">👤</span> {user?.fullname}
//                   </button>
//                   <ul className="dropdown-menu w-100">
//                     <li><span className="dropdown-item">
//                       <strong>Role:</strong> {user?.category === 1 ? 'Admin (Full Access)' : 'User (Limited Access)'}
//                     </span></li>
//                     <li><span className="dropdown-item">
//                       <strong>Permissions:</strong> {user?.category === 1 ? 'Create, Edit, Delete' : 'Create & View Only'}
//                     </span></li>
//                     <li><hr className="dropdown-divider" /></li>
//                     <li>
//                       <button className="dropdown-item text-danger" onClick={handleLogout}>
//                         <span role="img" aria-label="logout">🚪</span> Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </li>
//             ) : (
//               <>
//                 <li className="nav-item mb-2">
//                   <Link className="nav-link btn btn-primary text-white text-center" to="/login">
//                     <span role="img" aria-label="login">🔐</span> Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link btn btn-outline-secondary text-center" to="/register">
//                     <span role="img" aria-label="register">📝</span> Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
      
//       <div className="SubHeaderBanner"></div>
//     </div>
//   );
// };

// export default HeaderContent;






import React from 'react';
import sipmLogo from './images/Sipm-Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Login_Context/AuthContext';

const HeaderContent = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div> 
      <div className="position-fixed bannerLogo" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{zIndex: '99999'}}>
        <img src={sipmLogo} alt='logo'/>
      </div>
      
      <div className="offcanvas offcanvas-end fw-10 fw-bold" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">                        
          <img src={sipmLogo} className='offcanvasLogo' alt='logo'/>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            {/* Navigation Links */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>                               
            </li>
            <li className="nav-item">                                
              <Link className="nav-link" to="/ourservices">Our Program</Link>                                
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/discoveryou">Discover You</Link>                              
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ourcontact">Contact Us</Link>  
            </li>
            
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle fw-bold" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                About Us
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item fw-bold text-primary" to="/aboutsipm">About SIPM</Link></li>
                <li><Link className="dropdown-item fw-bold text-primary" to="/aboutpastor">About Pastor Yinka</Link></li>
              </ul>
            </li>   

            {/* Protected routes - only for authenticated users */}
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/homebiblepost">Bible Post Dashboard</Link> 
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/gallery">Gallery Dashboard</Link>                                
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/flyers">Flyers Dashboard</Link>                                
                </li>
                
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle fw-bold" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Stream LIVE Service
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item fw-bold text-primary" to="/">Live Stream Dashboard</Link></li>
                    <li><Link className="dropdown-item fw-bold text-primary" to="/">Live Streaming</Link></li>
                  </ul>
                </li>
                
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle fw-bold" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Stream The Word
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item fw-bold text-primary" to="/">Youtube Dashboard</Link></li>
                    <li><Link className="dropdown-item fw-bold text-primary" to="/ytstreampost">Watch Messages</Link></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle fw-bold" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Stream Facebook
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item fw-bold text-primary" to="/">Facebook Dashboard</Link></li>
                    <li><Link className="dropdown-item fw-bold text-primary" to="/">Go Live</Link></li>
                  </ul>
                </li>
              </>
            )}

            <hr className="my-3" />
            
            {/* Authentication Section */}
            <li className="nav-item">
              <div className="fw-bold text-secondary mb-2">ACCOUNT</div>
            </li>
            
            {isAuthenticated ? (
              <li className="nav-item">
                <div className="dropdown">
                  <button className="btn btn-primary dropdown-toggle w-100 text-start" data-bs-toggle="dropdown">
                    <span role="img" aria-label="user">👤</span> {user?.fullname}
                  </button>
                  <ul className="dropdown-menu w-100">
                    <li><span className="dropdown-item">
                      <strong>Role:</strong> {user?.category === 1 ? 'Admin (Full Access)' : 'User (Limited Access)'}
                    </span></li>
                    <li><span className="dropdown-item">
                      <strong>Permissions:</strong> {user?.category === 1 ? 'Create, Edit, Delete' : 'Create & View Only'}
                    </span></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <span role="img" aria-label="logout">🚪</span> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            ) : (
              <>
                <li className="nav-item mb-2">
                  <Link className="nav-link btn btn-primary text-white text-center" to="/login">
                    <span role="img" aria-label="login">🔐</span> Login
                  </Link>
                </li>
                {/* Register button hidden for non-admins - only shown when admin is logged in */}
                {/* The register button is now moved inside the admin section below */}
              </>
            )}
            
            {/* Admin Section - Only visible to Admin users (Category 1) */}
            {isAuthenticated && user?.category === 1 && (
              <>
                <hr className="my-3" />
                <li className="nav-item">
                  <div className="fw-bold text-danger mb-2"><span>🔧 ADMIN PANEL</span></div>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link btn btn-warning text-dark text-center" to="/register">
                    <span role="img" aria-label="register">📝</span> Register New User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-info text-dark text-center" to="/admin/users">
                    <span role="img" aria-label="users">👥</span> Manage Users
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      
      <div className="SubHeaderBanner"></div>
    </div>
  );
};

export default HeaderContent;