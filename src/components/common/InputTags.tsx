import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type InputTagsProps = React.ComponentProps<typeof Input> & {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

export const InputTags = ({
  value: inputValue,
  onChange,
  ...props
}: InputTagsProps) => {
  const [pendingDataPoint, setPendingDataPoint] = useState("");
  const value = inputValue || [];

  const addPendingDataPoint = () => {
    if (pendingDataPoint) {
      const newDataPoints = new Set([...value, pendingDataPoint]);
      onChange(Array.from(newDataPoints));
      setPendingDataPoint("");
    }
  };

  return (
    <>
      <div className="flex">
        <Input
          value={pendingDataPoint}
          onChange={(e) => setPendingDataPoint(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addPendingDataPoint();
            } else if (e.key === "," || e.key === " ") {
              e.preventDefault();
              addPendingDataPoint();
            }
          }}
          className="rounded-r-none"
          {...props}
        />
        <Button
          type="button"
          variant="secondary"
          className="rounded-l-none border border-l-0"
          onClick={addPendingDataPoint}
        >
          Add
        </Button>
      </div>
      {value.length > 0 && (
        <div className=" rounded-md min-h-[2.5rem] overflow-y-auto py-2 flex gap-2 flex-wrap items-center">
          {value.map((item, idx) => (
            <Badge key={idx} variant="secondary">
              {item}
              <button
                type="button"
                className="w-3 ml-2"
                onClick={() => {
                  onChange(value.filter((i) => i !== item));
                }}
              >
                <XIcon className="w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </>
  );
};
