import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/ResultCard";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calculator } from "lucide-react";
import { convertSgpaToPercentage, convertCgpaToGrade, validateGpaInput } from "@/lib/formulas";
import { useToast } from "@/hooks/use-toast";

const CgpaToPercentage = () => {
  const [cgpa, setCgpa] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    cgpa: number;
    percentage: number;
    grade: string;
    gradeRange: string;
  } | null>(null);
  const { toast } = useToast();

  const handleCgpaChange = (value: string) => {
    setCgpa(value);
    
    if (value === '') {
      setError(null);
      return;
    }

    const validation = validateGpaInput(value);
    setError(validation.error || null);
  };

  const handleCalculate = () => {
    if (!cgpa || cgpa === '') {
      toast({
        title: "Missing Value",
        description: "Please enter your CGPA.",
        variant: "destructive",
      });
      return;
    }

    if (error) {
      toast({
        title: "Invalid Input",
        description: "Please fix the error before calculating.",
        variant: "destructive",
      });
      return;
    }

    try {
      const cgpaValue = parseFloat(cgpa);
      const conversionResult = convertSgpaToPercentage(cgpaValue);
      const gradeResult = convertCgpaToGrade(cgpaValue);
      
      setResult({
        cgpa: cgpaValue,
        percentage: conversionResult.percentage,
        grade: gradeResult.grade,
        gradeRange: gradeResult.range,
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
        title: 'CGPA to Percentage Conversion',
        text: `My CGPA: ${result.cgpa} → Percentage: ${result.percentage}% (Grade: ${result.grade})`,
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
              <Calculator className="w-6 h-6 text-secondary" />
              <h1 className="text-xl font-bold text-foreground">
                CGPA to Percentage
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Convert CGPA to Percentage
          </h2>
          <p className="text-lg text-muted-foreground">
            Enter your CGPA to get the equivalent percentage using official conversion formulas and grade classification.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="gradient-card border border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cgpa" className="text-lg font-semibold text-card-foreground">
                      Enter Your CGPA
                    </Label>
                    <Input
                      id="cgpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="Enter CGPA (0.00 - 10.00)"
                      value={cgpa}
                      onChange={(e) => handleCgpaChange(e.target.value)}
                      className={`text-lg h-12 focus-primary ${error ? 'border-destructive' : ''}`}
                    />
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>1. Enter your CGPA value (0.00 to 10.00)</p>
                <p>2. We identify the appropriate conversion formula based on your CGPA range</p>
                <p>3. Calculate the equivalent percentage using official formulas</p>
                <p>4. Display your grade classification according to academic standards</p>
              </CardContent>
            </Card>

            <Button 
              onClick={handleCalculate} 
              className="w-full" 
              size="lg"
              variant="secondary"
              disabled={!cgpa || error !== null}
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
                    label: "CGPA",
                    value: result.cgpa,
                    description: result.gradeRange
                  },
                  {
                    label: "Percentage",
                    value: `${result.percentage}%`,
                    description: `Grade: ${result.grade}`
                  }
                ]}
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
                    Enter your CGPA and click calculate to see your percentage conversion with grade classification.
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

export default CgpaToPercentage;