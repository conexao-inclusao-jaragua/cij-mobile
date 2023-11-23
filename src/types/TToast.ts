type TToast = {
  title: string;
  message: string;
  position:
    | "bottom"
    | "top"
    | "top right"
    | "top left"
    | "bottom left"
    | "bottom right"
    | undefined;
  duration: number;
  action: "error" | "warning" | "success" | "info" | "attention" | undefined;
  variant: "outline" | "solid" | "accent" | undefined;
};

export default TToast;
