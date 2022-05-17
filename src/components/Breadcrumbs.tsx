import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

const Breadcrumbs = ({ breadcrumbs }) => {
  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav
      aria-label="breadcrumbs"
      className="border-outer-space my-6 rounded-lg border py-1 px-6 text-xl shadow-lg md:py-2 md:px-10"
    >
      <ol className="breadcrumb capitalize">
        <li className="inline">
          <Link href="/">
            <a className="text-medium-grey hover:border-0">
              <FormattedMessage id="Home" />
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
