import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ConversionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export function ConversionCard({ title, description, icon, href }: ConversionCardProps) {
  return (
    <Card className="interactive-card group cursor-pointer border hover:shadow-card transition-all duration-200">
      <a href={href} className="block h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/5 rounded-lg">
              {icon}
            </div>
            <CardTitle className="text-lg font-medium text-card-foreground">
              {title}
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button 
            variant="outline" 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
            size="sm"
          >
            Open Tool
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </a>
    </Card>
  );
}