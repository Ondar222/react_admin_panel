import React from 'react';

interface Month {
  name: string;
  days: number;
  startDay: number;
}

const Calendar: React.FC = () => {
  const months: Month[] = [
    {
      name: 'Декабрь',
      days: 31,
      startDay: 4 // Пусть 5 - это код дня недели для первого дня месяца (0 - воскресенье, 1 - понедельник, и т.д.)
    },
    {
      name: 'Январь',
      days: 31,
      startDay: 0
    },
    // остальные месяцы
  ];

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <>
    </>
    // <Box display="flex" flexWrap="wrap" padding="4" gap="4">
    //   {months.map((month, index) => (
    //     <Box
    //       key={index}
    //       width="200px"
    //       minHeight="260px"
    //       border="1px solid gray"
    //       borderRadius="md"
    //       padding="2"
    //     >
    //       <Box textAlign="center" fontWeight="semibold">{month.name}</Box>
    //       <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" marginTop="4">
    //         {weekDays.map((day) => (
    //           <Box
    //             key={day}
    //             borderBottom="1px solid gray"
    //             padding="1"
    //             textAlign="center"
    //             fontWeight="medium"
    //           >
    //             {day}
    //           </Box>
    //         ))}
    //         {Array(month.startDay).fill('').map((_, emptyDayIndex) => (
    //           <Box key={emptyDayIndex} />
    //         ))}
    //         {Array(month.days).fill('').map((_, dayIndex) => (
    //           <Box
    //             key={dayIndex}
    //             borderBottom="1px solid gray"
    //             padding="1"
    //             textAlign="center"
    //             fontWeight="medium"
    //           >
    //             {dayIndex + 1}
    //           </Box>
    //         ))}
    //       </Box>
    //     </Box>
    //   ))}
    // </Box>
  );
};

export default Calendar;