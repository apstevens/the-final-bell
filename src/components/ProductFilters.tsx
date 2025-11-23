import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export interface FilterOptions {
  availability: string[];
  brands: string[];
  productTypes: string[];
  sizes: string[];
  colors: string[];
}

interface ProductFiltersProps {
  filters: FilterOptions;
  selectedFilters: {
    availability: string[];
    brands: string[];
    productTypes: string[];
    sizes: string[];
    colors: string[];
  };
  onFilterChange: (filterType: keyof FilterOptions, value: string) => void;
  onClearFilters: () => void;
}

export default function ProductFilters({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    availability: true,
    brands: true,
    productTypes: true,
    sizes: false,
    colors: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hasActiveFilters =
    selectedFilters.availability.length > 0 ||
    selectedFilters.brands.length > 0 ||
    selectedFilters.productTypes.length > 0 ||
    selectedFilters.sizes.length > 0 ||
    selectedFilters.colors.length > 0;

  const FilterSection = ({
    title,
    filterKey,
    options,
  }: {
    title: string;
    filterKey: keyof FilterOptions;
    options: string[];
  }) => {
    const isExpanded = expandedSections[filterKey];
    const selectedCount = selectedFilters[filterKey].length;

    return (
      <div className="border-b border-neutral-800">
        <button
          onClick={() => toggleSection(filterKey)}
          className="w-full flex items-center justify-between py-4 text-left hover:text-secondary transition"
        >
          <span className="font-semibold text-neutral-100">
            {title}
            {selectedCount > 0 && (
              <span className="ml-2 text-xs text-secondary">
                ({selectedCount})
              </span>
            )}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {isExpanded && (
          <div className="pb-4 space-y-2">
            {options.map((option) => {
              const isSelected = selectedFilters[filterKey].includes(option);
              return (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer hover:text-secondary transition group"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onFilterChange(filterKey, option)}
                    className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-secondary
                             focus:ring-secondary focus:ring-offset-0 focus:ring-2 cursor-pointer"
                  />
                  <span className="text-sm text-neutral-300 group-hover:text-secondary">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-neutral-900 rounded-2xl p-6 ring-1 ring-neutral-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-neutral-100">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-secondary hover:text-secondary/80 transition"
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-0">
        <FilterSection
          title="Availability"
          filterKey="availability"
          options={filters.availability}
        />
        <FilterSection
          title="Brand"
          filterKey="brands"
          options={filters.brands}
        />
        <FilterSection
          title="Product Type"
          filterKey="productTypes"
          options={filters.productTypes}
        />
        <FilterSection
          title="Size"
          filterKey="sizes"
          options={filters.sizes}
        />
        <FilterSection
          title="Color"
          filterKey="colors"
          options={filters.colors}
        />
      </div>
    </div>
  );
}