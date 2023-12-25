import React, { useEffect, useState, useRef } from "react";
import { UserAuth } from "../../context/authContext";
import { db } from "../../../utils/firebaseConfig";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import ReactToPrint from "react-to-print";
import { useParams } from "react-router-dom";

import "./Invoice.css";
import Logo from "../../assets/Logo.png";
import { TabTitle } from "../../../utils/tabTitlePage";

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const { user } = UserAuth();
  let { invoice } = useParams();
  const getInvoice = invoice.split("-").join("/");
  const componentRef = useRef();
  TabTitle(`Lalasia | ${getInvoice}`);


  const invoiceDataRef = collection(db, "users", `${user?.email}`, "orderHistory");
  const getInvoiceData = query(invoiceDataRef, where("invoice", "==", getInvoice));
  useEffect(() => {
    onSnapshot(getInvoiceData, (doc) => {
      const dataInvoice = [];
      doc.forEach((data) => {
        dataInvoice.push(data.data());
        setInvoiceData(dataInvoice);
      });
    });
  }, [user?.email]);
  const BuyInvoice = Array.isArray(invoiceData) ? invoiceData : null;

  return (
    <React.Fragment>
      <div className="navbarInvoice">
        <ReactToPrint
          trigger={() => {
            return <button>Print Invoice</button>;
          }}
          content={() => componentRef.current}
          documentTitle="Invoice Pembelian"
        />
      </div>
      {BuyInvoice.map((data) => (
        <div className="containerInvoice" ref={componentRef}>
          <div className="logoNinvoice">
            <img src={Logo} alt="logo" />
            <div className="invoiceProduct">
              <h5>INVOICE</h5>
              <p>{data.invoice}</p>
            </div>
          </div>

          <div className="peneribitan">
            <div className="diterbikanAtasNama">
              <h5>PUBLISHED ON BEHALF OF</h5>
              <p>
              Seller: <b>Online Furniture Store</b>
              </p>
            </div>
            {data.address.map((alamat) => (
              <div className="detailPembeli">
                <h5>FOR</h5>
                <p>Buyer : {alamat.penerima}</p>
                <p>Purchase date : {data.dateBuy}</p>
                <div className="alamatPenerima">
                  <p>
                  Shipping address : {alamat.penerima}, {alamat.nomorhp},{" "}
                    {alamat.alamat}, {alamat.kota}, {alamat.kodepos}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <span>
            <hr />
          </span>

          <div className="tableHeader">
            <div className="tableHeaderNamaProduk">
              <h5>  PRODUCT INFO </h5>
            </div>
            <div className="jumlahBarang">
              <h5>  QUANTITY </h5>
            </div>
            <div className="hargaSatuan">
              <h5> UNIT PRICE </h5>
            </div>
            <div className="totalHargaBelanja">
              <h5> TOTAL PRICE </h5>
            </div>
          </div>
          
          <span>
            <hr />
          </span>

          {data.itemCheckout.map((product) => (
            <div className="productBuyList">
              <div className="tableHeaderNamaProduk">
                <h5>{product.nama}</h5>
              </div>
              <div className="jumlahBarang">
                <p>{product.qty}</p>
              </div>
              <div className="hargaSatuan">
                <p>Rs. {numberWithCommas(product.harga)}</p>
              </div>
              <div className="totalHargaBelanja">
                <p>Rs. {numberWithCommas(product.harga * product.qty)}</p>
              </div>
            </div>
          ))}

          <span>
            <hr className="lineBreak" />
          </span>

          <div className="pembayaran">
            <div className="totalHargaOrder">
              <h5>Total priceA ({data.totalitem} Goods)</h5>
              <h5>Rs. {numberWithCommas(data.totalharga)}</h5>
            </div>

            <div className="totalOngkirOrder">
              <p>Total Shipping Cost</p>
              <p>Rs. {numberWithCommas(data.ongkir)}</p>
            </div>

            <hr className="lineBreak" />

            <div className="totalBelanjaOrder">
              <h5>TOTAL SPENDING</h5>
              <h5>Rs. {numberWithCommas(data.totaltagihan)}</h5>
            </div>
            <h2>NOT YET PAID OFF</h2>
          </div>

          <span>
            <hr className="lineBreak" />
          </span>

          <div className="kurirNbank">
            <div className="kurirOrder">
              <p>Courier:</p>
              <h5>{data.kurir}</h5>
            </div>
            <div className="pembayaranOrder">
              <p>Payment method</p>
              <h5>{data.pembayaran}</h5>
            </div>
          </div>

          <span>
            <hr className="lineBreak" />
          </span>

          <div className="statement">
            <p>
            This invoice is only a dummy for independent projects, not sent
              any item
            </p>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Invoice;

