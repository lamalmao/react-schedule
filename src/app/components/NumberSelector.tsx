import { FC } from 'react';
import '../App.css';
import CronSchedule from '../cron-schedule';
import { useDispatch } from 'react-redux';
import { modifySchedule } from '../../redux/schedules';

const NumberSelector: FC<{
  title: string;
  minValue: number;
  maxValue: number;
  schedule: CronSchedule;
  target: keyof CronSchedule['_period'];
}> = props => {
  const dispatch = useDispatch();
  const { title, minValue, maxValue, schedule, target } = props;
  const id = (Math.random() * 1_000_000).toString();
  return (
    <div key={id}>
      <h2 className="data-title">{title}</h2>
      <input
        type="number"
        max={maxValue}
        min={minValue}
        defaultValue={schedule.values[target].from}
        placeholder="From"
        onChange={e => {
          dispatch(
            modifySchedule({
              target,
              position: 'from',
              value: e.currentTarget.value
            })
          );
        }}
      />
      <input
        type="number"
        max={maxValue}
        min={minValue}
        defaultValue={schedule.values[target].to}
        placeholder="To"
        onChange={e => {
          dispatch(
            modifySchedule({
              target,
              position: 'to',
              value: e.currentTarget.value
            })
          );
        }}
      />
    </div>
  );
};

export default NumberSelector;
