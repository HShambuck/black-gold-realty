'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import GoldButton from '@/components/common/GoldButton';

const propertyTypes = [
  { value: '',          label: 'All Types'       },
  { value: 'villa',     label: 'Villa'           },
  { value: 'penthouse', label: 'Penthouse'       },
  { value: 'house',     label: 'Executive Home'  },
  { value: 'land',      label: 'Land'            },
  { value: 'commercial',label: 'Commercial'      },
];

const bedroomOptions = [
  { value: '',  label: 'Any Beds'  },
  { value: '2', label: '2+'        },
  { value: '3', label: '3+'        },
  { value: '4', label: '4+'        },
  { value: '5', label: '5+'        },
];

const priceRanges = [
  { value: '',        label: 'Any Price'    },
  { value: '0-250000',  label: 'Under $250K'  },
  { value: '250000-500000', label: '$250K – $500K'  },
  { value: '500000-1000000', label: '$500K – $1M'   },
  { value: '1000000-', label: '$1M+'         },
];

export default function PropertyFilters({ onFilter, totalCount }) {
  const [type,      setType]      = useState('');
  const [bedrooms,  setBedrooms]  = useState('');
  const [priceRange,setPriceRange]= useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleApply = () => {
    let minPrice, maxPrice;
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      minPrice = min ? parseInt(min) : undefined;
      maxPrice = max ? parseInt(max) : undefined;
    }
    onFilter?.({
      type:     type || undefined,
      bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
      minPrice,
      maxPrice,
    });
  };

  const handleReset = () => {
    setType('');
    setBedrooms('');
    setPriceRange('');
    onFilter?.({});
  };

  const hasFilters = type || bedrooms || priceRange;

  return (
    <div className="bg-obsidian-900 border-b border-gold-500/10">
      <div className="container-luxury py-5">
        {/* Filter Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          {/* Results count */}
          <p className="font-sans text-white/40 text-sm font-medium whitespace-nowrap">
            <span className="text-gold-500 font-semibold">{totalCount}</span> properties found
          </p>

          <div className="h-4 w-px bg-white/10 hidden lg:block" />

          {/* Desktop filters */}
          <div className="hidden lg:flex items-center gap-3 flex-1">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input-luxury text-sm py-2.5 max-w-xs"
            >
              {propertyTypes.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="input-luxury text-sm py-2.5 max-w-xs"
            >
              {bedroomOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="input-luxury text-sm py-2.5 max-w-xs"
            >
              {priceRanges.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <GoldButton onClick={handleApply} size="sm">Apply</GoldButton>

            {hasFilters && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm font-sans transition-colors"
              >
                <X className="w-4 h-4" />
                Reset
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="lg:hidden flex items-center gap-2 font-sans text-sm text-white/60 hover:text-gold-500 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter Properties
            {hasFilters && (
              <span className="w-2 h-2 rounded-full bg-gold-500" />
            )}
          </button>
        </div>

        {/* Mobile Filter Panel */}
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pt-4 grid grid-cols-1 gap-3"
          >
            <select value={type} onChange={(e) => setType(e.target.value)} className="input-luxury text-sm">
              {propertyTypes.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="input-luxury text-sm">
              {bedroomOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="input-luxury text-sm">
              {priceRanges.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="flex gap-3">
              <GoldButton onClick={() => { handleApply(); setFiltersOpen(false); }} size="sm" fullWidth>Apply Filters</GoldButton>
              {hasFilters && (
                <GoldButton onClick={handleReset} variant="outline" size="sm">Reset</GoldButton>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}