import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Login_Context/AuthContext';
import API_URL from '../../config';
// Remove unused Emoji import - DELETE THIS LINE if not using
// import Emoji from '../Emoji';

const GalleryDetails = ({ GalleryPost, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState({ ...GalleryPost });
    const [newImages, setNewImages] = useState([]);
    const [newImagePreviews, setNewImagePreviews] = useState([]);
    // const [deletedImages, setDeletedImages] = useState([]);
    const { hasPermission } = useAuth();

    const handleClick = async () => {
        if (!hasPermission('delete')) {
            alert('❌ You do not have permission to delete. Only Admin users can delete.');
            return;
        }
        
        const isConfirmed = window.confirm(`Are you sure you want to delete "${GalleryPost.title}"?`);
        if (isConfirmed) {
            try {
                await axios.delete(`${API_URL}/api/gallery/${GalleryPost.id}`);
                onDelete(GalleryPost.id);
                alert('✅ Gallery post deleted successfully!');
            } catch (error) {
                console.error('Error deleting data:', error);
                alert('❌ Error deleting gallery post');
            }
        }
    };

    const handleEdit = () => {
        if (!hasPermission('edit')) {
            alert('❌ You do not have permission to edit. Only Admin users can edit.');
            return;
        }
        setIsEditing(true);
        const images = typeof GalleryPost.images === 'string' 
          ? JSON.parse(GalleryPost.images) 
          : (GalleryPost.images || []);
        setEditedPost({ ...GalleryPost, images: images });
    };

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length + editedPost.images.length > 10) {
            alert('Maximum 10 images per gallery');
            return;
        }

        const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024);
        if (invalidFiles.length > 0) {
            alert('Some files exceed 5MB limit. Please choose smaller images.');
            return;
        }

        setNewImages(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setNewImagePreviews(previews);
    };

    const removeExistingImage = (imageUrl) => {
        const updatedImages = editedPost.images.filter(img => img !== imageUrl);
        setEditedPost({ ...editedPost, images: updatedImages });
    };

    const removeNewImage = (index) => {
        const updatedFiles = newImages.filter((_, i) => i !== index);
        const updatedPreviews = newImagePreviews.filter((_, i) => i !== index);
        URL.revokeObjectURL(newImagePreviews[index]);
        setNewImages(updatedFiles);
        setNewImagePreviews(updatedPreviews);
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('title', editedPost.title);
            formData.append('description', editedPost.description);
            formData.append('existingImages', JSON.stringify(editedPost.images));
            
            newImages.forEach(file => {
                formData.append('images', file);
            });

            const response = await axios.put(
              `${API_URL}/api/gallery/${GalleryPost.id}`, 
              formData,
              { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            
            onUpdate(response.data.data);
            setIsEditing(false);
            
            newImagePreviews.forEach(preview => URL.revokeObjectURL(preview));
            setNewImages([]);
            setNewImagePreviews([]);
            
            alert('✅ Gallery post updated successfully!');
        } catch (error) {
            console.error('Error updating data:', error);
            alert('❌ Error updating gallery: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedPost({ ...GalleryPost });
        newImagePreviews.forEach(preview => URL.revokeObjectURL(preview));
        setNewImages([]);
        setNewImagePreviews([]);
    };

    const handleInputChange = (e) => {
        setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
    };

    const galleryImages = typeof GalleryPost.images === 'string' 
      ? JSON.parse(GalleryPost.images) 
      : (GalleryPost.images || []);

    return (
        <div className="Gallery-details" style={{ marginTop: "10px", border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fff' }}>
            {isEditing ? (
                // EDIT MODE
                <>
                    <h4>
                        <span role="img" aria-label="edit">✏️</span> Edit Gallery Post
                    </h4>
                    <hr />
                    
                    <div className="mb-3">
                        <label className="form-label fw-bold">Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={editedPost.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label fw-bold">Description:</label>
                        <textarea
                            className="form-control"
                            name="description"
                            rows="3"
                            value={editedPost.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    {editedPost.images && editedPost.images.length > 0 && (
                        <div className="mb-3">
                            <label className="form-label fw-bold">
                                <span role="img" aria-label="images">🖼️</span> Current Images ({editedPost.images.length}):
                            </label>
                            <div className="row mt-2">
                                {editedPost.images.map((imageUrl, index) => (
                                    <div key={index} className="col-md-3 col-sm-4 col-6 mb-2 position-relative">
                                        <img 
                                            src={`${API_URL}${imageUrl}`} 
                                            alt={`Gallery ${index + 1}`} 
                                            className="img-fluid rounded"
                                            style={{ height: '100px', objectFit: 'cover', width: '100%' }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                                            onClick={() => removeExistingImage(imageUrl)}
                                            style={{ borderRadius: '50%' }}
                                            title="Remove image"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            <span role="img" aria-label="camera">📷</span> Add New Images:
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            multiple
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                            onChange={handleImageSelect}
                        />
                        <small className="text-muted">You can add more images (max 10 total). Max 5MB each.</small>
                    </div>

                    {newImagePreviews.length > 0 && (
                        <div className="mb-3">
                            <label className="form-label fw-bold">
                                <span role="img" aria-label="new">🆕</span> New Images Preview ({newImagePreviews.length}):
                            </label>
                            <div className="row">
                                {newImagePreviews.map((preview, index) => (
                                    <div key={index} className="col-md-3 col-sm-4 col-6 mb-2 position-relative">
                                        <img 
                                            src={preview} 
                                            alt={`New ${index + 1}`} 
                                            className="img-fluid rounded"
                                            style={{ height: '100px', objectFit: 'cover', width: '100%' }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                                            onClick={() => removeNewImage(index)}
                                            style={{ borderRadius: '50%' }}
                                            title="Remove image"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="mt-3">
                        <button className="btn btn-primary me-2" onClick={handleSave}>
                            <span role="img" aria-label="save">💾</span> Save Changes
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancel}>
                            <span role="img" aria-label="cancel">❌</span> Cancel
                        </button>
                    </div>
                </>
            ) : (
                // VIEW MODE
                <>
                    <h4>
                        <strong>
                            <span role="img" aria-label="title">📷</span> Title: 
                        </strong> {GalleryPost.title}
                    </h4>
                    
                    <p>
                        <strong>
                            <span role="img" aria-label="description">📝</span> Description: 
                        </strong> {GalleryPost.description || 'No description provided'}
                    </p>
                    
                    {galleryImages.length > 0 && (
                        <div className="mb-3">
                            <strong>
                                <span role="img" aria-label="images">🖼️</span> Images ({galleryImages.length}):
                            </strong>
                            <div className="row mt-2">
                                {galleryImages.map((imageUrl, index) => (
                                    <div key={index} className="col-md-3 col-sm-4 col-6 mb-2">
                                        <img 
                                            src={`${API_URL}${imageUrl}`} 
                                            alt={`Gallery ${index + 1}`} 
                                            style={{ maxWidth: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
                                            className="img-fluid"
                                            onClick={() => window.open(`${API_URL}${imageUrl}`, '_blank')}
                                            title="Click to view full size"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* LINE 627 - FIXED */}
                    <p>
                        <small>
                            <span role="img" aria-label="calendar">📅</span> Created: {new Date(GalleryPost.created_at).toLocaleString()}
                            {GalleryPost.updated_at && GalleryPost.updated_at !== GalleryPost.created_at && 
                                ` | <span role="img" aria-label="edit">✏️</span> Updated: ${new Date(GalleryPost.updated_at).toLocaleString()}`
                            }
                        </small>
                    </p>
                    
                    <div className="mt-3">
                        {hasPermission('delete') && (
                            /* LINE 605 - FIXED */
                            <button className="btn btn-danger me-2" onClick={handleClick}>
                                <span role="img" aria-label="delete">🗑️</span> Delete Gallery
                            </button>
                        )}
                        
                        {hasPermission('edit') && (
                            <button className="btn btn-secondary" onClick={handleEdit}>
                                <span role="img" aria-label="edit">✏️</span> Edit Gallery
                            </button>
                        )}
                        
                        {!hasPermission('edit') && !hasPermission('delete') && (
                            <small className="text-muted">
                                <span role="img" aria-label="info">ℹ️</span> You have view-only access. Contact admin for edit/delete permissions.
                            </small>
                        )}
                    </div>
                    <hr />
                </>
            )}
        </div>
    );
}

export default GalleryDetails;