import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SgpaInput } from "@/components/SgpaInput";
import { ResultCard } from "@/components/ResultCard";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Award } from "lucide-react";
import { calculateAverageSgpa, convertCgpaToGrade, convertSgpaToDegreeClass, validateGpaInput } from "@/lib/formulas";
import { useToast } from "@/hooks/use-toast";

const SgpaToCgpa = () => {
  const [sgpaList, setSgpaList] = useState<number[]>([0]);
  const [errors, setErrors] = useState<(string | null)[]>([null]);
  const [result, setResult] = useState<{
    cgpa: number;
    grade: string;
    gradeRange: string;
    degreeClass: string;
    degreeRange: string;
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
      const cgpa = calculateAverageSgpa(validSgpaList);
      const gradeResult = convertCgpaToGrade(cgpa);
      const degreeResult = convertSgpaToDegreeClass(cgpa);
      
      setResult({
        cgpa,
        grade: gradeResult.grade,
        gradeRange: gradeResult.range,
        degreeClass: degreeResult.degreeClass,
        degreeRange: degreeResult.range,
      });

      toast({
        title: "Calculation Complete",
        description: `Your CGPA is ${cgpa} with grade ${gradeResult.grade}`,
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
        title: 'SGPA to CGPA Conversion',
        text: `My CGPA: ${result.cgpa} (Grade: ${result.grade}, ${result.degreeClass})`,
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
              <Award className="w-6 h-6 text-accent" />
              <h1 className="text-xl font-bold text-foreground">
                SGPA to CGPA
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Convert SGPA to CGPA
          </h2>
          <p className="text-lg text-muted-foreground">
            Enter your SGPA values for up to 4 academic years to calculate your overall CGPA and determine your degree classification.
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
                <CardTitle className="text-lg">CGPA Calculation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>1. Enter SGPA for each academic year (minimum 1, maximum 4)</p>
                <p>2. CGPA is calculated as the average of all SGPA values</p>
                <p>3. Grade is determined based on CGPA ranges</p>
                <p>4. Degree classification is assigned according to academic standards</p>
              </CardContent>
            </Card>

            <Button 
              onClick={handleCalculate} 
              className="w-full" 
              size="lg"
              variant="default"
              disabled={sgpaList.some(sgpa => sgpa === 0) || errors.some(error => error !== null)}
            >
              <Award className="w-4 h-4" />
              Calculate CGPA
            </Button>
          </div>

          {/* Result Section */}
          <div>
            {result ? (
              <ResultCard
                title="CGPA & Classification Results"
                results={[
                  {
                    label: "CGPA",
                    value: result.cgpa,
                    description: `Based on ${sgpaList.filter(s => s > 0).length} year(s)`
                  },
                  {
                    label: "Grade",
                    value: result.grade,
                    description: result.gradeRange
                  },
                  {
                    label: "Degree Classification",
                    value: result.degreeClass,
                    description: result.degreeRange
                  }
                ]}
                onShare={handleShare}
              />
            ) : (
              <Card className="h-fit gradient-card border-dashed border-muted-foreground/30">
                <CardContent className="p-8 text-center">
                  <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    Ready to Calculate
                  </h3>
                  <p className="text-muted-foreground">
                    Enter your SGPA values and click calculate to see your CGPA and degree classification.
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

export default SgpaToCgpa;