import { useEffect, useState } from "react";

import ActivityCard from "./components/ActivityCard";
import Filters from "./components/Filters";
import GoalSetting from "./components/GoalSetting";
import { useNavigate } from "react-router-dom";
import SearchInput from "./components/Search";
import GoalCalendar from "./components/GoalCalendar";
import { useActivities } from "./hooks/useActivities";

const App = () => {

  const { fetchActivities, activities, deleteActivity } = useActivities();

  const [filteredActivities, setFilteredActivities] = useState<any[]>([]);
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);
  const [goalUpdated, setGoalUpdated] = useState(false);
  const [filterMessage, setFilterMessage] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleGoalUpdate = () => {
    setGoalUpdated(prev => !prev);
    fetchActivities();
  };


  const handleDeleteActivity = (id: string) => {
    deleteActivity(id);
  };

  const handleFilterChange = ({ activityType, date }: any) => {

    const filtered = activities.filter((activity: any) => {
      return (
        (!activityType || activity.activityType === activityType) &&
        (!date || new Date(activity.date).toLocaleDateString() === new Date(date).toLocaleDateString())
      );
    });


    setFilteredActivities(filtered);
    setFiltersApplied(true);

    if (filtered.length === 0) {
      setFilterMessage('No activities found. Please clear filters and try again.');
    }
  };

  const handleClearFilters = () => {
    setFilteredActivities(activities);
    setFiltersApplied(false);
    setFilterMessage("")
  };

  const handleActivityClick = (activity: any) => {
    navigate(`/activity/${activity._id}`);
  };

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = activities.filter((activity) => {
      return (
        activity.title.toLowerCase().includes(lowerCaseQuery) ||
        activity.description.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setFilteredActivities(filtered);
  };

  return (
    <div className="dashboard">
      <h1>My activities</h1>
      <SearchInput onSearch={handleSearch} />
      <Filters onFilterChange={handleFilterChange} handleClearFilters={handleClearFilters} filtersApplied={filtersApplied} filterMessage={filterMessage} />

      <div className="activity-list">
        {(filteredActivities.length ? filteredActivities : activities).map((activity: any) => (
          <ActivityCard
            key={activity._id}
            activity={activity}
            onEdit={() => { handleActivityClick(activity) }}
            onDelete={handleDeleteActivity}
          />
        ))}

      </div>
      <GoalSetting onUpdate={handleGoalUpdate} />
      <GoalCalendar activities={activities} refreshTrigger={goalUpdated} />
    </div>
  );
};

export default App;
