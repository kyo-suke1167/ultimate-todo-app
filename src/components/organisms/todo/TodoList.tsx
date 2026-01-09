// src/components/organisms/todo/TodoList.tsx

import {
  Box,
  Heading,
  VStack,
  Text,
  IconButton,
  Flex,
  Spacer,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack, 
  Tooltip
} from "@chakra-ui/react"; // HStackを追加
import { type Todo } from "../../../types/todo";
import { FaTrash, FaChevronDown, FaClock, FaCalendarAlt,FaPen } from "react-icons/fa"; // アイコン追加

type Props = {
  todoList: Todo[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, newStatus: Todo["status"]) => void;
  onEdit: (todo: Todo) => void;
};

// 🦁 便利関数：日付を「2026/01/09」みたいな文字にするやつ
const formatDate = (date: Date | undefined) => {
  if (!date) return "";
  // Date型じゃなくて文字列で保存されちゃってる場合の対策（念のため）
  const d = new Date(date);
  return d.toLocaleDateString("ja-JP");
};

export const TodoList = (props: Props) => {
  const { todoList, onDelete, onUpdateStatus, onEdit } = props;

  return (
    <VStack align="stretch" spacing={4} mt={8} w="100%">
      <Heading size="md">リスト ({todoList.length}件)</Heading>

      {todoList.map((todo) => (
        <Box
          key={todo.id}
          p={4}
          bg="white"
          shadow="sm"
          borderRadius="md"
          borderWidth="1px"
        >
          <Flex align="center">
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                {todo.title}
              </Text>

              {todo.detail && (
                <Text
                  fontSize="sm"
                  color="gray.600"
                  mt={1}
                  whiteSpace="pre-wrap"
                >
                  {todo.detail}
                </Text>
              )}

              {/* 🦁 情報エリア：作成日と期限日を表示 */}
              <HStack spacing={4} mt={1} fontSize="xs" color="gray.500">
                <Text>ID: {todo.id.slice(0, 4)}</Text>

                {/* 作成日 */}
                <Flex align="center" gap={1}>
                  <FaCalendarAlt />
                  <Text>作成: {formatDate(todo.createdAt)}</Text>
                </Flex>

                {/* 期限日（ある時だけ表示） */}
                {todo.deadline && (
                  <Flex
                    align="center"
                    gap={1}
                    color="red.500"
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

              <Flex gap={2}> {/* ボタンをまとめるためのFlex */}
                
                {/* ✏️ 編集ボタン */}
                <Tooltip label="編集" hasArrow>
                    <IconButton
                        aria-label="編集"
                        icon={<FaPen />}
                        size="sm"
                        variant="ghost"
                        colorScheme="teal"
                        onClick={() => onEdit(todo)} // クリックしたらそのTodoを渡すお！
                    />
                </Tooltip>
              
              <Menu>
                {/* ... (メニュー部分はそのまま) ... */}
                <MenuButton
                  as={Badge}
                  colorScheme={
                    todo.status === "waiting"
                      ? "red"
                      : todo.status === "working"
                      ? "orange"
                      : "green"
                  }
                  cursor="pointer"
                  px={3}
                  py={1}
                  borderRadius="full"
                  mr={4}
                >
                  <Flex align="center" gap={1}>
                    {todo.status === "waiting" && "未着手"}
                    {todo.status === "working" && "進行中"}
                    {todo.status === "completed" && "完了"}
                    <Box as={FaChevronDown} size="10px" />
                  </Flex>
                </MenuButton>

                <MenuList>
                  {/* ... (メニューアイテムはそのまま) ... */}
                  <MenuItem onClick={() => onUpdateStatus(todo.id, "waiting")}>
                    未着手
                  </MenuItem>
                  <MenuItem onClick={() => onUpdateStatus(todo.id, "working")}>
                    進行中
                  </MenuItem>
                  <MenuItem
                    onClick={() => onUpdateStatus(todo.id, "completed")}
                  >
                    完了
                  </MenuItem>
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
  );
};
