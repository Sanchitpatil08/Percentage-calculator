import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ResultCardProps {
  title: string;
  results: Array<{
    label: string;
    value: string | number;
    description?: string;
  }>;
  formula?: string;
  onShare?: () => void;
}

export function ResultCard({ title, results, formula, onShare }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    const resultText = results
      .map(result => `${result.label}: ${result.value}${result.description ? ` (${result.description})` : ''}`)
      .join('\n');
    
    const textToCopy = `${title}\n${'='.repeat(title.length)}\n${resultText}${formula ? `\n\nFormula Used: ${formula}` : ''}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Results copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="gradient-card border border-success/20 shadow-card animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-success" />
          <CardTitle className="text-xl text-card-foreground">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-success/5 rounded-lg border border-success/10">
            <span className="font-medium text-card-foreground">{result.label}:</span>
            <div className="text-right">
              <span className="text-lg font-bold text-success">{result.value}</span>
              {result.description && (
                <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
              )}
            </div>
          </div>
        ))}

        {formula && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border/50">
            <p className="text-sm font-medium text-card-foreground mb-1">Formula Used:</p>
            <code className="text-sm text-primary bg-primary/10 px-2 py-1 rounded font-mono">
              {formula}
            </code>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={handleCopy}
            disabled={copied}
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Results
              </>
            )}
          </Button>
          {onShare && (
            <Button variant="secondary" className="flex-1" onClick={onShare}>
              <Share className="w-4 h-4" />
              Share
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}