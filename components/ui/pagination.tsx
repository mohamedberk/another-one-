'use client';

import React from 'react';
import { Button } from './button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  isLoading = false 
}: PaginationProps) {
  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  // Generate page numbers with a consistent, clear pattern
  const getPageNumbers = () => {
    // Handle case with few pages
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Show ellipsis after page 1 if current page is > 3
    if (currentPage > 3) {
      pages.push('ellipsis1');
    }
    
    // Calculate range of pages around current page
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    // Add pages around current page
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Show ellipsis before last page if needed
    if (currentPage < totalPages - 2) {
      pages.push('ellipsis2');
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6" aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="h-9 px-4"
        aria-label="Go to previous page"
      >
        Previous
      </Button>
      
      <div className="flex flex-wrap items-center gap-1">
        {pageNumbers.map((page) => 
          typeof page === 'string' ? (
            // Render ellipsis
            <span key={page} className="px-2 text-neutral-500">
              ...
            </span>
          ) : (
            // Render page button
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              className={`h-9 w-9 p-0 ${
                currentPage === page 
                  ? "bg-orange-500 text-white hover:bg-orange-600" 
                  : "text-neutral-700"
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Button>
          )
        )}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="h-9 px-4"
        aria-label="Go to next page"
      >
        Next
      </Button>
    </div>
  );
}
