import { atom } from "jotai";
import type { Todo } from "../types/todo"; 

export const todoListState = atom<Todo[]>([]);
export const searchKeywordState = atom<string>("");
export const sortOrderState = atom<"createdAt" | "deadline">("createdAt");