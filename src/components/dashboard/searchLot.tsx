import { useState } from 'react';

const SearchLot = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="relative flex-1">
      <input
        type="text"
        className="
                      float-right
                      m-auto
                      mt-0
                      block
                      w-full
                      max-w-[300px]
                      rounded
                      border
                      border-solid
                      border-[#8F9294]
                      bg-white
                      bg-clip-padding px-3
                      py-1.5 text-center text-base
                      font-normal
                      italic
                      text-[#818181]
                      transition
                      ease-in-out
                      focus:text-gray-700 focus:outline-none
                    "
        name="lotSearch"
        id="lotSearch"
        value={searchValue}
        onInput={(e) => setSearchValue((e.target as HTMLInputElement).value)}
        placeholder="Track Car by Vin Number"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[8px] right-[8px] h-5 w-5 text-[#818181]"
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
    </div>
  );
};

export { SearchLot };
