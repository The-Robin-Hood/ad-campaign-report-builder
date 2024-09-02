import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { cn } from "@/utils/cn";
import { GripVertical } from "lucide-react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;
interface MetricCardProps {
  id: number;
  index: number;
  title: string;
  icon: IconComponent;
  value: number;
  formatter: (value: number) => string;
  moveCard: (fromIndex: number, toIndex: number) => void;
  customization: boolean;
}

export default function MetricCard({
  id,
  index,
  title,
  icon: Icon,
  value,
  formatter,
  moveCard,
  customization,
}: MetricCardProps) {
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
  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: MetricCardProps) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));
  return (
    <Card
      ref={ref}
      className={cn(
        isDragging && "opacity-10",
        isOver && "border border-dashed border-white",
        customization && !isOver && "cursor-move animate-wiggle",
        "transition-all ease-in-out"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {customization && (
          <GripVertical className="h-4 w-4 text-white absolute right-2 top-2" />
        )}
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatter(value)}</div>
      </CardContent>
    </Card>
  );
}
