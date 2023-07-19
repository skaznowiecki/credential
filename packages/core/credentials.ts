export interface Credentials {
  id?: string;
  name: string;
  lastName: string;
  dni: string;
  plan: string;
  email: string;
  subscribeDate: Date;
  unsubscribeDate?: Date | null;
  createdAt?: Date;
}
