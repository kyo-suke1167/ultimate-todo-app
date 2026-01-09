// src/hooks/useTodo.ts
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { todoListState, searchKeywordState } from "../state/todoState";
import { type Todo } from "../types/todo";
import { supabase } from "../lib/supabase"; // 👈 追加
import { useEffect } from "react";

export const useTodo = () => {
  const [todoList, setTodoList] = useAtom(todoListState);
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeywordState);

  // 📥 1. 初期データ取得 (DBから読み込む)
  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: true }); // 作成順に並べる

    if (error) {
      console.error("エラー...:", error);
      return;
    }

    if (data) {
      // DBから来たデータをDate型に変換してJotaiにセット
      const formattedData: Todo[] = data.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.created_at),
        deadline: todo.deadline ? new Date(todo.deadline) : undefined,
      }));
      setTodoList(formattedData);
    }
  };

  // 🏠 アプリ起動時に1回だけDBを見に行くお
  useEffect(() => {
    fetchTodos();
  }, []);

  // ➕ 2. 追加 (DBにインサート)
  const addTodo = async (title: string, deadlineStr: string, detail: string) => {
    const id = uuidv4();
    const newTodo = {
      id,
      title,
      detail,
      status: "waiting",
      priority: "low",
      created_at: new Date().toISOString(), // DBのカラム名に合わせる
      deadline: deadlineStr ? new Date(deadlineStr).toISOString() : null,
    };

    const { error } = await supabase.from("todos").insert([newTodo]);

    if (error) {
      alert("保存に失敗した...");
    } else {
      fetchTodos(); // 成功したら再取得して画面を更新！
    }
  };

  // 🗑️ 3. 削除 (DBから消す)
  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) alert("削除に失敗した...");
    else fetchTodos();
  };

  // 🔄 4. ステータス更新 (DBをアップデート)
  const updateTodoStatus = async (id: string, newStatus: Todo["status"]) => {
    const { error } = await supabase
      .from("todos")
      .update({ status: newStatus })
      .eq("id", id);
    if (error) alert("更新に失敗した...");
    else fetchTodos();
  };

  // ✏️ 5. 内容更新 (DBをアップデート)
  const updateTodoContent = async (id: string, newTitle: string, newDetail: string, newDeadlineStr: string) => {
    const { error } = await supabase
      .from("todos")
      .update({
        title: newTitle,
        detail: newDetail,
        deadline: newDeadlineStr ? new Date(newDeadlineStr).toISOString() : null,
      })
      .eq("id", id);
    if (error) alert("編集に失敗した...");
    else fetchTodos();
  };

  // 検索フィルタリング（これはメモリ上でやるから今まで通りでOK）
  const filteredTodoList = todoList.filter((todo) =>
    todo.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    todoList,
    filteredTodoList,
    searchKeyword,
    setSearchKeyword,
    addTodo,
    deleteTodo,
    updateTodoStatus,
    updateTodoContent,
  };
};