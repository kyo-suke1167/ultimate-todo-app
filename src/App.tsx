// src/App.tsx
import { useState } from "react"
import { AddTodoInput } from "./components/molecules/AddTodoInput"
import { SearchInput } from "./components/molecules/SearchInput"
import { TodoList } from "./components/organisms/todo/TodoList"
import { Flex, Box, Heading, useDisclosure, Button, ButtonGroup } from "@chakra-ui/react"
import { EditTodoModal } from "./components/organisms/todo/EditTodoModal"
import { useTodo } from "./hooks/useTodo"
import { type Todo } from "./types/todo"

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState("");
  const [detailValue, setDetailValue] = useState("");
  const [priorityValue, setPriorityValue] = useState<Todo["priority"]>("low");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  
  const { 
    addTodo, 
    deleteTodo, 
    updateTodoStatus, 
    searchKeyword, 
    setSearchKeyword, 
    sortOrder, 
    setSortOrder, 
    filteredTodoList, 
    updateTodoContent
  } = useTodo();

  const handleAdd = () => {
    if (inputValue === "") return;
    addTodo(inputValue, deadlineValue, detailValue, priorityValue);
    
    setInputValue("");
    setDeadlineValue("");
    setDetailValue("");
    setPriorityValue("low");
  };

  const handleEditClick = (todo: Todo) => {
    setSelectedTodo(todo);
    onOpen();
  };

  const handleUpdate = (id: string, title: string, detail: string, deadline: string) => {
    updateTodoContent(id, title, detail, deadline);
  };

  // 🦁 ここの return ひとつだけでOKだお！
  return (
    <Box p={10} maxW="800px" mx="auto">
      <Heading mb={8} textAlign="center">Ultimate ToDo App</Heading>
      
      {/* 検索とソートの並びを綺麗に統合したお */}
      <Flex gap={4} mb={8} align="flex-end">
        <Box flex={1}>
          <SearchInput 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </Box>
        
        <ButtonGroup isAttached variant="outline" size="md" bg="white" borderRadius="md">
          <Button 
            onClick={() => setSortOrder("createdAt")}
            colorScheme={sortOrder === "createdAt" ? "teal" : "gray"}
            variant={sortOrder === "createdAt" ? "solid" : "outline"}
          >
            作成順
          </Button>
          <Button 
            onClick={() => setSortOrder("deadline")}
            colorScheme={sortOrder === "deadline" ? "teal" : "gray"}
            variant={sortOrder === "deadline" ? "solid" : "outline"}
          >
            期限順
          </Button>
        </ButtonGroup>
      </Flex>

      <AddTodoInput
        inputValue={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        deadlineValue={deadlineValue}
        onDeadlineChange={(e) => setDeadlineValue(e.target.value)}
        detailValue={detailValue}
        onDetailChange={(e) => setDetailValue(e.target.value)}
        priorityValue={priorityValue}
        onPriorityChange={(e) => setPriorityValue(e.target.value as Todo["priority"])}
        onClick={handleAdd}
      />

      <TodoList 
        todoList={filteredTodoList} 
        onDelete={(id) => deleteTodo(id)}
        onUpdateStatus={(id, newStatus) => updateTodoStatus(id, newStatus)}
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