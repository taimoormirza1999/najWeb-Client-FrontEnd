import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import { classNames } from '@/utils/Functions';

const Pagination = ({ totalRecords, url, page = 0 }) => {
  const maxPages = 10;
  const pageSize = 10;
  const currentPage = page;
  const totalPages = Math.ceil(totalRecords / 10);
  const enablePrev = totalPages > 1 && page > 0 ? page - 1 : 0;
  const enableNext =
    totalPages > 1 && page < totalPages - 1 ? totalPages - 1 : 0;
  let startPage: number;
  let endPage: number;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalRecords - 1);

  // create an array of pages 
  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
    (i) => startPage + i
  );

  return (
    <div className="float-right mt-3">
      <nav
        className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <Link href={`${url}${enablePrev}`}>
          <a
            className={classNames(
              enablePrev ? '' : 'hidden',
              'bg-dark-blue relative inline-flex items-center rounded-l-md border border-gray-300 p-2 text-sm font-medium text-white hover:bg-gray-50'
            )}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </Link>
        {pages.map((page1, index) => (
          <Link
            key={index}
            href={page != page1 - 1 ? `${url}${page1 - 1}` : '#'}
          >
            <a
              className={classNames(
                page != page1 - 1
                  ? 'bg-white hover:bg-gray-50 border border-gray-300'
                  : 'bg-gray-100',
                'relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500'
              )}
            >
              {page1}
            </a>
          </Link>
        ))}
        <Link href={`${url}${enableNext}`}>
          <a
            href="#"
            className={classNames(
              enableNext ? '' : 'hidden',
              'bg-dark-blue relative inline-flex items-center rounded-r-md border border-gray-300 p-2 text-sm font-medium text-white hover:bg-gray-50'
            )}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </Link>
      </nav>
    </div>
  );
};

export { Pagination };
