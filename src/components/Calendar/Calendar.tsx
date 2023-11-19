import React, { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentDate(dayjs());
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateCalendar", "DateCalendar"]}>
        <DemoItem label="Calendar">
          <DateCalendar defaultValue={currentDate} readOnly />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Calendar;
