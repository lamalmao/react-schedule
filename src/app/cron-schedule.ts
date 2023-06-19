interface IVocabulary {
  [key: string]: number;
}

export class ScheduleOption {
  public from: number;
  public to?: number;

  constructor(from: number, to?: number) {
    this.from = from;
    this.to = to;
  }

  public toString(): string {
    if (this.from === 0) {
      return '*';
    } else if (this.from && !this.to) {
      return this.from.toString();
    } else {
      return `${this.from}-${this.to}`;
    }
  }

  private static _createWeekOptionFromString(
    value: Readonly<string>
  ): ScheduleOption {
    if (/^(sun|tue|wed|thu|fri|sat|sun)$/i.test(value)) {
      return new ScheduleOption(ScheduleOption._weeks[value.toLowerCase()]);
    }

    const values =
      /^(sun|tue|wed|thu|fri|sat|sun)-(sun|tue|wed|thu|fri|sat|sun)$/i.exec(
        value
      );
    if (values) {
      const from = ScheduleOption._weeks[values[1].toLowerCase()];
      const to = ScheduleOption._weeks[values[2].toLowerCase()];

      if (from === to) {
        return new ScheduleOption(from);
      } else {
        if (from > to) {
          throw new Error('Week days must be from smaller to bigger');
        }

        this._checkBorders(from, 'week');
        this._checkBorders(to, 'week');
        return new ScheduleOption(from, to);
      }
    } else {
      throw new Error('Invalid days of the week');
    }
  }

  private static _createMonthOptionFromString(
    value: Readonly<string>
  ): ScheduleOption {
    if (/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/i.test(value)) {
      return new ScheduleOption(ScheduleOption._months[value.toLowerCase()]);
    }

    const values =
      /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/i.exec(
        value
      );
    if (values) {
      const from = ScheduleOption._months[values[1].toLowerCase()];
      const to = ScheduleOption._months[values[2].toLowerCase()];

      if (from === to) {
        return new ScheduleOption(from);
      } else {
        if (from > to) {
          throw new Error('Months must be from smaller to bigger');
        }

        this._checkBorders(from, 'month');
        this._checkBorders(to, 'month');

        return new ScheduleOption(from, to);
      }
    } else {
      throw new Error('Invalid days of the month');
    }
  }

  public static getFromString(
    value: Readonly<string>,
    type: keyof CronSchedule['_period']
  ): ScheduleOption {
    if (/sun|tue|wed|thu|fri|sat|sun/i.test(value)) {
      return this._createWeekOptionFromString(value);
    }

    if (/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i.test(value)) {
      return this._createMonthOptionFromString(value);
    }

    if (!value.includes('-')) {
      const parsedNumber = value === '*' ? 0 : Number(value);
      if (!Number.isNaN(parsedNumber)) {
        this._checkBorders(parsedNumber, type);

        return new ScheduleOption(parsedNumber);
      } else {
        throw new Error('Unknown variant');
      }
    }

    const parsedValues = /(\d+)-(\d+)/i.exec(value);
    if (parsedValues) {
      const from = Number(parsedValues[1]);
      const to = Number(parsedValues[2]);

      if (from >= to) {
        throw new Error('Range must be from smaller to bigger value');
      }

      this._checkBorders(from, type);
      this._checkBorders(to, type);

      return new ScheduleOption(from, to);
    }

    throw new Error('Wrong cron parameter');
  }

  private static _checkBorders(
    value: number,
    type: keyof CronSchedule['_period']
  ) {
    switch (type) {
      case 'minute':
      case 'hour':
        if (value > 60) {
          throw new Error('Minutes and hours must be in range from 1 to 60');
        }
        break;
      case 'day':
        if (value > 31) {
          throw new Error('Days of month must be in range from 1 to 31');
        }
        break;
      case 'month':
        if (value > 12) {
          throw new Error('Month must be in range from 1 to 12');
        }
        break;
      case 'week':
        if (value > 7) {
          throw new Error('Week day must be in rage from 1 to 7');
        }
        break;
    }
  }

  private static _weeks: IVocabulary = {
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
    sun: 7
  };

  private static _months: IVocabulary = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12
  };
}

export interface IPeriod {
  minute: ScheduleOption;
  hour: ScheduleOption;
  day: ScheduleOption;
  month: ScheduleOption;
  week: ScheduleOption;
}

class CronSchedule {
  private _period: IPeriod;
  public readonly action: string;
  public readonly id: number;

  constructor(period: IPeriod, action: string) {
    this._period = period;
    this.action = action;
    this.id = Date.now();
  }

  public get cronString(): string {
    return Object.values(this._period)
      .map(value => value.toString())
      .join(' ')
      .concat(` ${this.action}`);
  }

  public static createFromString(target: Readonly<string>): CronSchedule {
    const values = target.split(/\s+/).map(value => value.trim());
    if (values.length < 6) {
      throw new Error('Not all parameters are specified');
    }

    return new CronSchedule(
      {
        minute: ScheduleOption.getFromString(values[0], 'minute'),
        hour: ScheduleOption.getFromString(values[1], 'hour'),
        day: ScheduleOption.getFromString(values[2], 'day'),
        month: ScheduleOption.getFromString(values[3], 'month'),
        week: ScheduleOption.getFromString(values[4], 'week')
      },
      values.slice(5, values.length).join(' ')
    );
  }

  public get values() {
    return {
      minute: {
        from: this._period.minute.from,
        to: this._period.minute.to || 0
      },
      hour: {
        from: this._period.hour.from,
        to: this._period.hour.to || 0
      },
      day: {
        from: this._period.day.from,
        to: this._period.day.to || 0
      },
      month: {
        from: this._period.month.from,
        to: this._period.month.to || 0
      },
      week: {
        from: this._period.week.from,
        to: this._period.week.to || 0
      }
    };
  }

  public setParameter(
    target: keyof CronSchedule['_period'],
    value: number,
    position: 'from' | 'to'
  ) {
    this._period[target][position] = value;
  }

  public verify(): void {
    if (
      Object.values(this._period).some(value => {
        const typedValue = value as ScheduleOption;
        return typedValue.to && typedValue.to <= typedValue.from;
      })
    ) {
      throw new Error('Wrong parameters sequence');
    }
  }
}

export default CronSchedule;
