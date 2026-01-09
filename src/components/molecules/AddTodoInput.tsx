// src/components/molecules/AddTodoInput.tsx

import { Flex, Input, Textarea, Box, Grid, GridItem, FormLabel, FormControl, Select } from "@chakra-ui/react"
import { PrimaryButton } from "../atoms/button/PrimaryButton"
import { PrimaryInput } from "../atoms/input/PrimaryInput"
import { type Todo } from "../../types/todo" // 型をインポート
import type { ChangeEvent } from "react"

type Props = {
  inputValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  deadlineValue: string;
  onDeadlineChange: (e: ChangeEvent<HTMLInputElement>) => void;
  detailValue: string;
  onDetailChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  
  // 🦁 追加：優先度のためのプロパティだお！
  priorityValue: Todo["priority"];
  onPriorityChange: (e: ChangeEvent<HTMLSelectElement>) => void;

  onClick: () => void;
  disabled?: boolean;
}

export const AddTodoInput = (props: Props) => {
  const { 
    inputValue, onChange, 
    deadlineValue, onDeadlineChange, 
    detailValue, onDetailChange, 
    priorityValue, onPriorityChange, // 👈 追加
    onClick, disabled = false 
  } = props;

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="md" w="100%" borderWidth="1px" borderColor="gray.100">
      
      {/* 🦁 グリッドを3列（タイトル・期限・優先度）に調整したお！ */}
      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr 1fr" }} gap={4} mb={4}>
        
        {/* タイトル入力 */}
        <GridItem>
          <FormControl>
            <FormLabel fontSize="sm" color="gray.500" fontWeight="bold">タイトル</FormLabel>
            <PrimaryInput 
              placeholder="例：週末の買い物" 
              value={inputValue} 
              onChange={onChange} 
            />
          </FormControl>
        </GridItem>

        {/* 期限日入力 */}
        <GridItem>
          <FormControl>
            <FormLabel fontSize="sm" color="gray.500" fontWeight="bold">期限日</FormLabel>
            <Input 
              type="date" 
              bg="gray.50"
              borderRadius="md"
              cursor="pointer"
              value={deadlineValue}
              onChange={onDeadlineChange}
              borderColor="transparent"
              _focus={{ borderColor: "teal.400", bg: "white" }}
            />
          </FormControl>
        </GridItem>

        {/* 🦁 追加：優先度選択だお！ */}
        <GridItem>
          <FormControl>
            <FormLabel fontSize="sm" color="gray.500" fontWeight="bold">優先度</FormLabel>
            <Select 
              value={priorityValue} 
              onChange={onPriorityChange}
              bg="gray.50"
              borderRadius="md"
              cursor="pointer"
              borderColor="transparent"
              _focus={{ borderColor: "teal.400", bg: "white" }}
            >
              <option value="low">🔵 低 (Low)</option>
              <option value="medium">🟡 中 (Medium)</option>
              <option value="high">🔴 高 (High)</option>
            </Select>
          </FormControl>
        </GridItem>

      </Grid>

      {/* 詳細入力エリア */}
      <FormControl mb={4}>
        <FormLabel fontSize="sm" color="gray.500" fontWeight="bold">詳細メモ (任意)</FormLabel>
        <Textarea 
          placeholder="ここに詳細を入力..."
          value={detailValue}
          onChange={onDetailChange}
          bg="gray.50"
          borderRadius="md"
          minH="80px"
          resize="vertical"
          borderColor="transparent"
          _focus={{ borderColor: "teal.400", bg: "white" }}
        />
      </FormControl>

      <Flex justify="flex-end">
        <Box w={{ base: "100%", md: "200px" }}>
           <PrimaryButton 
              onClick={onClick} 
              disabled={disabled || inputValue === ""}
           >
              タスクを追加する +
           </PrimaryButton>
        </Box>
      </Flex>

    </Box>
  )
}