export const sortDeparturesByArrivalTime = (a: { schedule_arrival_time: string }, b: { schedule_arrival_time: string }) => {
  return (
    new Date(a.schedule_arrival_time).getTime() -
    new Date(b.schedule_arrival_time).getTime()
  );
};



