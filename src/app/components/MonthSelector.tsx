import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { modifySchedule } from '../../redux/schedules';
import CronSchedule from '../cron-schedule';

const MonthSelector: FC<{
  schedule: CronSchedule;
}> = ({ schedule }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2 className="data-title">Month</h2>
      <select
        // value={fromValue}
        value={schedule.values.month.from}
        onChange={e => {
          const newValue = e.currentTarget.value;
          dispatch(
            modifySchedule({
              target: 'month',
              position: 'from',
              value: newValue
            })
          );
        }}
      >
        <option value="0">None</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <select
        value={schedule.values.month.to}
        onChange={e => {
          const newValue = e.currentTarget.value;
          dispatch(
            modifySchedule({
              target: 'month',
              position: 'to',
              value: newValue
            })
          );
        }}
      >
        <option value="0">None</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>
  );
};

export default MonthSelector;
