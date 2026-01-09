// src/components/organisms/todo/TodoList.tsx

import { Box, Heading, VStack, Text, IconButton, Flex, Spacer, Badge, Menu, MenuButton, MenuList, MenuItem, HStack, Tooltip } from "@chakra-ui/react"
import { type Todo } from "../../../types/todo"
import { FaTrash, FaChevronDown, FaClock, FaCalendarAlt, FaPen } from "react-icons/fa"

type Props = {
  todoList: Todo[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, newStatus: Todo["status"]) => void;
  onEdit: (todo: Todo) => void;
}

const formatDate = (date: Date | undefined) => {
  if (!date) return "";
  const d = new Date(date); 
  return d.toLocaleDateString("ja-JP");
}

export const TodoList = (props: Props) => {
  const { todoList, onDelete, onUpdateStatus, onEdit } = props;

  return (
    <VStack align="stretch" spacing={4} mt={8} w="100%">
      <Heading size="md">リスト ({todoList.length}件)</Heading>
      
      {todoList.map((todo) => (
        <Box key={todo.id} p={4} bg="white" shadow="sm" borderRadius="md" borderWidth="1px">
          <Flex align="flex-start">
            <Box flex={1}>
              <HStack spacing={2} mb={1}>
                {/* 🦁 優先度バッジを追加だお！ */}
                <Badge 
                  variant="solid"
                  colorScheme={
                    todo.priority === "high" ? "red" :
                    todo.priority === "medium" ? "yellow" :
                    "blue"
                  }
                  fontSize="xs"
                >
                  {todo.priority === "high" && "🔥 高"}
                  {todo.priority === "medium" && "⚡ 中"}
                  {todo.priority === "low" && "☕ 低"}
                </Badge>
                <Text fontWeight="bold" fontSize="lg">{todo.title}</Text>
              </HStack>
              
              {todo.detail && (
                <Text fontSize="sm" color="gray.600" mt={1} mb={2} whiteSpace="pre-wrap">
                  {todo.detail}
                </Text>
              )}

              <HStack spacing={4} fontSize="xs" color="gray.500">
                <Text fontFamily="mono">ID: {todo.id.slice(0, 4)}</Text>
                
                <Flex align="center" gap={1}>
                   <FaCalendarAlt /> 
                   <Text>作成: {formatDate(todo.createdAt)}</Text>
                </Flex>

                {todo.deadline && (
                  <Flex 
                    align="center" 
                    gap={1} 
                    color={todo.status !== "completed" ? "red.500" : "gray.400"} 
                    fontWeight="bold"
                  >
                     <FaClock />
                     <Text>期限: {formatDate(todo.deadline)}</Text>
                  </Flex>
                )}
              </HStack>
            </Box>
            
            <Spacer />
            
            <VStack align="end" spacing={2}>
              <Flex gap={2}>
                <Tooltip label="編集" hasArrow>
                  <IconButton
                    aria-label="編集"
                    icon={<FaPen />}
                    size="sm"
                    variant="ghost"
                    colorScheme="teal"
                    onClick={() => onEdit(todo)}
                  />
                </Tooltip>

                <Menu>
                  <MenuButton 
                    as={Badge} 
                    colorScheme={
                      todo.status === "waiting" ? "red" :
                      todo.status === "working" ? "orange" :
                      "green"
                    }
                    cursor="pointer"
                    px={3} py={1} borderRadius="full"
                  >
                    <Flex align="center" gap={1}>
                      {todo.status === "waiting" && "未着手"}
                      {todo.status === "working" && "進行中"}
                      {todo.status === "completed" && "完了"}
                      <Box as={FaChevronDown} size="10px" />
                    </Flex>
                  </MenuButton>

                  <MenuList>
                    <MenuItem onClick={() => onUpdateStatus(todo.id, "waiting")}>🔴 未着手にする</MenuItem>
                    <MenuItem onClick={() => onUpdateStatus(todo.id, "working")}>🟠 進行中にする</MenuItem>
                    <MenuItem onClick={() => onUpdateStatus(todo.id, "completed")}>🟢 完了にする</MenuItem>
                  </MenuList>
                </Menu>

                <IconButton
                  aria-label="削除"
                  icon={<FaTrash />}
                  colorScheme="red"
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(todo.id)}
                />
              </Flex>
            </VStack>
          </Flex>
        </Box>
      ))}
    </VStack>
  )
}