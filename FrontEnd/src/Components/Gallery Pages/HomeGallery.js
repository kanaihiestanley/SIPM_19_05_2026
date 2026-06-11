import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OtherHeaderContent from '../OtherHeaderContent';
import GalleryDetails from './GalleryDetails';
import CreateGalleryPost from './CreateGalleryPost';
import { useAuth } from '../Login_Context/AuthContext';
import API_URL from '../../config';


const HomeGallery = () => {
  const [galleryPosts, setGalleryPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const postsPerPage = 5;
  const { isAuthenticated, hasPermission } = useAuth();

  // RETRIEVE POSTS
  const fetchGalleryPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/gallery`);
      console.log('Fetched gallery posts:', response.data);
      
      const posts = response.data.map(post => ({
        ...post,
        images: post.images && Array.isArray(post.images) ? post.images : []
      }));
      
      setGalleryPosts(posts);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load gallery posts. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryPosts();
  }, []);

  const handleDelete = async (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this gallery?');
    if (isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/gallery/${postId}`);
        setGalleryPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting gallery');
      }
    }
  };

  const handleUpdate = (updatedPost) => {
    setGalleryPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  const handleCreate = (newPost) => {
    fetchGalleryPosts();
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = galleryPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='row' style={{ padding: '10px', margin: '5px' }}>
      <OtherHeaderContent />

      <div className='col-xl-8 col-lg-8 col-md-6 col-sm-12 pe-3 bg-info' style={{ paddingTop: "50px" }}>
        {/* Fixed emoji on line 347 */}
        <h2>
          <strong>
            <h2><strong><span role="img" aria-label="camera">📸</span> Gallery Management Console</strong></h2>
          </strong>
        </h2>
        
        {isAuthenticated && (
          <div className="alert alert-info mb-3">
            <strong>
              <strong><span role="img" aria-label="warning">⚠️</span> {error} Logged in as:</strong> Logged in as:
            </strong> {hasPermission('delete') ? 'Admin (Full Access)' : 'User (Create & View Only)'}
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger">
            {error}
            <button className="btn btn-sm btn-primary ms-3" onClick={fetchGalleryPosts}>
              Retry
            </button>
          </div>
        )}
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div className="GalleryPosts">
              {currentPosts.length > 0 ? (
                currentPosts.map((galleryPost) => (
                  <GalleryDetails
                    GalleryPost={galleryPost}
                    key={galleryPost.id}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))
              ) : (
                <div className="alert alert-info">
                  <p>No gallery posts yet. Create your first gallery!</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {galleryPosts.length > postsPerPage && (
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: Math.ceil(galleryPosts.length / postsPerPage) }).map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginate(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === Math.ceil(galleryPosts.length / postsPerPage) ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>

      <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 pe-3 bg-info'>
        {/* Fixed emoji on line 352 */}
        <div className="text-center mb-3">
          <div className="text-center mb-3"><span role="img" aria-label="plus">➕</span></div>
        </div>
        <CreateGalleryPost addGalleryPost={handleCreate} />
      </div>
    </div>
  );
};

export default HomeGallery;