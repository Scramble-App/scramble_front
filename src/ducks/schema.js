import {schema} from "normalizr";

export const company = new schema.Entity('companies')
export const swap = new schema.Entity('swaps', {
  sender: company,
  target: company
})