import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from '../Notification';
import API_URL from '../../config';


const CreateFlyerPost = ({ addFlyerPost }) => {
  const [newPost, setNewPost] = useState({ 
    caption: '', 
    images: []
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [fieldError, setFieldError] = useState({ caption: false, images: false });
  const [isUploading, setIsUploading] = useState(false);

  const validateFields = () => {
    const errors = {
      caption: !newPost.caption.trim(),
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
    
    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    setNewPost({ ...newPost, images: updatedFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      setShowNotification(true);
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('caption', newPost.caption);
      
      selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await axios.post(`${API_URL}/api/flyers`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setShowNotification(true);
        setNewPost({ caption: '', images: [] });
        setSelectedFiles([]);
        setImagePreviews([]);
        
        if (addFlyerPost) {
          addFlyerPost(response.data);
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

  return (
    <div className='row' style={{ padding: '10px', margin: '5px' }}>
      <div className=''>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <h3>Create New Flyer</h3>
            <label htmlFor='caption' className='form-label'>
              Caption
            </label>
            <textarea
              className={`form-control form-control-sm ${fieldError.caption ? 'is-invalid' : ''}`}
              id='caption'
              rows="3"
              value={newPost.caption}
              onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
              required
            />
            {fieldError.caption && <div className='invalid-feedback'>Caption is required</div>}
          </div>
          
          <div className='mb-3'>
            <label htmlFor='images' className='form-label'>
              Upload Images (Max 10 images, 5MB each)
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
            className='btn btn-primary alert-success' 
            style={{ textShadow: '2px 2px 0 #000' }}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Create Flyer'}
          </button>
          
          {showNotification && (
            <Notification
              message={`Flyer has been created successfully with ${selectedFiles.length} image(s)`}
              type='success'
              onClose={() => setShowNotification(false)}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateFlyerPost;