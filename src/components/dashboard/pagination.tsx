import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { classNames } from '@/utils/Functions';

const Pagination = ({ totalRecords, url, page = 0, limit = 10 }) => {
  const maxPages = 10;
  const pageSize = limit === 'all' ? totalRecords : limit;
  const currentPage: number = page;
  const totalPages = Math.ceil(totalRecords / pageSize);
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
    const maxPagesBeforeCurrentPage: number = Math.floor(maxPages / 2);
    const maxPagesAfterCurrentPage: number = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (+currentPage + +maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = +currentPage + +maxPagesAfterCurrentPage;
    }
  }
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
              'bg-dark-blue relative inline-flex items-center ltr:rounded-l-md rtl:rounded-r-md border-gray-300 p-2 text-sm font-medium text-white hover:bg-gray-50'
            )}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon
              className="h-5 w-5 rtl:rotate-180"
              aria-hidden="true"
            />
          </a>
        </Link>
        {pages.map((page1, index) => (
          <Link
            key={index}
            href={page !== page1 - 1 ? `${url}${page1 - 1}` : '#'}
          >
            <a
              className={classNames(
                Number(page) !== page1 - 1
                  ? 'bg-white hover:bg-gray-50 border border-gray-300'
                  : 'bg-blue-200',
                'relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600'
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
              'bg-dark-blue relative inline-flex items-center ltr:rounded-r-md rtl:rounded-l-md border-gray-300 p-2 text-sm font-medium text-white hover:bg-gray-50'
            )}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon
              className="h-5 w-5 rtl:-rotate-180"
              aria-hidden="true"
            />
          </a>
        </Link>
      </nav>
    </div>
  );
};

// TODO fix region fitler on page change
const SelectPageRecords = ({ url, search = '' }) => {
  const intl = useIntl();
  const router = useRouter();
  const [selectedLimit, setSelectLimit] = useState('10');
  const [tableSearch, setTableSearch] = useState(search);
  const [regions, setRegions] = useState<any>([]);
  const [filters, setFilters] = useState<any>({
    region: router.query?.region ? router.query.region : '',
  });

  const applyFilters = () => {
    router.push(
      `${url}&limit=${selectedLimit}&search=${tableSearch}&region=${filters.region}`
    );
  };

  const changePage = (value) => {
    setSelectLimit(value);
  };

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters((prevState) => ({ ...prevState, [name]: value }));
  }

  const getRegions = async () => {
    await axios
      .get(`/api/general/auctionRegions`)
      .then((res) => {
        setRegions(res.data.data);
      })
      .catch(() => {
        setRegions([]);
      });
  };

  useEffect(() => {
    getRegions();
  }, []);

  useEffect(() => {
    setFilters((prevState) => ({ ...prevState, region: '' }));
  }, [url]);

  useEffect(() => {
    applyFilters();
  }, [filters, selectedLimit]);

  return (
    <div className="mt-3">
      <input
        type="text"
        placeholder={intl.formatMessage({ id: 'Search' })}
        className="border-medium-grey my-4 basis-1/6 rounded-md border py-1 text-lg text-gray-700 ltr:italic md:self-end"
        value={tableSearch}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            router.push(`${url}&limit=${selectedLimit}&search=${tableSearch}`);
          }
        }}
        onChange={(e) => {
          setTableSearch(e.target.value);
        }}
      />
      <select
        name="region"
        title={intl.formatMessage({ id: 'general.region' })}
        className="border-medium-grey mb-3 ml-3 rounded-md border py-1 text-lg text-gray-700"
        value={filters.region}
        onChange={handleFilterChange}
      >
        <option value="">
          {intl.formatMessage({ id: 'general.all.region' })}
        </option>
        {regions
          ? regions.map((region, index) => (
              <option key={index} value={region.region_id}>
                {region.country_shortname} - {region.region_name}
              </option>
            ))
          : null}
      </select>
      <select
        title={intl.formatMessage({ id: 'page.table.info.length' })}
        className="mb-3 rounded-md  border border-[#005fb7] py-1 text-lg text-gray-700 ltr:float-right rtl:float-left"
        value={selectedLimit}
        onChange={(event) => changePage(event.target.value)}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="all">All</option>
      </select>
    </div>
  );
};

export { Pagination, SelectPageRecords };
