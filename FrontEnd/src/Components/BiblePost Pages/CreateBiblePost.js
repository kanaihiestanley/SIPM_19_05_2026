import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../config';

const CreateBiblePost = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bible_verse: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // FIXED: Correct endpoint and method
      const response = await axios.post(`${API_URL}/api/biblePosts`, formData);
      console.log('Post created:', response.data);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        bible_verse: ''
      });
      
      // Refresh the list in parent component
      if (onPostCreated) {
        onPostCreated();
      }
      
      alert('Bible post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.response?.data?.error || 'Failed to create post');
      alert('Failed to create post: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-header bg-primary text-white">
        <h4>Create New Bible Post</h4>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title *</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="bible_verse" className="form-label">Bible Verse</label>
            <input
              type="text"
              className="form-control"
              id="bible_verse"
              name="bible_verse"
              value={formData.bible_verse}
              onChange={handleChange}
              placeholder="e.g., John 3:16"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBiblePost;