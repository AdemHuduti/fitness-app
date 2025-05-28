// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from '../axiosInstance';
// import "./styles/EditActivity.css"

// const EditActivity = () => {

//     const { id } = useParams();
//     const [activity, setActivity] = useState<any>(null);
//     const navigate = useNavigate(); 

//     useEffect(() => {
//         const fetchActivity = async () => {
//             try {
//                 const response = await api.get(`/activities/${id}`);
//                 console.log(response);
//                 setActivity(response.data);
//             } catch (error) {
//                 console.error("Error fetching activity:", error);
//             }
//         };
//         fetchActivity();
//     }, [id]);

//     const handleSave = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (activity) {
//             try {
//                 await api.put(`/activities/${id}`, activity);
//                 navigate("/");
//             } catch (error) {
//                 console.error("Error saving activity:", error);
//             }
//         }
//     };

//     if (!activity) {
//         return <p>Loading activity...</p>;
//     }

//     return (
//         <div className="edit-activity-container">
//             <h2>Edit Activity: {activity.title}</h2>
//             <form onSubmit={handleSave}>
//                 <div className="form-field">
//                     <label htmlFor="title">Title</label>
//                     <input
//                         type="text"
//                         value={activity.title}
//                         onChange={(e) => setActivity({ ...activity, title: e.target.value })}
//                         placeholder="Title"
//                     />
//                 </div>

//                 <div className="form-field">
//                     <label htmlFor="description">Description</label>
//                     <input
//                         type="text"
//                         value={activity.description}
//                         onChange={(e) => setActivity({ ...activity, description: e.target.value })}
//                         placeholder="Description"
//                     />
//                 </div>

//                 <div className="form-field">
//                     <label htmlFor="duration">Duration (minutes)</label>
//                     <input
//                         type="number"
//                         value={activity.duration}
//                         onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
//                         placeholder="Duration"
//                     />
//                 </div>

//                 <button type="submit" className="save-button-edit" >Save</button>
//             </form>
//         </div>
//     );
// };

// export default EditActivity;


// src/pages/EditActivity.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useActivity } from "../hooks/useActivity";
import "./styles/EditActivity.css";

const EditActivity = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { activity, setActivity, loading, saveActivity, message } = useActivity(id);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await saveActivity();
            // navigate("/");
        } catch (err) {
            console.error("Error saving activity:", err);
        }
    };

    const goBack =() => {
        navigate(-1);
    }

    if (loading || !activity) return <p>Loading activity...</p>;

    return (
        <div className="edit-activity-container">
            <h2>Edit Activity: {activity.title}</h2>
            <form onSubmit={handleSave}>
                <div className="form-field">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        value={activity.title}
                        onChange={(e) => setActivity({ ...activity, title: e.target.value })}
                        placeholder="Title"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        value={activity.description}
                        onChange={(e) => setActivity({ ...activity, description: e.target.value })}
                        placeholder="Description"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="duration">Duration (minutes)</label>
                    <input
                        type="number"
                        value={activity.duration}
                        onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
                        placeholder="Duration"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="activityType">Activity Type</label>
                    <select
                        id="activityType"
                        value={activity.activityType}
                        onChange={(e) => setActivity({ ...activity, activityType: e.target.value })}
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
                {
                    message && <p className="success-message">{message}</p>
                }
                <button type="submit" className="save-button-edit">Save</button>
                <button onClick={goBack} className="back-button">Back</button>
            </form>
        </div>
    );
};

export default EditActivity;
