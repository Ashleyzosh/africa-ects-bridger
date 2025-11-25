import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCountries, getUniversitiesByCountry } from "@/data/gradingData";

interface CountryUniversitySelectorProps {
  selectedCountry: string;
  selectedUniversity: string;
  onCountryChange: (value: string) => void;
  onUniversityChange: (value: string) => void;
}

export function CountryUniversitySelector({
  selectedCountry,
  selectedUniversity,
  onCountryChange,
  onUniversityChange,
}: CountryUniversitySelectorProps) {
  const countries = getCountries();
  const universities = selectedCountry ? getUniversitiesByCountry(selectedCountry) : [];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="country">Select Country</Label>
        <Select value={selectedCountry} onValueChange={onCountryChange}>
          <SelectTrigger id="country">
            <SelectValue placeholder="Choose your country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <Label htmlFor="university">Select University</Label>
          <Select value={selectedUniversity} onValueChange={onUniversityChange}>
            <SelectTrigger id="university">
              <SelectValue placeholder="Choose your university" />
            </SelectTrigger>
            <SelectContent>
              {universities.map((university) => (
                <SelectItem key={university.id} value={university.id}>
                  {university.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
