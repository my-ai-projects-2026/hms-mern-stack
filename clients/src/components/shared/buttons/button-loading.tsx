import { Button } from "#/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { type ReactNode, forwardRef } from "react";

interface ButtonLoadingProps extends React.ComponentProps<typeof Button> {
  isLoading: boolean;
  textLoading?: string;
  icon?: ReactNode;
  text?: string;
}

const ButtonLoading = forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  ({ isLoading, textLoading, icon, text, disabled, children, ...props }, ref) => {
    return (
      <Button ref={ref} disabled={isLoading || disabled} {...props}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : icon ? (
          <span className="mr-2 flex items-center justify-center">{icon}</span>
        ) : null}
        {isLoading && textLoading ? textLoading : text}
        {children}
      </Button>
    );
  }
);
ButtonLoading.displayName = "ButtonLoading";

export default ButtonLoading;
