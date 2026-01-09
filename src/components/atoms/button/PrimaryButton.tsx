// src/components/atoms/button/PrimaryButton.tsx

import { Button } from "@chakra-ui/react"
import type { ReactNode } from "react" // type を忘れずに！

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;   // こっちは「loading」の名前のままでOKだお
  onClick: () => void;
}

export const PrimaryButton = (props: Props) => {

  const { children, disabled = false, loading = false, onClick } = props;

  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      disabled={disabled || loading}     
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}