export interface Credentials {
  userId: string;
  name: string;
  surname: string;
  dni: string;
  subscribeDate: Date;
  unsubscribeDate: Date | null;
  createdAt: Date;
}
