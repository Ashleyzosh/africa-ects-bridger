import { useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onConverterClick: () => void;
  onHowItWorksClick: () => void;
}

export const Header = ({ onConverterClick, onHowItWorksClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (callback: () => void) => {
    callback();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg">ECTS Bridger</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={onConverterClick}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Converter
            </button>
            <button
              onClick={onHowItWorksClick}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              How It Works
            </button>
            <Button onClick={onConverterClick} size="sm">
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          )}
        >
          <nav className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => handleNavClick(onConverterClick)}
              className="text-left px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
            >
              Converter
            </button>
            <button
              onClick={() => handleNavClick(onHowItWorksClick)}
              className="text-left px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
            >
              How It Works
            </button>
            <div className="px-4 pt-2">
              <Button onClick={() => handleNavClick(onConverterClick)} className="w-full">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
