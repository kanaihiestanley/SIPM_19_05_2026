import React, { useState } from 'react';  // Added useState import
import axios from 'axios';  // Added axios import
import API_URL from '../../config';

const BibleDetails = ({ BiblePost, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: BiblePost.title,
    description: BiblePost.description,
    bible_verse: BiblePost.bible_verse
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPost({
      title: BiblePost.title,
      description: BiblePost.description,
      bible_verse: BiblePost.bible_verse
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/biblePosts/${BiblePost.id}`, editedPost);
      onUpdate(response.data);
      setIsEditing(false);
      alert('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    }
  };

  const handleChange = (e) => {
    setEditedPost({
      ...editedPost,
      [e.target.name]: e.target.value
    });
  };

  if (isEditing) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <input
            type="text"
            className="form-control mb-2"
            name="title"
            value={editedPost.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            className="form-control mb-2"
            name="bible_verse"
            value={editedPost.bible_verse}
            onChange={handleChange}
            placeholder="Bible Verse"
          />
          <textarea
            className="form-control mb-2"
            name="description"
            value={editedPost.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
          />
          <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{BiblePost.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{BiblePost.bible_verse}</h6>
        <p className="card-text">{BiblePost.description}</p>
        <p className="card-text">
          <small className="text-muted">
            Created: {BiblePost.created_at ? new Date(BiblePost.created_at).toLocaleDateString() : 'Recently'}
          </small>
        </p>
        <button className="btn btn-warning btn-sm me-2" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(BiblePost.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BibleDetails;