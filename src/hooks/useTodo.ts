import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { todoListState, searchKeywordState, sortOrderState } from "../state/todoState";
import { type Todo } from "../types/todo";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";

export const useTodo = () => {
  const [todoList, setTodoList] = useAtom(todoListState);
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeywordState);
  const [sortOrder, setSortOrder] = useAtom(sortOrderState);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: true }); 

    if (error) {
      console.error("エラー...:", error);
      return;
    }

    if (data) {
      const formattedData: Todo[] = data.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.created_at),
        deadline: todo.deadline ? new Date(todo.deadline) : undefined,
      }));
      setTodoList(formattedData);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title: string, deadlineStr: string, detail: string, priority: Todo["priority"]) => {
    const id = uuidv4();
    const newTodo = {
      id,
      title,
      detail,
      status: "waiting",
      priority: priority,
      created_at: new Date().toISOString(),
      deadline: deadlineStr ? new Date(deadlineStr).toISOString() : null,
    };

    const { error } = await supabase.from("todos").insert([newTodo]);
    if (error) alert("保存に失敗...");
    else fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) alert("削除に失敗...");
    else fetchTodos();
  };

  const updateTodoStatus = async (id: string, newStatus: Todo["status"]) => {
    const { error } = await supabase
      .from("todos")
      .update({ status: newStatus })
      .eq("id", id);
    if (error) alert("更新に失敗...");
    else fetchTodos();
  };

  const updateTodoContent = async (id: string, newTitle: string, newDetail: string, newDeadlineStr: string) => {
    const { error } = await supabase
      .from("todos")
      .update({
        title: newTitle,
        detail: newDetail,
        deadline: newDeadlineStr ? new Date(newDeadlineStr).toISOString() : null,
      })
      .eq("id", id);
    if (error) alert("編集に失敗...");
    else fetchTodos();
  };

  const filteredTodoList = todoList.filter((todo) =>
    todo.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const sortedTodoList = [...filteredTodoList].sort((a, b) => {
    if (sortOrder === "deadline") {
      const dateA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const dateB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return dateA - dateB;
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  return {
    todoList,
    filteredTodoList:sortedTodoList,
    searchKeyword,
    sortOrder, 
    setSortOrder,
    setSearchKeyword,
    addTodo,
    deleteTodo,
    updateTodoStatus,
    updateTodoContent,
  };
};