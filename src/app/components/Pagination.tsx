interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DOTS = 'DOTS'; // marker for ellipsis
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate a pagination range with ellipsis when needed.
  const paginationRange = (): (number | typeof DOTS)[] => {
    const totalPageNumbers = 7; // Adjust this to control how many page numbers to show

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [...Array(5).keys()].map((i) => i + 1).concat([DOTS, totalPages]);
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        DOTS,
        ...Array(5)
          .fill(0)
          .map((_, i) => totalPages - 4 + i),
      ];
    }

    return [
      1,
      DOTS,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      DOTS,
      totalPages,
    ];
  };

  const range = paginationRange();

  return (
    <nav
      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Previous</span>
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M11.78 5.22a.75.75 0 010 1.06L8.06 10l3.72 3.72a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      {range.map((page, index) =>
        page === DOTS ? (
          <span
            key={index}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300"
          >
            …
          </span>
        ) : (
          <a
            key={page as number}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(page as number);
            }}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-colors focus:z-20 focus:outline-offset-0 ${
              page === currentPage
                ? 'z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </a>
        )
      )}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (currentPage < totalPages) onPageChange(currentPage + 1);
        }}
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Next</span>
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 11-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </nav>
  );
};
