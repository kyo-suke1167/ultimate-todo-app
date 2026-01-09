// src/state/todoState.ts

import { atom } from "jotai";
import type { Todo } from "../types/todo"; // さっき作った型を使うお！

// 初期値は空っぽの配列 [] だお
// <Todo[]> と書くことで、「ここにはTodo型の配列しか入れちゃダメ！」と制限をかけるお
export const todoListState = atom<Todo[]>([]);
// 👇 追加：検索ワードの置き場所（最初は空文字）
export const searchKeywordState = atom<string>("");