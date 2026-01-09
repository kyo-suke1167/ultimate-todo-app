// src/components/molecules/AddTodoInput.tsx

import { Flex, Input, Textarea, Box, Grid, GridItem, FormLabel, FormControl } from "@chakra-ui/react"
import { PrimaryButton } from "../atoms/button/PrimaryButton"
import { PrimaryInput } from "../atoms/input/PrimaryInput"
import type { ChangeEvent } from "react"

type Props = {
  inputValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  deadlineValue: string;
  onDeadlineChange: (e: ChangeEvent<HTMLInputElement>) => void;
  detailValue: string;
  onDetailChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: () => void;
  disabled?: boolean;
}

export const AddTodoInput = (props: Props) => {
  const { 
    inputValue, onChange, 
    deadlineValue, onDeadlineChange, 
    detailValue, onDetailChange, 
    onClick, disabled = false 
  } = props;

  return (
    // 🦁 全体をカード化するお（白背景＋影＋角丸）
    <Box bg="white" p={6} borderRadius="lg" shadow="md" w="100%" borderWidth="1px" borderColor="gray.100">
      
      {/* グリッドレイアウト：スマホだと1列、PCだと2列になる魔法の指定 */}
      <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap={4} mb={4}>
        
        {/* 左側：タイトル入力 */}
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

        {/* 右側：日付入力 */}
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
              borderColor="transparent" // 枠線を消してスッキリ
              _focus={{ borderColor: "teal.400", bg: "white" }}
            />
          </FormControl>
        </GridItem>

      </Grid>

      {/* 下段：詳細入力エリア */}
      <FormControl mb={4}>
        <FormLabel fontSize="sm" color="gray.500" fontWeight="bold">詳細メモ (任意)</FormLabel>
        <Textarea 
          placeholder="ここに詳細を入力..."
          value={detailValue}
          onChange={onDetailChange}
          bg="gray.50"
          borderRadius="md"
          minH="80px" // 最低限の高さを確保
          resize="vertical"
          borderColor="transparent"
          _focus={{ borderColor: "teal.400", bg: "white" }}
        />
      </FormControl>

      {/* 最下部：追加ボタン（右寄せ） */}
      <Flex justify="flex-end">
        <Box w={{ base: "100%", md: "200px" }}> {/* スマホなら全幅、PCなら200px */}
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