import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

const ApplyForAccount = () => {
  return (
    <div className="container mx-auto">
      <div className="bg-teal-blue rounded-xl p-6 text-white lg:p-8 xl:p-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="basis-2/3 lg:basis-3/4 xl:pr-10">
            <h3 className="py-4 pt-0 text-2xl font-semibold md:text-3xl xl:text-4xl">
              <FormattedMessage id="general.apply_for_account" />
            </h3>
            <p className="py-4 text-xl leading-normal lg:text-2xl xl:text-3xl xl:leading-[3rem] 2xl:leading-[3.5rem]">
              <FormattedMessage id="page.cars.showroom.apply-desc" />
            </p>
            <Link href="/auth/newAccount">
              <a className="py-2 text-xl italic text-white underline xl:text-3xl">
                Receive Account...
              </a>
            </Link>
          </div>

          <div className="bg-light-grey flex basis-1/3 items-center justify-center rounded-2xl md:min-h-[200px] md:self-center lg:basis-1/4 xl:min-h-[300px] 2xl:min-h-[350px]">
            <div className="text-3xl leading-[4rem] md:text-4xl xl:text-6xl">
              <i className="material-icons text-yellow-orange mr-2 align-middle text-3xl md:text-4xl xl:text-6xl">
                &#xe853;
              </i>
              <span className="text-outer-space font-sen align-middle font-bold">
                NAJ
              </span>
              <div className="text-outer-space ml-2 inline-block align-middle md:ml-0 md:block">
                Account
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForAccount;
