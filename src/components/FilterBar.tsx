import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

const FilterDropdown = ({ label, options, value, onChange }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayLabel = value === "All" || value === "" ? label : value;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium border transition-all duration-200 ${
          value && value !== "All"
            ? "border-primary/50 bg-primary/10 text-primary"
            : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
        }`}
      >
        {displayLabel}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full mt-1 left-0 min-w-[160px] bg-card border border-border rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden z-50"
          >
            <div className="py-1 max-h-60 overflow-y-auto">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    opt === value
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface Filters {
  genre: string;
  year: string;
  rating: string;
  sortBy: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export const FilterBar = ({ filters, onChange }: FilterBarProps) => {
  const genreOptions = ["All", "Sci-Fi", "Action", "Drama", "Thriller", "Adventure", "Comedy", "Horror"];
  const yearOptions = ["All", "2024", "2023", "2022", "2021", "2020"];
  const ratingOptions = ["All", "9+", "8+", "7+", "6+"];
  const sortOptions = ["Popular", "Rating", "Year", "A-Z"];

  const hasActiveFilters = filters.genre !== "All" || filters.year !== "All" || filters.rating !== "All";

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <FilterDropdown label="Genre" options={genreOptions} value={filters.genre} onChange={(v) => onChange({ ...filters, genre: v })} />
      <FilterDropdown label="Year" options={yearOptions} value={filters.year} onChange={(v) => onChange({ ...filters, year: v })} />
      <FilterDropdown label="Rating" options={ratingOptions} value={filters.rating} onChange={(v) => onChange({ ...filters, rating: v })} />
      <FilterDropdown label="Sort By" options={sortOptions} value={filters.sortBy} onChange={(v) => onChange({ ...filters, sortBy: v })} />

      {hasActiveFilters && (
        <button
          onClick={() => onChange({ genre: "All", year: "All", rating: "All", sortBy: "Popular" })}
          className="text-xs text-primary hover:text-primary/80 transition-colors font-medium px-2"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};
