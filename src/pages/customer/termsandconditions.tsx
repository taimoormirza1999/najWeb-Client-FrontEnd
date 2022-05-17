import React from 'react';

import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutDashboard';

const TermsAndConditions = () => {
  return (
    <Layout meta={<Meta title="Terms and Conditions" description="" />}>
      <div>
        <div className="m-4">
          <div>
            <h4 className="text-dark-blue pb-8 text-xl sm:text-2xl">
              <i className="material-icons  text-yellow-orange align-middle">
                &#xe14f;
              </i>
              Terms and Conditions
            </h4>
            <h4>
              1. Customer must clear all pending amounts (Tax, Shipping etc.)
              due on his cars prior from the date of arrival of the vehicle.
              <br></br>
              2. Customer must transfer the vehicle within 3 days of the arrival
              of the car else storage fine is applied on per day basis.<br></br>
              3. The company is not responsibile for damages after the vechile
              exit the company’s permises .<br></br>
              4. In case the customer is unable to pay, the company has the
              right to add a fine to the car estimated by the company.<br></br>
              5. In case the customer late to pay the expenses within a maximum
              period of one month, the company has right to sell the car to take
              its right from shipping, customs, and tax.
            </h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
