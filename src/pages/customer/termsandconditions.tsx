import React from 'react';
import { FormattedMessage } from 'react-intl';

import HeadTextWithIcon from '@/components/common/HeadTextWithIcon';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { grantIfLogin } from '@/utils/network';

const TermsAndConditions = () => {
  return (
    <Layout meta={<Meta title="Terms and Conditions" description="" />}>
      <div>
        <div className="m-4">
          {/* <div className="flex">
            <h4 className="text-dark-blue flex-1 text-xl sm:text-2xl">
              <i className="material-icons  text-yellow-orange align-middle ltr:mr-2 rtl:ml-2">
                &#xe14f;
              </i>
              <FormattedMessage id="page.termsCondition.title" />
            </h4>
            <SearchLot></SearchLot>
          </div> */}

          <div className="mt-5">
            <HeadTextWithIcon
              header={'page.termsCondition.title'}
              gicon={'&#xe048;'}
              tagline={'page.termsCondition.header'}
            />
          </div>
          {/* <h4 className="text-dark-blue flex-1 pb-4 text-xl sm:text-2xl">
            <p className="py-4 text-lg lg:text-2xl">
              <FormattedMessage id="page.termsCondition.header" />{' '}
              <span className="font-sen font-bold">
                <FormattedMessage id="general.najae" />
              </span>
            </p>
          </h4> */}
          <h4 className="mb-4 ml-4 text-lg leading-[3rem] lg:text-xl">
            1. <FormattedMessage id="page.termsCondition.desc1" />
            <br></br>
            2. <FormattedMessage id="page.termsCondition.desc2" />
            <br></br>
            3. <FormattedMessage id="page.termsCondition.desc3" />
            <br></br>
            4. <FormattedMessage id="page.termsCondition.desc4" />
            <br></br>
            5. <FormattedMessage id="page.termsCondition.desc5" />
            <br></br>
            6. <FormattedMessage id="page.termsCondition.desc6" />
          </h4>
        </div>
      </div>
    </Layout>
  );
};
export default TermsAndConditions;
export async function getServerSideProps(context) {
  return grantIfLogin(context);
}
