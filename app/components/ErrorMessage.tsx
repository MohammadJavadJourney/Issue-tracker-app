import { Text } from "@radix-ui/themes";
import React, { Children, PropsWithChildren, ReactNode } from "react";

const errorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default errorMessage;
