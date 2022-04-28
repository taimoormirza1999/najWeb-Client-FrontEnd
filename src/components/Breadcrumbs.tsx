import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const convertBreadcrumb = (string) => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü');
};

const Breadcrumbs = ({ breadcrumbs }) => {
  /* const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<any | null>(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: `/${linkPath.slice(0, i + 1).join('/')}`,
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]); */

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav
      aria-label="breadcrumbs"
      className="border-outer-space my-5 rounded-lg border p-2 text-xl shadow-lg"
    >
      <ol className="breadcrumb capitalize">
        <li className="inline">
          <Link href="/">
            <a className="text-medium-grey hover:border-0">Home</a>
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, i) => {
          /* if (['', '#'].includes(linkText)) {
            return null;
          } */
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
