import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SgpaInputProps {
  sgpaList: number[];
  onSgpaChange: (index: number, value: string) => void;
  onAddSgpa: () => void;
  onRemoveSgpa: (index: number) => void;
  errors: (string | null)[];
  maxInputs?: number;
}

export function SgpaInput({ 
  sgpaList, 
  onSgpaChange, 
  onAddSgpa, 
  onRemoveSgpa, 
  errors,
  maxInputs = 4
}: SgpaInputProps) {
  return (
    <Card className="gradient-card border border-border/50">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-card-foreground">
              Enter SGPA Values
            </h3>
            <span className="text-sm text-muted-foreground">
              {sgpaList.length}/{maxInputs} years
            </span>
          </div>
          
          <div className="grid gap-4">
            {sgpaList.map((sgpa, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <Label htmlFor={`sgpa-${index}`} className="text-sm font-medium text-card-foreground">
                    Year {index + 1} SGPA
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id={`sgpa-${index}`}
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="Enter SGPA (0.00 - 10.00)"
                      value={sgpa || ''}
                      onChange={(e) => onSgpaChange(index, e.target.value)}
                      className={`focus-primary ${errors[index] ? 'border-destructive' : ''}`}
                    />
                    {sgpaList.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => onRemoveSgpa(index)}
                        className="shrink-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {errors[index] && (
                    <p className="text-sm text-destructive mt-1">{errors[index]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {sgpaList.length < maxInputs && (
            <Button
              type="button"
              variant="outline"
              onClick={onAddSgpa}
              className="w-full border-dashed hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Year {sgpaList.length + 1}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}