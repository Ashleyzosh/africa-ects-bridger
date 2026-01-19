import { GraduationCap, Mail, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Grades to ECTS</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              The free, accurate African grade to ECTS converter built for international 
              students applying to European universities. Trusted by 10,000+ students.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://twitter.com/ectstogradesconverter" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:support@gradestoects.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <a href="#converter" className="text-muted-foreground hover:text-primary transition-colors">
                  Grade Converter
                </a>
              </li>
              <li>
                <a href="#cumulative" className="text-muted-foreground hover:text-primary transition-colors">
                  Cumulative GPA Calculator
                </a>
              </li>
              <li>
                <a href="#reference" className="text-muted-foreground hover:text-primary transition-colors">
                  ECTS Reference Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#what-is-ects" className="text-muted-foreground hover:text-primary transition-colors">
                  What is ECTS?
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="mailto:support@gradestoects.com" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Grades to ECTS. Built for accurate and transparent grade conversion.
          </p>
          <p className="text-sm text-muted-foreground">
            Don't let wrong grade calculations hinder your Europe Admissions! 
            <a href="https://twitter.com/ectstogradesconverter" className="text-primary ml-1 hover:underline">
              @Ectstogradesconverter
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
