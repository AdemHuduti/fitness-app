import { useMemo } from 'react';
import { useGoal } from '../hooks/useGoalCalendar';
import './styles/GoalCalendar.css';

const GoalCalendar = ({ activities, refreshTrigger }: { activities: any[], refreshTrigger: boolean }) => {
  const goal = useGoal(refreshTrigger);

  const getDayColor = useMemo(() => (date: string) => {
    const dayActivities = activities.filter((a) => a.date.startsWith(date));

    if (!goal) return '';

    if (goal.type === 'count') {
      return dayActivities.length >= goal.value ? 'green' : 'red';
    } else {
      const total = dayActivities.reduce((sum, a) => sum + Number(a.duration), 0);
      return total >= goal.value ? 'green' : 'red';
    }
  }, [activities, goal]);

  const daysThisMonth = Array.from({ length: 31 }, (_, i) => {
    const day = new Date();
    day.setDate(i + 1);
    const iso = day.toISOString().split('T')[0];
    return (
      <div key={i} className={`calendar-day ${getDayColor(iso)}`}>
        {i + 1}
      </div>
    );
  });

  return (
    <div className="goal-calendar">
      <h3>Goal Progress (Green = Met, Red = Not Met)</h3>
      <div className="calendar-grid">{daysThisMonth}</div>
    </div>
  );
};

export default GoalCalendar;
