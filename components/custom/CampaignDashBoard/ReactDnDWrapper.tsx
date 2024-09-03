import { cn } from "@/utils/cn";
import { GripVertical } from "lucide-react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export default function ReactDnDWrapper({
  id,
  index,
  element,
  swapCard,
  customization,
  className,
}: {
  id: string;
  index: number;
  element: React.ReactNode;
  swapCard: (fromIndex: number, toIndex: number) => void;
  customization: boolean;
  className?: string;
}) {
  const ref = useRef(null);

  // Define drag behavior
  const [{ isDragging }, drag] = useDrag({
    canDrag: customization,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    type: "CARD",
    item: { id, index },
  });

  // Define drop behavior
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "CARD",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isAllowed: monitor.canDrop(),
      canDrop: monitor.canDrop(),
    }),
    canDrop(item, monitor) {
      return customization && item.id === id;
    },
    drop: (item: { id: string; index: number }) => {
      if (item.index !== index && item.id === id) {
        swapCard(item.index, index);
      }
    },
  });

  drag(drop(ref));
  return (
    <div
      ref={ref}
      className={cn(
        isDragging && "opacity-10",
        isOver &&
          (canDrop
            ? "border border-dashed border-white"
            : "border border-dashed border-red-500"),
        customization && !isOver && "cursor-move animate-wiggle",
        "transition-all ease-in-out h-full",
        className
      )}
    >
      {customization && (
        <GripVertical className="h-4 w-4 text-white absolute right-2 top-2" />
      )}
      {element}
    </div>
  );
}
