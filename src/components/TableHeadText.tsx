import { FormattedMessage } from 'react-intl';

export default function TableHeadText(text) {
  return (
    <>
      <div className="pt-2 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-dark-blue text-3xl font-semibold">
            <FormattedMessage id={text.id} />
          </h1>
        </div>
      </div>
    </>
  );
}
