import { useState } from "react";
import "./styles/ActivityForm.css";
import { useActivities } from "../hooks/useActivities";
import { useNavigate } from "react-router-dom";

const ActivityForm = () => {

    const navigate = useNavigate();

    const { addActivity, successMessage } = useActivities();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [activityType, setActivityType] = useState("run");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newActivity = {
            title,
            description,
            activityType,
            date,
            duration,

        };
        addActivity(newActivity);
    };

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="activity-form-container">
            <h2 className="form-title">Add New Activity</h2>
            <form onSubmit={handleSubmit} className="activity-form">
                <div className="form-group">
                    <label htmlFor="title">Activity Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter activity title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        placeholder="Enter activity description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="activityType">Activity Type</label>
                    <select
                        id="activityType"
                        value={activityType}
                        onChange={(e) => setActivityType(e.target.value)}

                    >
                        <option value="run">Run</option>
                        <option value="walk">Walk</option>
                        <option value="hike">Hike</option>
                        <option value="ride">Ride</option>
                        <option value="swim">Swim</option>
                        <option value="workout">Workout</option>
                        <option value="HIIT">HIIT</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Activity Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="duration">Duration (Minutes)</label>
                    <input
                        type="number"
                        id="duration"
                        placeholder="Duration in minutes"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>

                {successMessage && <p className="success-message">{successMessage}</p>}

                <button type="submit" className="submit-btn">
                    Save Activity
                </button>
                <button type="button" onClick={goBack} className="back-button">Back</button>
            </form>
        </div>
    );
};

export default ActivityForm;
