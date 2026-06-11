import React, { useState } from "react";
import axios from "axios";
import API_URL from '../../config';

const FlyerDetails = ({ FlyerPost, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ ...FlyerPost });
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this flyer?')) {
      try {
        await axios.delete(`${API_URL}/api/flyers/${FlyerPost.id}`);
        onDelete(FlyerPost.id);
      } catch (error) {
        console.error('Error deleting data:', error);
        alert('Error deleting flyer');
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    const images = typeof FlyerPost.images === 'string' 
      ? JSON.parse(FlyerPost.images) 
      : (FlyerPost.images || []);
    setEditedPost({ ...FlyerPost, images: images });
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + editedPost.images.length > 10) {
      alert('Maximum 10 images per flyer');
      return;
    }

    setNewImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setNewImagePreviews(previews);
  };

  const removeExistingImage = (imageUrl) => {
    setDeletedImages([...deletedImages, imageUrl]);
    const updatedImages = editedPost.images.filter(img => img !== imageUrl);
    setEditedPost({ ...editedPost, images: updatedImages });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('caption', editedPost.caption);
      formData.append('existingImages', JSON.stringify(editedPost.images));
      
      newImages.forEach(file => {
        formData.append('images', file);
      });

      const response = await axios.put(
        `${API_URL}/api/flyers/${FlyerPost.id}`, 
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      
      onUpdate(response.data.data);
      setIsEditing(false);
      
      newImagePreviews.forEach(preview => URL.revokeObjectURL(preview));
      setNewImages([]);
      setNewImagePreviews([]);
      setDeletedImages([]);
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating flyer');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPost({ ...FlyerPost });
    setNewImages([]);
    setNewImagePreviews([]);
    setDeletedImages([]);
  };

  const handleInputChange = (e) => {
    setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
  };

  const flyerImages = typeof FlyerPost.images === 'string' 
    ? JSON.parse(FlyerPost.images) 
    : (FlyerPost.images || []);

  return (
    <div className="Flyer-details" style={{ marginTop: "10px", border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
      {isEditing ? (
        <>
          <div className="mb-3">
            <label>Caption:</label>
            <textarea
              className="form-control"
              name="caption"
              rows="3"
              value={editedPost.caption}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-3">
            <label>Current Images:</label>
            <div className="row">
              {editedPost.images && editedPost.images.map((imageUrl, index) => (
                <div key={index} className="col-md-3 col-sm-4 col-6 mb-2 position-relative">
                  <img 
                    src={`${API_URL}${imageUrl}`} 
                    alt={`Flyer ${index + 1}`} 
                    className="img-fluid rounded"
                    style={{ height: '100px', objectFit: 'cover', width: '100%' }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                    onClick={() => removeExistingImage(imageUrl)}
                    style={{ borderRadius: '50%' }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label>Add New Images:</label>
            <input
              type="file"
              className="form-control"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleImageSelect}
            />
            <small className="text-muted">You can add more images (max 10 total)</small>
          </div>

          {newImagePreviews.length > 0 && (
            <div className="mb-3">
              <label>New Images Preview:</label>
              <div className="row">
                {newImagePreviews.map((preview, index) => (
                  <div key={index} className="col-md-3 col-sm-4 col-6 mb-2">
                    <img 
                      src={preview} 
                      alt={`New ${index + 1}`} 
                      className="img-fluid rounded"
                      style={{ height: '100px', objectFit: 'cover', width: '100%' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h4><strong>Caption:</strong></h4>
          <p>{FlyerPost.caption}</p>
          
          {flyerImages.length > 0 && (
            <div className="mb-3">
              <strong>Images ({flyerImages.length}):</strong>
              <div className="row mt-2">
                {flyerImages.map((imageUrl, index) => (
                  <div key={index} className="col-md-3 col-sm-4 col-6 mb-2">
                    <img 
                      src={`${API_URL}${imageUrl}`} 
                      alt={`Flyer ${index + 1}`} 
                      style={{ maxWidth: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                      className="img-fluid"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <p><small>{new Date(FlyerPost.created_at).toLocaleString()}</small></p>
          
          <button className="btn btn-danger me-2" onClick={handleDelete}>Delete Flyer</button>
          <button className="btn btn-secondary" onClick={handleEdit}>Edit Flyer</button>
          <hr />
        </>
      )}
    </div>
  );
};

export default FlyerDetails;