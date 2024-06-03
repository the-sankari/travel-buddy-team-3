import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditActivity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8007/api/activities/${id}`)
      .then((response) => {
        setActivity(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while fetching the activity data.");
        setIsLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .put(`http://localhost:8007/api/activities/${id}`, activity)
      .then(() => {
        navigate("/activities");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while updating the activity.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!activity) {
    return <p>Activity data is not available.</p>;
  }

  return (
    <div>
      <form onSubmit={handleSave}>
        <h1>Edit Activity</h1>
        {error && <p className="error">{error}</p>}
        <div className="mb-2">
          <label htmlFor="dayOne">Day One</label>
          <textarea
            id="dayOne"
            name="dayOne"
            value={activity.dayOne}
            onChange={handleInputChange}
            placeholder="Enter additional details here..."
            rows="4"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="dayTwo">Day Two</label>
          <textarea
            id="dayTwo"
            name="dayTwo"
            value={activity.dayTwo}
            onChange={handleInputChange}
            placeholder="Enter additional details here..."
            rows="4"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="dayThree">Day Three</label>
          <textarea
            id="dayThree"
            name="dayThree"
            value={activity.dayThree}
            onChange={handleInputChange}
            placeholder="Enter additional details here..."
            rows="4"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="dayFour">Day Four</label>
          <textarea
            id="dayFour"
            name="dayFour"
            value={activity.dayFour}
            onChange={handleInputChange}
            placeholder="Enter additional details here..."
            rows="4"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="dayFive">Day Five</label>
          <textarea
            id="dayFive"
            name="dayFive"
            value={activity.dayFive}
            onChange={handleInputChange}
            placeholder="Enter additional details here..."
            rows="4"
            required
          />
        </div>
        <button
          className="btn btn-primary btn-sm mt-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditActivity;
