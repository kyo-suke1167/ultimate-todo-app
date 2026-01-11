import { Input } from "@chakra-ui/react"
import type { ChangeEvent } from "react"

type Props = {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PrimaryInput = (props: Props) => {
  const { placeholder = "", value, onChange } = props;

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      bg="gray.100"
      borderRadius="md"
      p={2} 
      outline="none"
      _focus={{ border: "2px solid teal" }}
    />
  )
}