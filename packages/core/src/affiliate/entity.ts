export interface Affiliate {
  dni: string;
  name: string;
  lastName: string;
  plan: string;
  email: string;
  userId: string;
  createdAt: number;
}

export type CreateAffiliate = Omit<Affiliate, "createdAt">;

export type AffiliateMessageType = "create" | "delete";

export interface CreateAffiliateMessage
  extends Omit<Affiliate, "createdAt" | "userId"> {
  type: "create";
}
export interface DeleteAffiliateMessage extends Pick<Affiliate, "dni"> {
  type: "delete";
}


export interface ListAffiliate {
  items: Affiliate[];
  nextToken: null | string;
}