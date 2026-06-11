import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from '../Notification';
import { useAuth } from '../Login_Context/AuthContext';
import API_URL from '../../config';


const CreateGalleryPost = ({ addGalleryPost }) => {
  const [newPost, setNewPost] = useState({ 
    title: '', 
    description: '', 
    images: []
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [fieldError, setFieldError] = useState({ title: false, description: false, images: false });
  const [isUploading, setIsUploading] = useState(false);
  const { hasPermission, isAuthenticated } = useAuth();

  const canCreate = isAuthenticated && (hasPermission('create') || hasPermission('edit'));

  const validateFields = () => {
    const errors = {
      title: !newPost.title.trim(),
      description: !newPost.description.trim(),
      images: selectedFiles.length === 0,
    };
    setFieldError(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 10) {
      alert('You can only upload up to 10 images');
      return;
    }

    const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      alert('Some files exceed 5MB limit. Please choose smaller images.');
      return;
    }

    setSelectedFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    setNewPost({ ...newPost, images: files });
    setFieldError({ ...fieldError, images: false });
  };

  const removeImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    URL.revokeObjectURL(imagePreviews[index]);
    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    setNewPost({ ...newPost, images: updatedFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canCreate) {
      alert('You do not have permission to create gallery posts.');
      return;
    }

    if (!validateFields()) {
      setShowNotification(true);
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('description', newPost.description);
      
      selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await axios.post(`${API_URL}/api/gallery`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setShowNotification(true);
        setNewPost({ title: '', description: '', images: [] });
        setSelectedFiles([]);
        setImagePreviews([]);
        
        if (addGalleryPost) {
          addGalleryPost(response.data);
        }
      }
    } catch (error) {
      console.error('Error creating data:', error);
      alert(error.response?.data?.error || 'Error uploading images');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  if (!canCreate) {
    return (
      <div className='row' style={{ padding: '10px', margin: '5px' }}>
        <div className='alert alert-warning text-center'>
          {/* FIXED LINE 373 */}          
          <h4><span role="img" aria-label="warning">⚠️</span> Access Restricted</h4>
          
          <p>You do not have permission to create gallery posts.</p>
          <small>Please login with an account that has create permissions.</small>
        </div>
      </div>
    );
  }

  return (
    <div className='row' style={{ padding: '10px', margin: '5px' }}>
      <div className=''>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            {/* FIXED LINE 389 */}
            <h3><span role="img" aria-label="sparkles">✨</span> Create New Gallery</h3>
            <label htmlFor='title' className='form-label'>
              Title <span className="text-danger">*</span>
            </label>
            <input
              type='text'
              className={`form-control form-control-sm ${fieldError.title ? 'is-invalid' : ''}`}
              id='title'
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
            />
            {fieldError.title && <div className='invalid-feedback'>Title is required</div>}
          </div>
          
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              className={`form-control form-control-sm ${fieldError.description ? 'is-invalid' : ''}`}
              id='description'
              rows="3"
              value={newPost.description}
              onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
              required
            />
            {fieldError.description && <div className='invalid-feedback'>Description is required</div>}
          </div>
          
          <div className='mb-3'>
            <label htmlFor='images' className='form-label'>
              Upload Images <span className="text-danger">*</span> (Max 10 images, 5MB each)
            </label>
            <input
              type='file'
              className={`form-control form-control-sm ${fieldError.images ? 'is-invalid' : ''}`}
              id='images'
              multiple
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleFileSelect}
              required
            />
            {fieldError.images && <div className='invalid-feedback'>At least one image is required</div>}
            <small className="form-text text-muted">
              You can select multiple images (JPEG, PNG, GIF, WEBP). Max 5MB each.
            </small>
          </div>

          {imagePreviews.length > 0 && (
            <div className="mb-3">
              <label className="form-label">Selected Images ({imagePreviews.length})</label>
              <div className="row">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="col-md-3 col-sm-4 col-6 mb-2 position-relative">
                    <img 
                      src={preview} 
                      alt={`Preview ${index + 1}`} 
                      className="img-fluid rounded" 
                      style={{ height: '100px', objectFit: 'cover', width: '100%' }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                      onClick={() => removeImage(index)}
                      style={{ borderRadius: '50%' }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button 
            type='submit' 
            className='btn btn-primary alert-success w-100' 
            style={{ textShadow: '2px 2px 0 #000' }}
            disabled={isUploading}
          >
            {isUploading ? (
              // FIXED LINE 473
              <>
                <span role="img" aria-label="upload">📤</span> Uploading...
              </>
            ) : (
              // FIXED LINE 478
              <>
                 <span role="img" aria-label="rocket">🚀</span> Create Gallery
              </>
            )}
          </button>
          
          {showNotification && (
            <Notification
              message={`"${newPost.title}" has been created successfully with ${selectedFiles.length} image(s)`}
              type='success'
              onClose={() => setShowNotification(false)}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateGalleryPost;