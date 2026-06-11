// import React from 'react';
// import { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.bundle';
// import axios from "axios";
// import { NavLink } from "react-router-dom";
// import firstSlide from './images/Bible quotes/bible-flyer-1.jpeg';
// import blogIcon from './images/blog-icon.png';
// import API_URL from '../config';

// const BodyContent = () => {
//   // BIBLE POST
//   const [firstBiblePost, setFirstBiblePost] = useState(null);
//   const [showFullContent, setShowFullContent] = useState(false);
  
//   // GALLERY CAROUSEL
//   const [latestImages, setLatestImages] = useState([]);
//   const [galleryLoading, setGalleryLoading] = useState(true);
//   const [galleryError, setGalleryError] = useState(null);
  
//   // FLYER POST
//   const [latestFlyers, setLatestFlyers] = useState([]);
//   const [flyerLoading, setFlyerLoading] = useState(true);
//   const [flyerError, setFlyerError] = useState(null);

//   // GET ALL BIBLE POST LIST
//   useEffect(() => {
//     axios.get('${API_URL}/api/biblePosts/')
//       .then((response) => {
//         const posts = response.data;
//         if (posts && posts.length > 0) {
//           setFirstBiblePost(posts[0]);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching bible posts:', error);
//       });
//   }, []);

//   // FETCH LATEST 10 GALLERY IMAGES
//   useEffect(() => {
//     fetchLatestImages();
//   }, []);

//   const fetchLatestImages = async () => {
//     try {
//       setGalleryLoading(true);
//       const response = await axios.get('${API_URL}/api/gallery');
//       const galleryPosts = response.data;
      
//       console.log('All gallery posts:', galleryPosts);
      
//       if (!galleryPosts || galleryPosts.length === 0) {
//         setLatestImages([]);
//         return;
//       }
      
//       // Extract ALL images from ALL posts
//       let allImages = [];
      
//       galleryPosts.forEach((post) => {
//         // Parse images if it's a string
//         let postImages = post.images;
//         if (typeof postImages === 'string') {
//           try {
//             postImages = JSON.parse(postImages);
//           } catch (e) {
//             postImages = [];
//           }
//         }
        
//         // Add each image with its title/description
//         if (Array.isArray(postImages) && postImages.length > 0) {
//           postImages.forEach((imageUrl) => {
//             allImages.push({
//               url: imageUrl,
//               title: post.title,
//               description: post.description,
//               postId: post.id,
//               createdAt: post.created_at
//             });
//           });
//         }
//       });
      
//       // Sort by creation date (newest first)
//       allImages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
//       // Take ONLY the latest 10 images (changed from 3 to 10)
//       const latestTenImages = allImages.slice(0, 10);
      
//       console.log('Latest 10 images:', latestTenImages);
//       setLatestImages(latestTenImages);
      
//     } catch (error) {
//       console.error('Error fetching gallery images:', error);
//       setGalleryError('Failed to load gallery images');
//     } finally {
//       setGalleryLoading(false);
//     }
//   };

//   // FETCH LATEST 3 FLYERS
//   useEffect(() => {
//     fetchLatestFlyers();
//   }, []);

//   const fetchLatestFlyers = async () => {
//     try {
//       setFlyerLoading(true);
//       const response = await axios.get('${API_URL}/api/flyers');
//       const flyerPosts = response.data;
      
//       console.log('All flyer posts:', flyerPosts);
      
//       if (!flyerPosts || flyerPosts.length === 0) {
//         setLatestFlyers([]);
//         return;
//       }
      
//       // Extract ALL images from ALL posts
//       let allFlyers = [];
      
//       flyerPosts.forEach((post) => {
//         // Parse flyers if it's a string
//         let postFlyers = post.images;
//         if (typeof postFlyers === 'string') {
//           try {
//             postFlyers = JSON.parse(postFlyers);
//           } catch (e) {
//             postFlyers = [];
//           }
//         }
        
//         // Add each flyer with its caption
//         if (Array.isArray(postFlyers) && postFlyers.length > 0) {
//           postFlyers.forEach((imageUrl) => {
//             allFlyers.push({
//               url: imageUrl,
//               caption: post.caption,
//               postId: post.id,
//               createdAt: post.created_at
//             });
//           });
//         }
//       });
      
//       // Sort by creation date (newest first)
//       allFlyers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
//       // Take ONLY the latest 3 images
//       const latestThreeFlyers = allFlyers.slice(0, 3);
      
//       console.log('Latest 3 flyers:', latestThreeFlyers);
//       setLatestFlyers(latestThreeFlyers);
      
//     } catch (error) {
//       console.error('Error fetching flyers:', error);
//       setFlyerError('Failed to load flyers');
//     } finally {
//       setFlyerLoading(false);
//     }
//   };

//   const truncateText = (text, limit) => {
//     if (!text) return '';
//     const words = text.split(' ');
//     if (words.length > limit) {
//       return words.slice(0, limit).join(' ') + '...';
//     }
//     return text;
//   };

//   // Generate carousel items dynamically from gallery images
//   const renderGalleryCarousel = () => {
//     if (galleryLoading) {
//       return (
//         <div className="card">
//           <div className="text-center p-4">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-2">Loading gallery...</p>
//           </div>
//         </div>
//       );
//     }

//     if (galleryError) {
//       return (
//         <div className="card">
//           <div className="alert alert-danger m-2">
//             {galleryError}
//             <button 
//               className="btn btn-sm btn-primary mt-2 d-block" 
//               onClick={fetchLatestImages}
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       );
//     }

//     if (latestImages.length === 0) {
//       return (
//         <div className="card">
//           <div className="text-center p-4">
//             <p>No images in gallery yet.</p>
//             <small>Check back later for updates</small>
//           </div>
//         </div>
//       );
//     }

//     // Build carousel items from latest images
//     return (
//       <div className="card">
//         <div id="latestGalleryCarousel" className="carousel slide" data-bs-ride="carousel">
//           <div className="carousel-inner">
//             {latestImages.map((image, index) => (
//               <div 
//                 key={`${image.postId}-${index}`} 
//                 className={`carousel-item ${index === 0 ? 'active' : ''}`}
//                 data-bs-interval="5000"
//               >
//                 <img 
//                   src={`${API_URL}${image.url}`} 
//                   className="d-block w-100 card-img-top" 
//                   alt={image.title}
//                   style={{ height: '250px', objectFit: 'cover' }}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = firstSlide;
//                   }}
//                 />
//                 <div className="card-body">
//                   <p className="card-text">
//                     <strong>{image.title}</strong>
//                   </p>
//                   <small className="text-muted">
//                     {image.description && image.description.substring(0, 60)}
//                     {image.description && image.description.length > 60 ? '...' : ''}
//                   </small>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {latestImages.length > 1 && (
//             <>
//               <button 
//                 className="carousel-control-prev" 
//                 type="button" 
//                 data-bs-target="#latestGalleryCarousel" 
//                 data-bs-slide="prev"
//               >
//                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                 <span className="visually-hidden">Previous</span>
//               </button>
//               <button 
//                 className="carousel-control-next" 
//                 type="button" 
//                 data-bs-target="#latestGalleryCarousel" 
//                 data-bs-slide="next"
//               >
//                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                 <span className="visually-hidden">Next</span>
//               </button>
//             </>
//           )}
          
//           {latestImages.length > 1 && (
//             <div className="carousel-indicators" style={{ marginBottom: '-30px' }}>
//               {latestImages.map((_, index) => (
//                 <button
//                   key={index}
//                   type="button"
//                   data-bs-target="#latestGalleryCarousel"
//                   data-bs-slide-to={index}
//                   className={index === 0 ? 'active' : ''}
//                   aria-current={index === 0 ? 'true' : 'false'}
//                   aria-label={`Slide ${index + 1}`}
//                 ></button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Generate carousel for flyers
//   const renderFlyerCarousel = () => {
//     if (flyerLoading) {
//       return (
//         <div className="card">
//           <div className="text-center p-4">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-2">Loading flyers...</p>
//           </div>
//         </div>
//       );
//     }

//     if (flyerError) {
//       return (
//         <div className="card">
//           <div className="alert alert-danger m-2">
//             {flyerError}
//             <button 
//               className="btn btn-sm btn-primary mt-2 d-block" 
//               onClick={fetchLatestFlyers}
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       );
//     }

//     if (latestFlyers.length === 0) {
//       return (
//         <div className="card">
//           <div className="text-center p-4">
//             <p>No flyers available yet.</p>
//             <small>Check back later for updates</small>
//           </div>
//         </div>
//       );
//     }

//     // Build carousel for flyers
//     return (
//       <div className="card">
//         <div id="latestFlyerCarousel" className="carousel slide" data-bs-ride="carousel">
//           <div className="carousel-inner">
//             {latestFlyers.map((flyer, index) => (
//               <div 
//                 key={`${flyer.postId}-${index}`} 
//                 className={`carousel-item ${index === 0 ? 'active' : ''}`}
//                 data-bs-interval="5000"
//               >
//                 <img 
//                   src={`${API_URL}${flyer.url}`} 
//                   className="d-block w-100 card-img-top" 
//                   alt={flyer.caption}
//                   style={{ height: '250px', objectFit: 'cover' }}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = firstSlide;
//                   }}
//                 />
//                 <div className="card-body">
//                   <p className="card-text">
//                     <strong>{flyer.caption}</strong>
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {latestFlyers.length > 1 && (
//             <>
//               <button 
//                 className="carousel-control-prev" 
//                 type="button" 
//                 data-bs-target="#latestFlyerCarousel" 
//                 data-bs-slide="prev"
//               >
//                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                 <span className="visually-hidden">Previous</span>
//               </button>
//               <button 
//                 className="carousel-control-next" 
//                 type="button" 
//                 data-bs-target="#latestFlyerCarousel" 
//                 data-bs-slide="next"
//               >
//                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                 <span className="visually-hidden">Next</span>
//               </button>
//             </>
//           )}
          
//           {latestFlyers.length > 1 && (
//             <div className="carousel-indicators" style={{ marginBottom: '-30px' }}>
//               {latestFlyers.map((_, index) => (
//                 <button
//                   key={index}
//                   type="button"
//                   data-bs-target="#latestFlyerCarousel"
//                   data-bs-slide-to={index}
//                   className={index === 0 ? 'active' : ''}
//                   aria-current={index === 0 ? 'true' : 'false'}
//                   aria-label={`Slide ${index + 1}`}
//                 ></button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="BodyContent">
//       <section id="OurBlog"> 
//         <div className="container">
//           <h2>Our Program</h2>
//           <p>A frequent, Communication with God<br /> Give Rise to Physical Answers</p>
//           <div className="blog-wrap">
//             <div className="each-block clearfix one"> 
//               <div className="icon">
//                 <img src={blogIcon} alt="blog-icon" />
//               </div>
//               <div className="blog-intro"> 
//                 <h3>Prayer meeting (Wednesday's)...</h3>
//                 <p>The key to effective prayer meeting is intentional preparation to communicate with God through prayer.
//                   <br />
//                   Come lets gather in community, to praise God on a one-to-one basis, as the Holy Spirit moves us...
//                 </p>
//               </div>
//             </div>
//             <div className="each-block clearfix two"> 
//               <div className="icon">
//                 <img src={blogIcon} alt="blog-icon" />
//               </div>
//               <div className="blog-intro"> 
//                 <h3>Solution Time (Thursday's)...</h3>
//                 <p>Which time is perfect to tender our challenges than now.</p>
//               </div>
//             </div>
//             <div className="each-block clearfix three"> 
//               <div className="icon">
//                 <img src={blogIcon} alt="blog-icon" />
//               </div>
//               <div className="blog-intro"> 
//                 <h3>Sunday service (Sunday's)...</h3>
//                 <p>Let Come to God's presence with praise and thanksgiving in our heart 
//                   <br /> Come lets approach his presence with a tender heart,
//                   <br /> Let Your tender heart hear the WORD Raw and Fresh
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="learnmore">
//             <NavLink className="nav-link active" aria-current="page" to="/OurContact">
//               <span>Contact Us</span>
//             </NavLink> 
//           </div>
//         </div>
//       </section>
//       <hr />

//       {/* MONTHLY FLYERS AND BIBLE POST SECTION */}
//       <div className="container-fluid">
//         <div className="row">
//           {/* FLYER SECTION */}
//           <div className="card-section col-lg-5 col-md-5 col-sm-6">
//             {renderFlyerCarousel()}
//           </div>

//           {/* BIBLE POST SECTION */}
//           <div className="card-section col-lg-5 col-md-5 col-sm-6 clearfix">
//             <div className="card">       
//               <div className='w-100'>
//                 <div style={{ paddingTop: '20px', margin: '15px' }}>
//                   {firstBiblePost ? (
//                     <div key={firstBiblePost.id}>
//                       <h2><strong>{firstBiblePost.title}</strong></h2>
//                       <hr />
//                       <p> 
//                         {showFullContent
//                           ? firstBiblePost.description 
//                           : truncateText(firstBiblePost.description, 100)}
//                       </p>
//                       <p><strong>{firstBiblePost.bibleverse}</strong></p>                
//                       <div className="card-body">                                               
//                         <button 
//                           className='btn btn-primary' 
//                           onClick={() => setShowFullContent(!showFullContent)}
//                         >
//                           {showFullContent ? 'Read Less' : 'Read More...'}
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div>
//                       <div>No data found</div>
//                     </div>
//                   )}
//                 </div> 
//               </div>  
//             </div>
//           </div>

//           {/* GALLERY SECTION */}
//           <div className="card-section col-lg-2 col-md-2 col-sm-6">
//             {renderGalleryCarousel()}
//           </div>
//         </div>
//       </div>

//       <footer id="Contact">
//         <div className="container">
//           <p>If You Want More On Your Spiritual Welbeing, Feel <br />Free To Watch Us Live on Every Service.</p>
//           <NavLink className="email-btn" aria-current="page" to="/">
//             <span><i className="fa fa-envelope-o" aria-hidden="true"></i>Go-Live</span>
//           </NavLink> 
          
//           <ul className="social-icons">
//             <li>
//               <NavLink className="fa fa-facebook" aria-hidden="true" to="/"></NavLink>
//             </li>
//             <li>
//               <NavLink className="fa fa-twitter" aria-hidden="true" to="/"></NavLink>
//             </li>
//             <li>
//               <NavLink className="fa fa-linkedin" aria-hidden="true" to="/"></NavLink>
//             </li>
//             <li>
//               <NavLink className="fa fa-envelope-o" aria-hidden="true" to="/"></NavLink>
//             </li>
//             <li>
//               <NavLink className="fa fa-google-plus" aria-hidden="false" to="/"></NavLink>                            
//             </li>
//           </ul>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default BodyContent;

















import React from 'react';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from "axios";
import { NavLink } from "react-router-dom";
import firstSlide from './images/Bible quotes/bible-flyer-1.jpeg';
import blogIcon from './images/blog-icon.png';
import API_URL from '../config';

const BodyContent = () => {
  // BIBLE POST
  const [firstBiblePost, setFirstBiblePost] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);
  
  // GALLERY CAROUSEL
  const [latestImages, setLatestImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryError, setGalleryError] = useState(null);
  
  // FLYER POST
  const [latestFlyers, setLatestFlyers] = useState([]);
  const [flyerLoading, setFlyerLoading] = useState(true);
  const [flyerError, setFlyerError] = useState(null);

  // GET ALL BIBLE POST LIST
  useEffect(() => {
    axios.get(`${API_URL}/api/biblePosts/`)
      .then((response) => {
        const posts = response.data;
        if (posts && posts.length > 0) {
          setFirstBiblePost(posts[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching bible posts:', error);
      });
  }, []);

  // FETCH LATEST 10 GALLERY IMAGES
  useEffect(() => {
    fetchLatestImages();
  }, []);

  const fetchLatestImages = async () => {
    try {
      setGalleryLoading(true);
      const response = await axios.get(`${API_URL}/api/gallery`);
      const galleryPosts = response.data;
      
      console.log('All gallery posts:', galleryPosts);
      
      if (!galleryPosts || galleryPosts.length === 0) {
        setLatestImages([]);
        return;
      }
      
      let allImages = [];
      
      galleryPosts.forEach((post) => {
        let postImages = post.images;
        if (typeof postImages === 'string') {
          try {
            postImages = JSON.parse(postImages);
          } catch (e) {
            postImages = [];
          }
        }
        
        if (Array.isArray(postImages) && postImages.length > 0) {
          postImages.forEach((imageUrl) => {
            allImages.push({
              url: imageUrl,
              title: post.title,
              description: post.description,
              postId: post.id,
              createdAt: post.created_at
            });
          });
        }
      });
      
      allImages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const latestTenImages = allImages.slice(0, 10);
      
      console.log('Latest 10 images:', latestTenImages);
      setLatestImages(latestTenImages);
      
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      setGalleryError('Failed to load gallery images');
    } finally {
      setGalleryLoading(false);
    }
  };

  // FETCH LATEST 3 FLYERS
  useEffect(() => {
    fetchLatestFlyers();
  }, []);

  const fetchLatestFlyers = async () => {
    try {
      setFlyerLoading(true);
      const response = await axios.get(`${API_URL}/api/flyers`);
      const flyerPosts = response.data;
      
      console.log('All flyer posts:', flyerPosts);
      
      if (!flyerPosts || flyerPosts.length === 0) {
        setLatestFlyers([]);
        return;
      }
      
      let allFlyers = [];
      
      flyerPosts.forEach((post) => {
        let postFlyers = post.images;
        if (typeof postFlyers === 'string') {
          try {
            postFlyers = JSON.parse(postFlyers);
          } catch (e) {
            postFlyers = [];
          }
        }
        
        if (Array.isArray(postFlyers) && postFlyers.length > 0) {
          postFlyers.forEach((imageUrl) => {
            allFlyers.push({
              url: imageUrl,
              caption: post.caption,
              postId: post.id,
              createdAt: post.created_at
            });
          });
        }
      });
      
      allFlyers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const latestThreeFlyers = allFlyers.slice(0, 3);
      
      console.log('Latest 3 flyers:', latestThreeFlyers);
      setLatestFlyers(latestThreeFlyers);
      
    } catch (error) {
      console.error('Error fetching flyers:', error);
      setFlyerError('Failed to load flyers');
    } finally {
      setFlyerLoading(false);
    }
  };

  const truncateText = (text, limit) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  // Generate carousel items dynamically from gallery images
  const renderGalleryCarousel = () => {
    if (galleryLoading) {
      return (
        <div className="card">
          <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading gallery...</p>
          </div>
        </div>
      );
    }

    if (galleryError) {
      return (
        <div className="card">
          <div className="alert alert-danger m-2">
            {galleryError}
            <button 
              className="btn btn-sm btn-primary mt-2 d-block" 
              onClick={fetchLatestImages}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (latestImages.length === 0) {
      return (
        <div className="card">
          <div className="text-center p-4">
            <p>No images in gallery yet.</p>
            <small>Check back later for updates</small>
          </div>
        </div>
      );
    }

    return (
      <div className="card">
        <div id="latestGalleryCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {latestImages.map((image, index) => (
              <div 
                key={`${image.postId}-${index}`} 
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                data-bs-interval="5000"
              >
                <img 
                  src={`${API_URL}${image.url}`} 
                  className="d-block w-100 card-img-top" 
                  alt={image.title}
                  style={{ height: '250px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = firstSlide;
                  }}
                />
                <div className="card-body">
                  <p className="card-text">
                    <strong>{image.title}</strong>
                  </p>
                  <small className="text-muted">
                    {image.description && image.description.substring(0, 60)}
                    {image.description && image.description.length > 60 ? '...' : ''}
                  </small>
                </div>
              </div>
            ))}
          </div>
          
          {latestImages.length > 1 && (
            <>
              <button 
                className="carousel-control-prev" 
                type="button" 
                data-bs-target="#latestGalleryCarousel" 
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button 
                className="carousel-control-next" 
                type="button" 
                data-bs-target="#latestGalleryCarousel" 
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
          
          {latestImages.length > 1 && (
            <div className="carousel-indicators" style={{ marginBottom: '-30px' }}>
              {latestImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#latestGalleryCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Generate carousel for flyers
  const renderFlyerCarousel = () => {
    if (flyerLoading) {
      return (
        <div className="card">
          <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading flyers...</p>
          </div>
        </div>
      );
    }

    if (flyerError) {
      return (
        <div className="card">
          <div className="alert alert-danger m-2">
            {flyerError}
            <button 
              className="btn btn-sm btn-primary mt-2 d-block" 
              onClick={fetchLatestFlyers}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (latestFlyers.length === 0) {
      return (
        <div className="card">
          <div className="text-center p-4">
            <p>No flyers available yet.</p>
            <small>Check back later for updates</small>
          </div>
        </div>
      );
    }

    return (
      <div className="card">
        <div id="latestFlyerCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {latestFlyers.map((flyer, index) => (
              <div 
                key={`${flyer.postId}-${index}`} 
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                data-bs-interval="5000"
              >
                <img 
                  src={`${API_URL}${flyer.url}`} 
                  className="d-block w-100 card-img-top" 
                  alt={flyer.caption}
                  style={{ height: '250px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = firstSlide;
                  }}
                />
                <div className="card-body">
                  <p className="card-text">
                    <strong>{flyer.caption}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {latestFlyers.length > 1 && (
            <>
              <button 
                className="carousel-control-prev" 
                type="button" 
                data-bs-target="#latestFlyerCarousel" 
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button 
                className="carousel-control-next" 
                type="button" 
                data-bs-target="#latestFlyerCarousel" 
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
          
          {latestFlyers.length > 1 && (
            <div className="carousel-indicators" style={{ marginBottom: '-30px' }}>
              {latestFlyers.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#latestFlyerCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="BodyContent">
      <section id="OurBlog"> 
        <div className="container">
          <h2>Our Program</h2>
          <p>A frequent, Communication with God<br /> Give Rise to Physical Answers</p>
          <div className="blog-wrap">
            <div className="each-block clearfix one"> 
              <div className="icon">
                <img src={blogIcon} alt="blog-icon" />
              </div>
              <div className="blog-intro"> 
                <h3>Prayer meeting (Wednesday's)...</h3>
                <p>The key to effective prayer meeting is intentional preparation to communicate with God through prayer.
                  <br />
                  Come lets gather in community, to praise God on a one-to-one basis, as the Holy Spirit moves us...
                </p>
              </div>
            </div>
            <div className="each-block clearfix two"> 
              <div className="icon">
                <img src={blogIcon} alt="blog-icon" />
              </div>
              <div className="blog-intro"> 
                <h3>Solution Time (Thursday's)...</h3>
                <p>Which time is perfect to tender our challenges than now.</p>
              </div>
            </div>
            <div className="each-block clearfix three"> 
              <div className="icon">
                <img src={blogIcon} alt="blog-icon" />
              </div>
              <div className="blog-intro"> 
                <h3>Sunday service (Sunday's)...</h3>
                <p>Let Come to God's presence with praise and thanksgiving in our heart 
                  <br /> Come lets approach his presence with a tender heart,
                  <br /> Let Your tender heart hear the WORD Raw and Fresh
                </p>
              </div>
            </div>
          </div>
          <div className="learnmore">
            <NavLink className="nav-link active" aria-current="page" to="/OurContact">
              <span>Contact Us</span>
            </NavLink> 
          </div>
        </div>
      </section>
      <hr />

      {/* MONTHLY FLYERS AND BIBLE POST SECTION */}
      <div className="container-fluid">
        <div className="row">
          {/* FLYER SECTION */}
          <div className="card-section col-lg-5 col-md-5 col-sm-6">
            {renderFlyerCarousel()}
          </div>

          {/* BIBLE POST SECTION */}
          <div className="card-section col-lg-5 col-md-5 col-sm-6 clearfix">
            <div className="card">       
              <div className='w-100'>
                <div style={{ paddingTop: '20px', margin: '15px' }}>
                  {firstBiblePost ? (
                    <div key={firstBiblePost.id}>
                      <h2><strong>{firstBiblePost.title}</strong></h2>
                      <hr />
                      <p> 
                        {showFullContent
                          ? firstBiblePost.description 
                          : truncateText(firstBiblePost.description, 100)}
                      </p>
                      <p><strong>{firstBiblePost.bibleverse}</strong></p>                
                      <div className="card-body">                                               
                        <button 
                          className='btn btn-primary' 
                          onClick={() => setShowFullContent(!showFullContent)}
                        >
                          {showFullContent ? 'Read Less' : 'Read More...'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>No data found</div>
                    </div>
                  )}
                </div> 
              </div>  
            </div>
          </div>

          {/* GALLERY SECTION */}
          <div className="card-section col-lg-2 col-md-2 col-sm-6">
            {renderGalleryCarousel()}
          </div>
        </div>
      </div>

      <footer id="Contact">
        <div className="container">
          <p>If You Want More On Your Spiritual Welbeing, Feel <br />Free To Watch Us Live on Every Service.</p>
          <NavLink className="email-btn" aria-current="page" to="/">
            <span><i className="fa fa-envelope-o" aria-hidden="true"></i>Go-Live</span>
          </NavLink> 
          
          <ul className="social-icons">
            <li>
              <NavLink className="fa fa-facebook" aria-hidden="true" to="/"></NavLink>
            </li>
            <li>
              <NavLink className="fa fa-twitter" aria-hidden="true" to="/"></NavLink>
            </li>
            <li>
              <NavLink className="fa fa-linkedin" aria-hidden="true" to="/"></NavLink>
            </li>
            <li>
              <NavLink className="fa fa-envelope-o" aria-hidden="true" to="/"></NavLink>
            </li>
            <li>
              <NavLink className="fa fa-google-plus" aria-hidden="false" to="/"></NavLink>                            
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default BodyContent;