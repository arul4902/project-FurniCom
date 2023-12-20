import React, { useState, useEffect } from "react";
import { UserAuth } from "../../context/authContext";
import { db } from "../../../utils/firebaseConfig";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import CountdownTimer from "./CountdownTimer";
import { TabTitle } from "../../../utils/tabTitlePage";

import "./CheckoutSuccess.css";

const CheckoutSuccess = () => {
  const [order, setOrder] = useState([]);
  const { user } = UserAuth();
  let { orderid } = useParams();
  TabTitle("Lalasia | Checkout Suksess");

  const orderRef = collection(db, "users", `${user?.email}`, "orderHistory");
  const getOrder = query(orderRef, where("orderid", "==", `${orderid}`));
  useEffect(() => {
    onSnapshot(getOrder, (doc) => {
      const userOrder = [];
      doc.forEach((data) => {
        userOrder.push(data.data());
        setOrder(userOrder);
      });
    });
  }, [user?.email]);

  const dataOrder = Array.isArray(order) ? order : null;

  return (
    <div className="ContainerCheckoutSuccess">
      <h2>Checkout Successful</h2>
      <div className="countDownTimer">
        <h3>Make Payment Immediately Within Time</h3>
        <h1>
          <CountdownTimer duration={8 * 60 * 60 * 1000} />
        </h1>
        <p>This Checkout page is only an independent project and does not send any items</p>
      </div>

      {dataOrder.map((data) => (
        <div className="transfer" key={data.pembayaran}>
          <h3>Transfer to Account Number {data.pembayaran}:</h3>
          <label>Online Furniture Store</label>
          <div className="norek">
            {/* <img src={mandiri} alt="logobank" width={100} /> */}
            <h4>0000-0000-0000</h4>
          </div>
          <p>Copy Account Number</p>
        </div>
      ))}

      <hr className="line" />

      <div className="jumlahPembayaran">
        <h3>Amount to be Paid</h3>
        {dataOrder.map((datas) => (
          <h2 key={datas.orderid}>
            Rp. {numberWithCommas(datas.totaltagihan)}
          </h2>
        ))}
      </div>

      <div className="goToHistory">
        <Link to="../orderList">
          <p>View Purchase History</p>
        </Link>
      </div>

      <div className="infoStatement">
        <p>
        The purchase will be <b>automatically</b> canceled if you do not do so
          payment more than <b>the specified time</b> after the process
          Checkout successful
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
