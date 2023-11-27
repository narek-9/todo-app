export type todo = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isExpired: boolean;
  createDate: string;
  endDate: string;
};

export enum todosSortValues {
  SORTED_BY = "Sorted By",
  TITLE = "title",
  DESCRIPTION = "description",
  CREATE_DATE = "createDate",
  END_DATE = "endDate",
}

export enum todosStatusValues {
  STATUS = "status",
  COMPLETED = "completed",
  INCOMPLETED = "incompleted",
  EXPIRED = "expired",
}
