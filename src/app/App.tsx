import './App.css';
import ScheduleEditMenu from './components/ScheduleEditMenu';

import LineEditor from './components/LineEditor';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const App = () => {
  const currentSchedule = useSelector(
    (state: RootState) => state.schedules.schedule
  );

  return (
    <div className="app">
      <ScheduleEditMenu schedule={currentSchedule} />
      <LineEditor />
    </div>
  );
};

export default App;
