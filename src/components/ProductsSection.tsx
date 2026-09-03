import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, ShieldCheck, Check, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS_CATALOG, SECTORS } from '../data/companyData';
import { SectorId, ProductItem } from '../types';

interface ProductsSectionProps {
  selectedSectorFilter?: SectorId | 'all';
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  selectedSectorFilter = 'all',
}) => {
  const [activeFilter, setActiveFilter] = useState<SectorId | 'all'>(selectedSectorFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProduct, setHoveredProduct] = useState<ProductItem | null>(null);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [selectedProductForModal, setSelectedProductForModal] = useState<ProductItem | null>(null);
  
  const listRef = useRef<HTMLDivElement>(null);
  const floatingPreviewRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: -200, y: -200 });
  const previewPosRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    setActiveFilter(selectedSectorFilter);
  }, [selectedSectorFilter]);

  // High-performance direct DOM RAF loop for cursor-following preview (Zero React re-renders)
  useEffect(() => {
    if (!hoveredProduct) return;

    let animationFrameId: number;
    const lerp = () => {
      previewPosRef.current.x += (mousePosRef.current.x - previewPosRef.current.x) * 0.18;
      previewPosRef.current.y += (mousePosRef.current.y - previewPosRef.current.y) * 0.18;

      if (floatingPreviewRef.current) {
        floatingPreviewRef.current.style.transform = `translate3d(${previewPosRef.current.x + 30}px, ${previewPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(lerp);
    };

    animationFrameId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hoveredProduct]);

  // Modal accessibility: Escape key & body scroll locking
  useEffect(() => {
    if (!selectedProductForModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProductForModal(null);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProductForModal]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const filteredProducts = PRODUCTS_CATALOG.filter((item) => {
    const matchesSector = activeFilter === 'all' || item.sectorId === activeFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <section
      id="products"
      onMouseMove={handleMouseMove}
      className="relative w-full py-24 sm:py-32 bg-[#0C0E14] text-[#F3F4F6] border-t border-[#DFBA73]/15 overflow-hidden"
    >
      {/* Floating Cursor Preview Image (Desktop Only - Direct DOM Transform) */}
      {hoveredProduct && (
        <div
          ref={floatingPreviewRef}
          className="fixed pointer-events-none z-50 hidden lg:block w-72 h-44 rounded-sm overflow-hidden border border-[#DFBA73]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] top-0 left-0 transition-opacity duration-300 backdrop-blur-sm will-change-transform"
          style={{
            transform: `translate3d(${previewPosRef.current.x + 30}px, ${previewPosRef.current.y}px, 0) translate(-50%, -50%)`
          }}
        >
          <img
            src={hoveredProduct.image}
            alt={hoveredProduct.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E14] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white">
            <span className="text-[#DFBA73] uppercase tracking-wider">{hoveredProduct.category}</span>
            <span className="bg-black/60 px-1.5 py-0.5 rounded-xs border border-white/10">{hoveredProduct.moq}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#DFBA73]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#DFBA73] uppercase font-semibold">
                03 / EDITORIAL PRODUCT SHOWCASE
              </span>
            </div>
            <h2 className="text-[clamp(1.9rem,6vw,3.75rem)] sm:text-[clamp(2.2rem,5.5vw,3.75rem)] font-display font-extrabold tracking-tight uppercase text-[#F3F4F6]">
              EXPORT SPECIFICATIONS.
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Filter by product name, API, grade, cut..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#121522] border border-[#DFBA73]/20 rounded-xs text-xs font-sans text-[#F3F4F6] placeholder-neutral-500 focus:outline-none focus:border-[#DFBA73]"
            />
          </div>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/5">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs font-mono tracking-[0.16em] uppercase rounded-xs transition-all ${
              activeFilter === 'all'
                ? 'bg-[#DFBA73] text-[#FFFFFF] font-bold shadow-md'
                : 'bg-[#121522] text-neutral-400 hover:text-white border border-white/5'
            }`}
          >
            ALL SECTORS ({PRODUCTS_CATALOG.length})
          </button>
          {SECTORS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveFilter(sec.id)}
              className={`px-4 py-2 text-xs font-mono tracking-[0.16em] uppercase rounded-xs transition-all ${
                activeFilter === sec.id
                  ? 'bg-[#DFBA73] text-[#FFFFFF] font-bold shadow-md'
                  : 'bg-[#121522] text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {sec.title.split('&')[0]}
            </button>
          ))}
        </div>

        {/* Editorial Product List (Replaces standard ecommerce cards) */}
        <div ref={listRef} className="border-t border-white/10 divide-y divide-white/10">
          {filteredProducts.map((product, index) => {
            const isHovered = hoveredProduct?.id === product.id;
            const isExpanded = expandedProductId === product.id;
            const formattedIndex = String(index + 1).padStart(2, '0');

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product)}
                onMouseLeave={() => setHoveredProduct(null)}
                className={`group transition-all duration-300 ${
                  isHovered ? 'bg-[#121522]/60' : 'bg-transparent'
                }`}
              >
                {/* Main Interactive Row */}
                <div
                  onClick={() => setExpandedProductId(isExpanded ? null : product.id)}
                  className="py-6 sm:py-8 px-3 sm:px-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-center gap-4 sm:gap-8 flex-1">
                    <span className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#DFBA73]/60 group-hover:text-[#DFBA73] font-bold">
                      {formattedIndex}
                    </span>

                    <div className="flex-1">
                      <div className="text-lg sm:text-2xl lg:text-3xl font-display font-bold text-[#F3F4F6] group-hover:text-[#DFBA73] group-hover:translate-x-1.5 transition-all duration-300">
                        {product.name}
                      </div>
                      <div className="text-[11px] font-mono tracking-[0.15em] text-neutral-400 uppercase mt-1">
                        {product.category} • <span className="text-[#DFBA73]/80">MOQ: {product.moq}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Meta & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-mono text-[#F3F4F6]">
                        {product.containerCapacity}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">
                        FCL Loading
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProductForModal(product);
                        }}
                        className="p-2 border border-white/10 hover:border-[#DFBA73] text-neutral-400 hover:text-white rounded-xs transition-colors"
                        title="View Full Specifications"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded In-Line Details (Smooth Accordion for both Desktop & Mobile) */}
                {isExpanded && (
                  <div className="px-4 sm:px-10 pb-8 pt-2 bg-[#121522]/80 border-t border-white/5 grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-300">
                    <div className="md:col-span-4">
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-xs border border-white/10">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                      <div>
                        <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light leading-relaxed mb-4">
                          {product.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                          {Object.entries(product.specs).map(([key, val]) => (
                            <div key={key} className="p-2 bg-[#0C0E14] border border-white/5 rounded-xs flex justify-between">
                              <span className="text-neutral-400">{key}:</span>
                              <span className="text-[#F3F4F6] font-semibold">{val}</span>
                            </div>
                          ))}
                          <div className="p-2 bg-[#0C0E14] border border-white/5 rounded-xs flex justify-between">
                            <span className="text-neutral-400">Packaging:</span>
                            <span className="text-[#DFBA73] font-semibold truncate max-w-[140px]">{product.packaging}</span>
                          </div>
                          <div className="p-2 bg-[#0C0E14] border border-white/5 rounded-xs flex justify-between">
                            <span className="text-neutral-400">Loading:</span>
                            <span className="text-[#DFBA73] font-semibold truncate max-w-[140px]">{product.containerCapacity}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProductForModal(product)}
                          className="px-4 py-2.5 border border-white/20 text-neutral-400 hover:text-white font-mono text-xs uppercase rounded-xs"
                        >
                          FULL LABORATORY DOSSIER
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-[#121522] border border-white/5 rounded-xs">
            <p className="text-neutral-400 font-mono text-sm">No export items matching your filter query.</p>
            <button
              type="button"
              onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 text-xs font-mono text-[#DFBA73] border border-[#DFBA73]/30 rounded-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Full Modal */}
      {selectedProductForModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProductForModal(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-[#121522] border border-[#DFBA73]/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-xs shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedProductForModal(null)}
              aria-label="Close product specifications dialog"
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-lg font-mono p-1"
            >
              ✕
            </button>

            <div className="text-xs font-mono tracking-[0.2em] text-[#DFBA73] uppercase mb-2">
              {selectedProductForModal.category} • EXPORT SPECIFICATION
            </div>
            <h3 id="product-modal-title" className="text-2xl sm:text-3xl font-display font-bold text-[#F3F4F6] mb-4">
              {selectedProductForModal.name}
            </h3>

            <div className="aspect-[16/9] w-full overflow-hidden rounded-xs mb-6 border border-white/10">
              <img
                src={selectedProductForModal.image}
                alt={selectedProductForModal.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-sans font-light">
              {selectedProductForModal.description}
            </p>

            <div className="space-y-2.5 mb-6">
              <div className="text-xs font-mono tracking-[0.18em] text-[#DFBA73] uppercase mb-2">
                TECHNICAL ASSAY & COMMERCIAL LOADING PARAMETERS
              </div>
              {Object.entries(selectedProductForModal.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-white/5 text-xs">
                  <span className="font-mono text-neutral-400">{k}:</span>
                  <span className="font-sans text-[#F3F4F6] font-medium">{v}</span>
                </div>
              ))}
              <div className="flex justify-between py-1.5 border-b border-white/5 text-xs">
                <span className="font-mono text-neutral-400">Packaging Format:</span>
                <span className="font-sans text-[#F3F4F6] font-medium">{selectedProductForModal.packaging}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5 text-xs">
                <span className="font-mono text-neutral-400">FCL Container Capacity:</span>
                <span className="font-sans text-[#E5C583] font-medium">{selectedProductForModal.containerCapacity}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5 text-xs">
                <span className="font-mono text-neutral-400">Minimum Order Quantity (MOQ):</span>
                <span className="font-sans text-[#DFBA73] font-semibold">{selectedProductForModal.moq}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedProductForModal(null)}
                className="px-6 py-3 border border-white/20 text-neutral-400 font-mono text-xs uppercase rounded-xs"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
