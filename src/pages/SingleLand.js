import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleLand.css";

const SingleLand = () => {
  const { id } = useParams();
  const [land, setLand] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchLand = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/lands/${id}`);
      setLand(res.data.land);
    } catch (error) {
      console.error("Error fetching land:", error);
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:1234/api/comments/${id}`);
      setComments(res.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchLand();
    fetchComments();
  }, [fetchLand, fetchComments]);

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;
    try {
      await axios.post(`http://localhost:1234/api/comments/${id}`, { text: comment });
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (!land) return <p>Loading...</p>;

  return (
    <div className="single-land-container">
      <h1>{land.titleNumber}</h1>
      <p><strong>Size:</strong> {land.size} acres</p>
      <p><strong>Location:</strong> {land.latitude}, {land.longitude}</p>
      <p><strong>Status:</strong> {land.status}</p>

      <div className="comments-section">
        <h2>Comments</h2>

        <div className="comments-list">
          {comments.map((c) => (
            <div key={c.id} className="comment">
              {c.text}
            </div>
          ))}
        </div>

        <div className="comment-input">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button onClick={handleCommentSubmit}>Post Comment</button>
        </div>
      </div>
    </div>
  );
};

export default SingleLand;
