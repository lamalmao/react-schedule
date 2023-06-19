import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { modifySchedule } from '../../redux/schedules';
import CronSchedule from '../cron-schedule';

const WeekDaySelector: FC<{
  schedule: CronSchedule;
}> = ({ schedule }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2 className="data-title">Day of week</h2>
      <select
        value={schedule.values.week.from}
        onChange={e => {
          const value = e.currentTarget.value;
          dispatch(
            modifySchedule({
              target: 'week',
              position: 'from',
              value
            })
          );
        }}
      >
        <option value="0">None</option>
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
        <option value="6">Saturday</option>
        <option value="7">Sunday</option>
      </select>
      <select
        value={schedule.values.week.to}
        onChange={e => {
          const value = e.currentTarget.value;
          dispatch(
            modifySchedule({
              target: 'week',
              position: 'to',
              value
            })
          );
        }}
      >
        <option value="0">None</option>
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
        <option value="6">Saturday</option>
        <option value="7">Sunday</option>
      </select>
    </div>
  );
};

export default WeekDaySelector;
