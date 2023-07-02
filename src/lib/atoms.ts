import { Store } from "@prisma/client";
import { atomWithStorage } from "jotai/utils";

export const selectedStoreAtom = atomWithStorage<Store | null>("store", null);
