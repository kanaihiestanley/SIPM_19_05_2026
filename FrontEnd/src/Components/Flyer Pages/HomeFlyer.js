import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OtherHeaderContent from '../OtherHeaderContent';
import FlyerDetails from './FlyerDetails';
import CreateFlyerPost from './CreateFlyerPost';
import API_URL from '../../config';

const HomeFlyer = () => {
  const [flyerPosts, setFlyerPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const postsPerPage = 5;

  const fetchFlyerPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/flyers`);
      console.log('Fetched flyer posts:', response.data);
      
      const posts = response.data.map(post => ({
        ...post,
        images: post.images && Array.isArray(post.images) ? post.images : []
      }));
      
      setFlyerPosts(posts);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load flyer posts. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlyerPosts();
  }, []);

  const handleDelete = async (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this flyer?');
    if (isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/flyers/${postId}`);
        setFlyerPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting flyer');
      }
    }
  };

  const handleUpdate = (updatedPost) => {
    setFlyerPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  const handleCreate = (newPost) => {
    fetchFlyerPosts();
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = flyerPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='row' style={{ padding: '10px', margin: '5px' }}>
      <OtherHeaderContent />

      <div className='col-xl-8 col-lg-8 col-md-6 col-sm-12 pe-3 bg-info' style={{ paddingTop: "50px" }}>
        <h2><strong>Flyer Management Console</strong></h2>
        
        {error && (
          <div className="alert alert-danger">
            {error}
            <button className="btn btn-sm btn-primary ms-3" onClick={fetchFlyerPosts}>
              Retry
            </button>
          </div>
        )}
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div className="FlyerPosts">
              {currentPosts.length > 0 ? (
                currentPosts.map((flyerPost) => (
                  <FlyerDetails
                    FlyerPost={flyerPost}
                    key={flyerPost.id}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))
              ) : (
                <p>No flyer posts yet. Create your first flyer!</p>
              )}
            </div>

            {flyerPosts.length > postsPerPage && (
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: Math.ceil(flyerPosts.length / postsPerPage) }).map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginate(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === Math.ceil(flyerPosts.length / postsPerPage) ? 'disabled' : ''}`}>
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
        <CreateFlyerPost addFlyerPost={handleCreate} />
      </div>
    </div>
  );
};

export default HomeFlyer;