import {
  useToast as useToastGluestack,
  VStack,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import { TToast } from "../types";

export const useToast = () => {
  const toast = useToastGluestack();

  const showToast = ({
    title,
    message,
    position = "top",
    duration = 3000,
    action,
    variant = "accent",
  }: TToast) => {
    toast.show({
      placement: position,
      duration: duration,
      render: ({ id }) => {
        return (
          <Toast
            nativeID={`toast-${id}`}
            action={action}
            variant={variant}
            bgColor="$white"
          >
            <VStack space="xs">
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{message}</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  return {
    showToast,
  };
};
