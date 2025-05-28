
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";


interface ActivityCardProps {
    activity: any;
    onEdit: (activity: any) => void;
    onDelete: (id: string) => void;
}

const ActivityCard = ({ activity, onEdit, onDelete }: ActivityCardProps) => {

    return (
        <div className="activity-card">
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
            <p><strong>Type:</strong> {activity.activityType}</p>
            <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
            <p><strong>Duration:</strong> {activity.duration} minutes</p>
            <button className="edit-button" onClick={() => onEdit(activity)}><AiOutlineEdit /></button>
            <button className="delete-button" onClick={() => onDelete(activity._id)}><AiOutlineDelete /></button>
        </div>
    );
};

export default ActivityCard;
