import { FC, useState } from 'react';
import NumberSelector from './NumberSelector';
import MonthSelector from './MonthSelector';
import CronSchedule from '../cron-schedule';
import WeekDaySelector from './WeekDaySelector';
import { modifyAction } from '../../redux/schedules';
import { useDispatch } from 'react-redux';

const ScheduleEditMenu: FC<{
  schedule: CronSchedule;
}> = ({ schedule }) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState<string>();
  return (
    <div className="container editMenu">
      <ul className="schedule-menu">
        <li className="edit-item">
          <NumberSelector
            minValue={0}
            maxValue={60}
            title="Minutes"
            schedule={schedule}
            target="minute"
          />
        </li>
        <li className="edit-item">
          <NumberSelector
            minValue={0}
            maxValue={24}
            title="Hours"
            schedule={schedule}
            target="hour"
          />
        </li>
        <li className="edit-item">
          <NumberSelector
            minValue={0}
            maxValue={31}
            title="Day of month"
            schedule={schedule}
            target="day"
          />
        </li>
        <li className="edit-item">
          <MonthSelector schedule={schedule} />
        </li>
        <li className="edit-item">
          <WeekDaySelector schedule={schedule} />
        </li>
        <li>
          <input
            type="text"
            className="action-data"
            defaultValue={action}
            value={schedule.action}
            onChange={e => {
              const value = e.currentTarget.value;
              setAction(value);
              dispatch(
                modifyAction({
                  value
                })
              );
            }}
          ></input>
        </li>
      </ul>
    </div>
  );
};

export default ScheduleEditMenu;
