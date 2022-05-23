import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';

const SearchLot = () => {
  const intl = useIntl();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const startTracking = async (e) => {
    e.preventDefault();
    if (searchValue) {
      router.push({
        pathname: '/customer/tracking',
        query: { search: searchValue },
      });
    }
  };

  return (
    <div className="relative flex-1">
      <form onSubmit={startTracking}>
        <input
          type="text"
          className="
                      w-[220px]
                      rounded
                      border
                      border-[#8F9294]
                      px-3
                      text-base font-normal italic
                      text-[#818181]
                      transition
                      ease-in-out
                      focus:text-gray-700
                      focus:outline-none
                      ltr:float-right rtl:float-left
                    "
          name="lotSearch"
          id="lotSearch"
          value={searchValue}
          onInput={(e) => setSearchValue((e.target as HTMLInputElement).value)}
          placeholder={intl.formatMessage({ id: 'Track.Car.by.Vin.Number' })}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-2 h-6 w-6 cursor-pointer text-blue-600 ltr:right-2 rtl:left-2 rtl:rotate-180"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {' '}
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />{' '}
          </svg>
        </button>
      </form>
    </div>
  );
};

export { SearchLot };
