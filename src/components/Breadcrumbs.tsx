import Link from 'next/link';

const Breadcrumbs = ({ breadcrumbs }) => {
  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav
      aria-label="breadcrumbs"
      className="border-outer-space my-6 rounded-lg border py-2 px-10 text-xl shadow-lg"
    >
      <ol className="breadcrumb capitalize">
        <li className="inline">
          <Link href="/">
            <a className="text-medium-grey hover:border-0">Home</a>
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
