import React from 'react';
import { isSameDay, isSameMonth, isToday, format, isWeekend } from 'date-fns';
import { useReservationContext} from './reservationcontext';

type Props = {
  date: Date;
};

const CalendarCell: React.FunctionComponent<Props> = ({ date }) => {
  const { reservations, currentMonth, selectedDate, setSelectedDate } = useReservationContext();

  if (!currentMonth || !setSelectedDate || !reservations) return null;

  const thisDate = date;

  let classes = 'calendar-cell';
  let isHoliday : boolean = false;

  if (selectedDate && isSameDay(date, selectedDate)) {
    classes += ' calendar-cell--selected';
  }

  if (isToday(date)) {
    classes += ' calendar-cell--today';
  }

  if (!isSameMonth(date, currentMonth)) {
    classes += ' calendar-cell--disabled';
  }

  if(isWeekend(date) || isHoliday ){
    classes += ' calendar-cell--holiday';
  }
  let dailytotalhours : number = 0;

  return (
    <div
      className={classes}
      onClick={() => isSameMonth(thisDate, currentMonth) && setSelectedDate(thisDate)}
      data-testid="calendar-cell"
    >
      <div className="calendar-cell__date">
        <div className="calendar-cell-date">{format(date, 'd')}</div>
      </div>
    </div>
  );
};

export default CalendarCell;