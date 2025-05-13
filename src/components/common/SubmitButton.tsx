"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = React.ComponentProps<typeof Button> & {
  render?: (pending: boolean) => React.ReactNode;
  label?: string;
  loadingLabel?: string;
};

const SubmitButton = ({
  label,
  loadingLabel,
  render,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={pending || props.disabled}>
      {render
        ? render(pending)
        : pending
          ? loadingLabel
            ? loadingLabel
            : "Submitting"
          : label
            ? label
            : "Submit"}
    </Button>
  );
};

export default SubmitButton;
