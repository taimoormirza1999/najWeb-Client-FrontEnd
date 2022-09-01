import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

const Breadcrumbs = ({ breadcrumbs }) => {
  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav
      aria-label="breadcrumbs"
      className="border-medium-grey my-6 border border-x-0 py-1 text-xl shadow-sm md:py-2"
    >
      <ol className="breadcrumb px-4 capitalize md:px-8 lg:pl-[6.6%]">
        <li className="inline">
          <Link href="/">
            <a className="text-medium-grey hover:border-0">
              <FormattedMessage id="general.home" />
            </a>
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb) => {
          return (
            <li key={breadcrumb.href} className="inline">
              <Link href={breadcrumb.href}>
                <a className="text-medium-grey hover:border-0">
                  {breadcrumb.name}
                </a>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
