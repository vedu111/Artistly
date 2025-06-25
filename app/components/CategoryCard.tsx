import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

export default function CategoryCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="flex flex-col items-center p-6 hover:shadow-lg transition">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-500 text-center">{description}</p>
    </Card>
  );
}