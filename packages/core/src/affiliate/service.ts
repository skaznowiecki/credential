import { createAuthAffiliate, deleteAuthAffiliate } from "../auth/repository";
import { makeid } from "../common/lib";
import {
  Affiliate,
  CreateAffiliateMessage,
  DeleteAffiliateMessage,
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

  await deleteAuthAffiliate(dni);
  await repository.destroy(dni);
};

export const list = async (): Promise<Affiliate[]> => {
  return repository.list();
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
