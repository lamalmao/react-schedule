import { createSlice } from '@reduxjs/toolkit';
import CronSchedule, { IPeriod, ScheduleOption } from '../app/cron-schedule';

const initialPeriod: IPeriod = {
  minute: new ScheduleOption(30, 35),
  hour: new ScheduleOption(12),
  day: new ScheduleOption(0),
  month: new ScheduleOption(0),
  week: new ScheduleOption(1, 2)
};

interface IScheduleState {
  schedule: CronSchedule;
  value: string;
}

const initialSchedule = new CronSchedule(initialPeriod, 'Some Action');

const initialState: IScheduleState = {
  schedule: initialSchedule,
  value: ''
};

const scheduleSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    modifySchedule: (
      state,
      action: {
        payload: {
          target: keyof CronSchedule['_period'];
          position: 'from' | 'to';
          value: string;
        };
        type: String;
      }
    ) => {
      state.schedule.setParameter(
        action.payload.target,
        Number(action.payload.value),
        action.payload.position
      );
    },
    setSchedule: (
      state,
      action: {
        payload: {
          newSchedule: CronSchedule;
        };
        type: String;
      }
    ) => {
      state.schedule = action.payload.newSchedule;
    },
    modifyValue: (
      state,
      action: {
        payload: {
          value: string;
        };
        type: String;
      }
    ) => {
      state.value = action.payload.value;
    },
    modifyAction: (
      state,
      action: {
        payload: {
          value: string;
        };
        type: String;
      }
    ) => {
      state.schedule.action = action.payload.value;
    }
  }
});

export const { modifySchedule, setSchedule, modifyValue, modifyAction } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
