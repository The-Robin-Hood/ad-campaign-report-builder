import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/card";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;
interface MetricCardProps {
  title: string;
  icon: IconComponent;
  value: number;
  formatter: (value: number) => string;
}

export default function MetricCard({
  title,
  icon: Icon,
  value,
  formatter,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatter(value)}</div>
      </CardContent>
    </Card>
  );
}
