import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutDashboard';

const TermsAndConditions = () => {
  return (
    <Layout meta={<Meta title="Terms and Conditions" description="" />}>
      <div>
        <div className="m-4">
          <div>
            <h4 className="text-dark-blue pb-4 text-xl sm:text-2xl">
              <i className="material-icons  text-yellow-orange align-middle ltr:mr-2 rtl:ml-2">
                &#xe14f;
              </i>
              <FormattedMessage id="page.termsCondition.title" />
              <p className="py-4 text-lg lg:text-2xl">
                <FormattedMessage id="page.termsCondition.header" />{' '}
                <span className="font-sen font-bold">
                  <FormattedMessage id="general.najae" />
                </span>
              </p>
            </h4>
            <h4 className="mb-4 text-lg leading-[3rem] lg:text-xl">
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
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
