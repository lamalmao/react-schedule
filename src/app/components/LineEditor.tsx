import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import { modifyValue, setSchedule } from '../../redux/schedules';
import CronSchedule from '../cron-schedule';

const LineEditor = () => {
  const state = useSelector((state: RootState) => state.schedules);
  const value = state.schedule.cronString;
  const [text, textChange] = useState<string>(value);
  const dispatch = useDispatch();
  let errorMessage = '';
  const schedule = useSelector((state: RootState) => state.schedules.schedule);

  return (
    <div className="container editor">
      <input
        type="text"
        placeholder="Type your CRON schedule"
        onChange={e => textChange(e.currentTarget.value)}
        defaultValue={state.value}
      />
      <div className="control">
        <input
          type="button"
          value={'Load'}
          onClick={() => {
            try {
              if (
                !/^((([1-5][0-9]?)|(60?))|(\*)|((([1-5][0-9]?)|(60?))-(([1-5][0-9]?)|(60?))))\s+(((([3-9])|(1[0-9]?)|(2[0-4]?))|(\*))|((([3-9])|(1[0-9]?)|(2[0-4]?))-(([3-9])|(1[0-9]?)|(2[0-4]?))))\s+((([3-9])|([1-2][0-9]?)|(3[0-1]?))|(\*)|((([3-9])|([1-2][0-9]?)|(3[0-1]?))-(([3-9])|([1-2][0-9]?)|(3[0-1]?))))\s+((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)|(([2-8])|(1[0-2]?))|(\*)|((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))|((([2-8])|(1[0-2]?))-(([2-8])|(1[0-2]?))))\s+((mon|tue|wed|thu|fri|sat|sun)|([1-7])|(\*)|((mon|tue|wed|thu|fri|sat|sun)-(mon|tue|wed|thu|fri|sat|sun))|(([1-7])-([1-7])))\s+([\w ]+)$/i.test(
                  text
                )
              ) {
                throw new Error('Specified string is not a cron string');
              }
              const newSchedule = CronSchedule.createFromString(text);
              dispatch(
                setSchedule({
                  newSchedule
                })
              );
              console.log(CronSchedule.createFromString(text));
            } catch (error) {
              alert(error as string);
            }
          }}
        />
        <input
          type="button"
          value="Save"
          onClick={() => {
            try {
              schedule.verify();
              const newText = state.schedule.cronString;
              textChange(newText);
              dispatch(
                modifyValue({
                  value: newText
                })
              );
            } catch (error) {
              alert(error);
            }
          }}
        />
        <span className="error-message">{errorMessage}</span>
      </div>
    </div>
  );
};

export default LineEditor;
