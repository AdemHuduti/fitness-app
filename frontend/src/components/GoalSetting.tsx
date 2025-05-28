import './styles/GoalSettings.css';
import { useGoalSettings } from '../hooks/useGoalSettings';

export default function GoalSettings({ onUpdate }: { onUpdate: () => void }) {
    const {
        goalType,
        setGoalType,
        goalValue,
        setGoalValue,
        saveGoal,
    } = useGoalSettings();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await saveGoal();
        onUpdate();
    };

    return (
        <div className="goal-settings">
            <h2>Set Your Daily Goal</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="goal-type">Goal type</label>
                    <select value={goalType} onChange={(e) => setGoalType(e.target.value)}>
                        <option value="count">Activity Count</option>
                        <option value="duration">Activity Duration (minutes)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="goal-value">Goal Value</label>
                    <input
                        type="number"
                        value={goalValue ? goalValue : ''}
                        onChange={(e) => setGoalValue(Number(e.target.value))}
                    />
                </div>

                <button type="submit">Save Goal</button>
            </form>
        </div>
    );
}

