// src/components/molecules/SearchInput.tsx

import { Box } from "@chakra-ui/react"
import { PrimaryInput } from "../atoms/input/PrimaryInput"
import type { ChangeEvent } from "react"

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = (props: Props) => {
  const { value, onChange } = props;

  return (
    <Box w="100%" mb={4}>
      <PrimaryInput 
        placeholder="キーワードで検索（タイトル・ID）" 
        value={value} 
        onChange={onChange} 
      />
    </Box>
  )
}