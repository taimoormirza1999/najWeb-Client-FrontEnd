import Link from 'next/link';

const ApplyForAccount = () => {
  return (
    <div className="container mx-auto">
      <div className="bg-teal-blue rounded-xl p-6 text-white lg:p-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="basis-3/4 lg:pr-10">
            <h3 className="py-4 pt-0 text-2xl font-semibold md:text-3xl lg:text-5xl">
              Apply for Account
            </h3>
            <p className="py-4 text-xl leading-normal md:text-2xl lg:text-4xl lg:leading-[4rem]">
              Receive Exclusive offers from and buyer features by subscribing to{' '}
              <span className="font-sen font-bold">NEJOUM</span> ALJAZEERA. You
              will be able to buy and follow up every detail of your transported
              vehicles at each stage.
            </p>
            <Link href="/auth/newAccount">
              <a className="py-2 text-xl italic text-white underline md:text-2xl lg:text-3xl">
                Receive Account...
              </a>
            </Link>
          </div>

          <div className="bg-light-grey flex basis-1/4 items-center justify-center rounded-2xl">
            <div className="text-3xl leading-[3rem] md:text-4xl xl:text-6xl">
              <i className="material-icons text-yellow-orange mr-2 align-middle text-3xl md:text-4xl xl:text-6xl">
                &#xe853;
              </i>
              <span className="text-outer-space align-middle font-bold">
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
