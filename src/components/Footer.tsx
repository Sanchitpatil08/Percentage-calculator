import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="mt-16 py-8 border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className=" text-muted-foreground text-xl">
              Developed by <span className="font-medium text-foreground">Sanchit Patil</span>
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              asChild
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <a 
                href="https://x.com/Sanchit_Patil_" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              asChild
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <a 
                href="https://www.linkedin.com/in/sanchit-patil-888162288/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              asChild
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <a 
                href="https://github.com/Sanchitpatil08" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}