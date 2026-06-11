import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios'; 
import OtherHeaderContent from "../OtherHeaderContent";
import CreateBiblePost from "./CreateBiblePost";
import BibleDetails from "./BibleDetails";
import API_URL from '../../config';


const HomeBiblePost = () => {
  const [BiblePosts, setBiblePosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // FIXED: Changed from PATCH to GET, fixed endpoint URL
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/biblePosts`);
      console.log('Fetched data:', response.data); // Debug log
      setBiblePosts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch bible posts. Check if backend is running on port 5005');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FIXED: Delete handler with correct endpoint and ID field
  const handleDelete = async (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      try {
        console.log('Deleting post with ID:', postId);
        // FIXED: Correct endpoint and port
        await axios.delete(`${API_URL}/api/biblePosts/${postId}`);
        alert('Post deleted successfully!');
        fetchData(); // Refresh the list instead of reloading page
      } catch (error) {
        console.error('Error deleting post:', error.response?.data || error.message);
        alert('Failed to delete post: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  // FIXED: Update handler with correct ID field (using 'id' instead of '_id')
  const handleUpdate = (updatedPost) => {
    setBiblePosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = BiblePosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='row' style={{ padding: '10px', margin: '5px' }}>
      <OtherHeaderContent />
      <div className='col-xl-8 col-lg-8 col-md-6 col-sm-12 pe-3 bg-info' style={{paddingTop: "50px"}}>
        <h2><strong>Bible Management Console</strong></h2>
        <div className="BiblePosts">
          {currentPosts.length > 0 ? (
            currentPosts.map((BiblePost) => (
              <BibleDetails
                BiblePost={BiblePost}
                key={BiblePost.id} // FIXED: Using 'id' instead of '_id'
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <p>No bible posts found. Create your first post!</p>
          )}
        </div>

        {/* Pagination */}
        {BiblePosts.length > 0 && (
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array.from({ length: Math.ceil(BiblePosts.length / postsPerPage) }).map((_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 pe-3 bg-info'>
        <CreateBiblePost onPostCreated={fetchData} /> {/* FIXED: Pass refresh function */}
      </div>
    </div>
  );
};

export default HomeBiblePost;