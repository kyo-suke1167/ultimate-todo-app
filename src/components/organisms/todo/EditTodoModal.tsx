// src/components/organisms/todo/EditTodoModal.tsx

import { 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Textarea, VStack 
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { type Todo } from "../../../types/todo"

type Props = {
  isOpen: boolean;    // 開いてるかどうか
  onClose: () => void; // 閉じる時の処理
  todo: Todo | null;  // 編集対象のToDoデータ（最初はnullかも）
  onUpdate: (id: string, title: string, detail: string, deadline: string) => void; // 更新ボタンを押した時の処理
}

export const EditTodoModal = (props: Props) => {
  const { isOpen, onClose, todo, onUpdate } = props;

  // モーダルの中で編集するための一時的なステート
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [deadline, setDeadline] = useState("");

  // 🦁 ポイント: モーダルが開いたり、対象のTodoが変わったら、初期値をセットするお！
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDetail(todo.detail || "");
      // Date型を "YYYY-MM-DD" 文字列に変換する処理だお
      setDeadline(todo.deadline ? new Date(todo.deadline).toISOString().split("T")[0] : "");
    }
  }, [todo, isOpen]);

  const handleUpdate = () => {
    if (!todo) return;
    onUpdate(todo.id, title, detail, deadline);
    onClose(); // 更新したら閉じる
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>TODOを編集</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>タイトル</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>期限</FormLabel>
              <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>詳細</FormLabel>
              <Textarea 
                value={detail} 
                onChange={(e) => setDetail(e.target.value)} 
                resize="vertical"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>キャンセル</Button>
          <Button colorScheme="teal" onClick={handleUpdate}>更新する</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}