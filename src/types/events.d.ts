export type TEvent = {
  startDate: string;
  endDate: string;
  id: string;
};

export type TAgendaData = Array<{
  [date: string]: TAgenda[];
}>;
