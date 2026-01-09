import { Input } from "@chakra-ui/react"
import type { ChangeEvent } from "react" // イベントの型が必要だお！

type Props = {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // 入力した時の動き
}

export const PrimaryInput = (props: Props) => {
  const { placeholder = "", value, onChange } = props;

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      bg="gray.100"      // 背景は薄いグレー
      borderRadius="md"  // 角を少し丸める
      p={2}              // 内側の余白
      outline="none"     // 選択時の青枠を消す（お好みで）
      _focus={{ border: "2px solid teal" }} // 選択したら枠をティール色に！
    />
  )
}