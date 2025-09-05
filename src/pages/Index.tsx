import { ConversionCard } from "@/components/ConversionCard";
import { Footer } from "@/components/Footer";
import { Calculator, TrendingUp, Award, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-semibold text-foreground mb-6 animate-fade-in">
              Academic Grade Calculator
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in [animation-delay:200ms] max-w-2xl mx-auto">
              Accurate grade conversion tools for academic records. Convert SGPA to CGPA, calculate percentages, and determine classifications.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in [animation-delay:400ms] cursor-pointer ">
              <Button variant="default" size="lg" asChild className="cursor-pointer">
                <a href="#calculators" >
                  Start Calculating
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30" id="calculators">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Conversion Tools
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Professional grade conversion tools with accurate calculations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ConversionCard
              title="SGPA → Percentage"
              description="Convert SGPA values to percentage format for academic documentation and applications."
              icon={<TrendingUp className="w-5 h-5" />}
              href="/sgpatper" 
            />
            
            <ConversionCard
              title="CGPA → Percentage"
              description="Transform CGPA to percentage format for professional and educational requirements."
              icon={<Calculator className="w-5 h-5" />}
              href="/cgpatper"
            />
            
            <ConversionCard
              title="SGPA → CGPA"
              description="Calculate cumulative GPA from semester grades with automatic classification."
              icon={<Award className="w-5 h-5" />}
              href="/sgpatcgpa"
            />
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-5">
              Features
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4">
                <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-base font-medium text-foreground mb-2">Precise Calculations</h4>
                <p className="text-sm text-muted-foreground">
                  Standard conversion formulas for accurate academic records.
                </p>
              </div>
              
              <div className="p-4">
                <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-base font-medium text-foreground mb-2">Instant Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Real-time calculations with immediate results display.
                </p>
              </div>
              
              <div className="p-4">
                <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-base font-medium text-foreground mb-2">Grade Classification</h4>
                <p className="text-sm text-muted-foreground">
                  Automatic grade classification and degree class determination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;