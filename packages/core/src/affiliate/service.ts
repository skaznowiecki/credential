import { createAuthAffiliate, deleteAuthAffiliate } from "../auth/repository";
import { makeid } from "../common/lib";
import {
  Affiliate,
  CreateAffiliateMessage,
  DeleteAffiliateMessage,
  ListAffiliate,
} from "./entity";
import { send } from "./queue";

import * as repository from "./repository";

export const createAsync = async (items: CreateAffiliateMessage[]) => {
  await Promise.all(items.map((i) => send(i)));
};

export const deleteAsync = async (items: DeleteAffiliateMessage[]) => {
  await Promise.all(items.map((i) => send(i)));
};

export const create = async (attrs: CreateAffiliateMessage) => {
  const userId = await createAuthAffiliate(attrs.email, attrs.name, makeid(10));
  await repository.store({ ...attrs, userId });
};

export const destroy = async (attrs: DeleteAffiliateMessage) => {
  const { dni } = attrs;
  const affiliate = await repository.get(dni);
  if (!affiliate) {
    throw new Error("Affiliate not found");
  }
  await deleteAuthAffiliate(affiliate.email);
  await repository.destroy(dni);
};

export const list = async (nextToken: null | string): Promise<ListAffiliate> => {
  return repository.list(nextToken);
};

export const get = async (dni: string): Promise<Affiliate> => {
  const affiliate = await repository.get(dni);
  if (!affiliate) {
    throw new Error("Affiliate not found");
  }

  return affiliate;
};

export const getByUserId = async (
  userId: string
): Promise<Affiliate | undefined> => {
  return repository.getByUserId(userId);
};
