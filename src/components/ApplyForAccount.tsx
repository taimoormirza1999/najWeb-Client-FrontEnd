import Link from 'next/link';

const ApplyForAccount = () => {
  return (
    <div className="container mx-auto">
      <div className="bg-teal-blue rounded-xl p-12 text-white">
        <div className="flex justify-between gap-8">
          <div className="basis-3/4 pr-10">
            <h3 className="py-4 pt-0 text-5xl font-semibold">
              Apply for Account
            </h3>
            <p className="py-4 text-4xl leading-[4rem]">
              Receive Exclusive offers from and buyer features by subscribing to{' '}
              <span className="font-bold">NEJOUM</span> ALJAZEERA. You will be
              able to buy and follow up every detail of your transported
              vehicles at each stage.
            </p>
            <Link href="/auth/newAccount">
              <a className="py-2 text-3xl italic text-white underline">
                Receive Account...
              </a>
            </Link>
          </div>

          <div className="bg-light-grey flex basis-1/4 items-center justify-center rounded-2xl">
            <div className="text-6xl leading-[3rem]">
              <i className="material-icons text-yellow-orange mr-2 align-middle text-6xl">
                &#xe853;
              </i>
              <span className="text-outer-space align-middle font-bold">
                NAJ
              </span>
              <div className="text-outer-space">Account</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForAccount;
