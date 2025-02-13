import { create } from './create';
import { remove } from './delete';
import { getAll } from './getAll';
import { update } from './update';

export const transactionsService = {
    create,
    getAll,
    update,
    remove,
};
