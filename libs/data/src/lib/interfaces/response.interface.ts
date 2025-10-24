export interface Response<T> {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: T[];
}
