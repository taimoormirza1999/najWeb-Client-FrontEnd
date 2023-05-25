// import ContentCutIcon from '@mui/icons-material/ContentCut';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ContainerInvoice = () => {
  const router = useRouter();
  const container_id = router.query?.id ? router.query.id : 0;
  const [Tables, setTables] = useState([]);
  const [Name, setName] = useState('');
  const [Location, setLocation] = useState('');
  const [Country, setCountry] = useState('');
  const [Phone, setPhone] = useState('');
  const [Shipper, setShipper] = useState('');
  const [Origin, setOrigin] = useState('');
  const [Carier, setCarier] = useState('');
  const [SailingDate, setSailingDate] = useState('');
  const [Consignee, setConsignee] = useState('');
  const [Destination, setDestination] = useState('');
  const [BookingNo, setBookingNo] = useState('');
  const [Contatiner, setContatiner] = useState('');
  const [Total, setTotal] = useState('');
  const [Payment, setPayment] = useState('');
  const [TotalDue, setTotalDue] = useState('');

  const getInvoiceDetail = async () => {
    await axios
      .get(`/api/customer/container/invoice`, {
        params: {
          container_id,
        },
      })
      .then((res) => {
        console.log(res);
        //setContainerDetail(res.data.data);
      })
      .catch(() => {});
  };
  useEffect(() => {
    getInvoiceDetail();
  }, []);

  return (
    <section className="container">
      <div>
        <div>
          <img
            src={`/assets/images/InvoiceLogo.png`}
            alt="Logo"
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <div className="row invoice-head mt-5">
        <div className="col-md-4">
          <h4>EMIRATES NBD BANK</h4>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h4 className="invoice-arabic-text">بنك الإمارات دبي الوطني </h4>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-6">
          <b>
            <span style={{ marginRight: '29px' }}>Account Name </span>:
            &nbsp;NEJOUM AL JAZEERA USED CARS LLC
          </b>{' '}
          <br />
          <b>
            <span style={{ marginRight: '100px' }}>IBAN </span>: &nbsp;AE20 0260
            0010 1577 2387 001
          </b>{' '}
          <br />
          <b>
            <span style={{ marginRight: '12px' }}>Account Number </span>:
            1015772387001
          </b>{' '}
          <br />
        </div>
        <div className="col-md-6">
          {/* <center><span>{Name}</span></center> */}
        </div>
      </div>

      <div>
        <hr className="line-for-cut" />
        {/* <ContentCutIcon className="invoice-cut-icon" /> */}
      </div>

      <div className="row invoice-head mt-5">
        <div className="col-md-4">
          <h4>Bill Information</h4>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h4 className="invoice-arabic-text">تفاصىل الفاتورة</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <b>Full Name</b>
        </div>
        <div className="col-md-4">
          <center>
            <span>{Name}</span>
          </center>
        </div>
        <div className="col-md-4">
          <b className="invoice-arabic-text">الاسم بالكامل</b>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <b>Location</b>
        </div>
        <div className="col-md-4">
          <center>
            <span>{Location}</span>
          </center>
        </div>
        <div className="col-md-4">
          <b className="invoice-arabic-text">الموقع</b>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <b>Country</b>
        </div>
        <div className="col-md-4">
          <center>
            <span>{Country}</span>
          </center>
        </div>
        <div className="col-md-4">
          <b className="invoice-arabic-text">البلد</b>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <b>Phone Number</b>
        </div>
        <div className="col-md-4">
          <center>
            <span>{Phone}</span>
          </center>
        </div>
        <div className="col-md-4">
          <b className="invoice-arabic-text">رقم الهاتف</b>
        </div>
      </div>

      <div className="row invoice-head mt-5">
        <div className="col-md-5">
          <h4>Cargo Information</h4>
        </div>
        <div className="col-md-3">
          <h4>Cargo Information</h4>
        </div>
        <div className="col-md-4">
          <h4 className="invoice-arabic-text">تفاصىل الفاتورة</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <span>Shipper/الشاحن</span>
        </div>
        <div className="col-md-4">
          <span>{Shipper}</span>
        </div>
        <div className="col-md-3">
          <span>Consignee/المرسل إلية</span>
        </div>
        <div className="col-md-3">
          <span>{Consignee}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <span>Origin/اصل</span>
        </div>
        <div className="col-md-4">
          <span>{Origin}</span>
        </div>
        <div className="col-md-3">
          <span>Destination/الوجهة</span>
        </div>
        <div className="col-md-3">
          <span>{Destination}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <span>Carier Name/اسم الناقل</span>
        </div>
        <div className="col-md-4">
          <span>{Carier}</span>
        </div>
        <div className="col-md-3">
          <span>Booking Num/رقم الحجز</span>
        </div>
        <div className="col-md-3">
          <span>{BookingNo}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <span>Sailing Date/تاريخ الإبحار</span>
        </div>
        <div className="col-md-4">
          <span>{SailingDate}</span>
        </div>
        <div className="col-md-3">
          <span>Contatiner/حاوية</span>
        </div>
        <div className="col-md-3">
          <span>{Contatiner}</span>
        </div>
      </div>

      <table className="table mt-5">
        <thead className="invoice-table-head mt-5">
          <tr className="arabic-head">
            <th scope="col">وصف</th>
            <th scope="col">مزاد علني</th>
            <th scope="col">سعر</th>
            <th scope="col">سعر</th>
            <th scope="col">توصيل</th>
            <th scope="col">شحن</th>
            <th scope="col">رسوم التاجر</th>
            <th scope="col">تخزين</th>
            <th scope="col">رسوم مؤجلة</th>
            <th scope="col">رسوم EV</th>
            <th scope="col">أضف خدمة</th>
            <th scope="col">المجموع</th>
          </tr>
          <tr className="english-head">
            <th scope="col">Description</th>
            <th scope="col">Auction</th>
            <th scope="col">Price</th>
            <th scope="col">Other</th>
            <th scope="col">Delivery</th>
            <th scope="col">Shipping</th>
            <th scope="col">Dealer Fee</th>
            <th scope="col">Storage</th>
            <th scope="col">Late Fee</th>
            <th scope="col">EV Fee</th>
            <th scope="col">Add Service</th>
            <th scope="col">Total</th>
          </tr>
        </thead>

        {Tables.map((country, key) => (
          <tr key={key}>
            <td className="inv-right-border">{country.name}</td>
            <td className="inv-right-border">{country.capital}</td>
            <td className="inv-right-border">{country.abbreviation}</td>
            <td className="inv-right-border">{country.currency}</td>
            <td className="inv-right-border">{country.id}</td>
            <td className="inv-right-border">{country.name}</td>
            <td className="inv-right-border">{country.phone}</td>
            <td className="inv-right-border">{country.phone}</td>
            <td className="inv-right-border">{country.phone}</td>
            <td className="inv-right-border">{country.phone}</td>
            <td className="inv-right-border">{country.phone}</td>
            <td>{country.phone}</td>
          </tr>
        ))}
        <tr className="inv-last-table">
          <td className="inv-right-border"></td>
          <td className="inv-right-border"></td>
          <td className="inv-right-border"></td>
          <td className="inv-right-border"></td>
          <td className="inv-right-border"></td>
          <td className="inv-right-border"></td>
          <td className="inv-right-border"></td>
          <td className="inv-right-border"></td>
          <td className="inv-right-border"></td>
          <td className="inv-right-border"></td>
          <td className="inv-right-border"></td>
        </tr>
      </table>

      <div className="row total-text">
        <div className="col-md-7"></div>
        <div className="col-md-3">
          <h3>Total /</h3>
          <h3>Payment /</h3>
        </div>
        <div className="col-md-2 total-answer">
          <h3>{Total}</h3>
          <h3>{Payment}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7"></div>
        <div className="col-md-5">
          <hr className="line-for-total" />
        </div>
      </div>

      <div className="row total-text">
        <div className="col-md-7"></div>
        <div className="col-md-3">
          <h3>Balance Due/</h3>
        </div>
        <div className="col-md-2 total-answer">
          <h3>{TotalDue}</h3>
        </div>
      </div>

      <div className="row term-tex">
        <div className="col-md-6">
          <h3>Terms & Condition</h3>
          <p>
            PLEASE BE ADVISED THAT THIS INVOICE HAS BEEN AMENDED ON 2023-05-20.{' '}
          </p>
          <p>
            CASH, MONEY ORDERS, OR THIRD-PARTY PAYMENTS WILL NOT BE ACCEPTED.
          </p>
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-2"></div>
      </div>
    </section>
  );
};
export default ContainerInvoice;
