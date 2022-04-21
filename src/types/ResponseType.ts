export type ResponseType<D = {}> = {
  fieldsErrors: string[];
  messages: string[];
  resultCode: number;
  data: D;
};
