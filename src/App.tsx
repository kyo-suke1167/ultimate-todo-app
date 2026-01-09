// src/App.tsx
import { useState } from "react"
import { AddTodoInput } from "./components/molecules/AddTodoInput"
import { SearchInput } from "./components/molecules/SearchInput" // 👈 追加
import { TodoList } from "./components/organisms/todo/TodoList"
import { Box, Heading, useDisclosure } from "@chakra-ui/react"
import { EditTodoModal } from "./components/organisms/todo/EditTodoModal"
import { useTodo } from "./hooks/useTodo"
import { type Todo } from "./types/todo"

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState("");
  const [detailValue, setDetailValue] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  
  // 👇 filteredTodoList と searchKeyword 関連を受け取るお
  const { 
    addTodo, 
    deleteTodo, 
    updateTodoStatus, 
    searchKeyword, 
    setSearchKeyword, 
    filteredTodoList, // これを表示に使うお！
    updateTodoContent
  } = useTodo();

  const handleAdd = () => {
    if (inputValue === "") return;
    addTodo(inputValue, deadlineValue, detailValue); 
    
    setInputValue("");
    setDeadlineValue("");
    setDetailValue("");
  };

  const handleEditClick = (todo: Todo) => {
    setSelectedTodo(todo); // 選択されたTodoを記憶
    onOpen();              // モーダルを開く！
  };

  const handleUpdate = (id: string, title: string, detail: string, deadline: string) => {
    updateTodoContent(id, title, detail, deadline);
    // モーダルはEditTodoModal側でonCloseしてくれるからここでは呼ばなくてOKだお
  };

  return (
    <Box p={10} maxW="600px" mx="auto">
      <Heading mb={8} textAlign="center">Ultimate ToDo App</Heading>
      
      {/* 👇 検索バーを追加だお！ */}
      <SearchInput 
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />

      <Box mb={8} /> {/* ちょっと隙間をあける */}

      {/* 👇 deadlineValue と onChange を渡すお！ */}
      <AddTodoInput
        inputValue={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        deadlineValue={deadlineValue}
        onDeadlineChange={(e) => setDeadlineValue(e.target.value)}
        detailValue={detailValue}
        onDetailChange={(e) => setDetailValue(e.target.value)}
        onClick={handleAdd}
      />

      <TodoList 
        todoList={filteredTodoList} 
        onDelete={(id) => deleteTodo(id)}
        onUpdateStatus={(id, newStatus) => updateTodoStatus(id, newStatus)}
        // 👇 編集ボタンの処理を渡す
        onEdit={handleEditClick}
      />

      <EditTodoModal 
        isOpen={isOpen} 
        onClose={onClose} 
        todo={selectedTodo} 
        onUpdate={handleUpdate}
      />
      
    </Box>
  )
}