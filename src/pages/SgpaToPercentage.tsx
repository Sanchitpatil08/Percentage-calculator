import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SgpaInput } from "@/components/SgpaInput";
import { ResultCard } from "@/components/ResultCard";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calculator } from "lucide-react";
import { convertSgpaToPercentage, calculateAverageSgpa, validateGpaInput } from "@/lib/formulas";
import { useToast } from "@/hooks/use-toast";

const SgpaToPercentage = () => {
  const [sgpaList, setSgpaList] = useState<number[]>([0]);
  const [errors, setErrors] = useState<(string | null)[]>([null]);
  const [result, setResult] = useState<{
    averageSgpa: number;
    percentage: number;
    formula: string;
    grade: string;
  } | null>(null);
  const { toast } = useToast();

  const handleSgpaChange = (index: number, value: string) => {
    const newSgpaList = [...sgpaList];
    const newErrors = [...errors];
    
    if (value === '') {
      newSgpaList[index] = 0;
      newErrors[index] = null;
    } else {
      const validation = validateGpaInput(value);
      if (validation.isValid && validation.numValue !== undefined) {
        newSgpaList[index] = validation.numValue;
        newErrors[index] = null;
      } else {
        newSgpaList[index] = parseFloat(value) || 0;
        newErrors[index] = validation.error || null;
      }
    }
    
    setSgpaList(newSgpaList);
    setErrors(newErrors);
  };

  const handleAddSgpa = () => {
    if (sgpaList.length < 4) {
      setSgpaList([...sgpaList, 0]);
      setErrors([...errors, null]);
    }
  };

  const handleRemoveSgpa = (index: number) => {
    if (sgpaList.length > 1) {
      const newSgpaList = sgpaList.filter((_, i) => i !== index);
      const newErrors = errors.filter((_, i) => i !== index);
      setSgpaList(newSgpaList);
      setErrors(newErrors);
    }
  };

  const handleCalculate = () => {
    const hasErrors = errors.some(error => error !== null);
    const hasEmptyValues = sgpaList.some(sgpa => sgpa === 0);
    
    if (hasErrors) {
      toast({
        title: "Invalid Input",
        description: "Please fix the errors before calculating.",
        variant: "destructive",
      });
      return;
    }

    if (hasEmptyValues) {
      toast({
        title: "Missing Values",
        description: "Please enter all SGPA values.",
        variant: "destructive",
      });
      return;
    }

    try {
      const validSgpaList = sgpaList.filter(sgpa => sgpa > 0);
      const averageSgpa = calculateAverageSgpa(validSgpaList);
      const conversionResult = convertSgpaToPercentage(averageSgpa);
      
      setResult({
        averageSgpa,
        percentage: conversionResult.percentage,
        formula: conversionResult.formula,
        grade: conversionResult.grade,
      });

      toast({
        title: "Calculation Complete",
        description: `Your percentage is ${conversionResult.percentage}%`,
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: error instanceof Error ? error.message : "An error occurred during calculation.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    if (result && navigator.share) {
      navigator.share({
        title: 'SGPA to Percentage Conversion',
        text: `My SGPA: ${result.averageSgpa} → Percentage: ${result.percentage}% (Grade: ${result.grade})`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="/">
                <ArrowLeft className="w-5 h-5" />
              </a>
            </Button>
            <div className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">
                SGPA to Percentage
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Convert SGPA to Percentage
          </h2>
          <p className="text-lg text-muted-foreground">
            Enter your SGPA values for up to 4 academic years. We'll calculate your average SGPA and convert it to percentage using official formulas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <SgpaInput
              sgpaList={sgpaList}
              onSgpaChange={handleSgpaChange}
              onAddSgpa={handleAddSgpa}
              onRemoveSgpa={handleRemoveSgpa}
              errors={errors}
              maxInputs={4}
            />

            <Card className="gradient-card border border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Calculation Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>1. Enter SGPA for each academic year (minimum 1, maximum 4)</p>
                <p>2. We calculate the average SGPA from all entered values</p>
                <p>3. Apply the appropriate conversion formula based on SGPA range</p>
                <p>4. Get your percentage with grade classification</p>
              </CardContent>
            </Card>

            <Button 
              onClick={handleCalculate} 
              className="w-full" 
              size="lg"
              disabled={sgpaList.some(sgpa => sgpa === 0) || errors.some(error => error !== null)}
            >
              <Calculator className="w-4 h-4" />
              Calculate Percentage
            </Button>
          </div>

          {/* Result Section */}
          <div>
            {result ? (
              <ResultCard
                title="Conversion Results"
                results={[
                  {
                    label: "Average SGPA",
                    value: result.averageSgpa,
                    description: `Based on ${sgpaList.filter(s => s > 0).length} year(s)`
                  },
                  {
                    label: "Percentage",
                    value: `${result.percentage}%`,
                    description: `Grade: ${result.grade}`
                  }
                ]}
                formula={result.formula}
                onShare={handleShare}
              />
            ) : (
              <Card className="h-fit gradient-card border-dashed border-muted-foreground/30">
                <CardContent className="p-8 text-center">
                  <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    Ready to Calculate
                  </h3>
                  <p className="text-muted-foreground">
                    Enter your SGPA values and click calculate to see your percentage conversion.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SgpaToPercentage;