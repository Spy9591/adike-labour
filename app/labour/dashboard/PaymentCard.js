"use client";

import {
  FaMoneyBillWave,
  FaMobileAlt,
  FaCheckCircle,
} from "react-icons/fa";

import "./dashboard.css";


export default function PaymentCard({
  awaitingPayment,
  openPhonePe,
  paymentReceived,
}) {

  if (!awaitingPayment) return null;


  return (

    <div className="paymentCard">

      <h2
        style={{
          display:"flex",
          alignItems:"center",
          gap:"10px"
        }}
      >

        <FaMoneyBillWave/>

        Payment Collection

      </h2>


      <h1
        style={{
          marginTop:"20px"
        }}
      >

        ₹700

      </h1>


      <p
        style={{
          marginTop:"10px",
          opacity:.9
        }}
      >

        Ask customer to scan your QR code
        and complete payment.

      </p>


      <button
        className="paymentBtn"
        onClick={openPhonePe}
      >

        <FaMobileAlt/>

        {" "}Open PhonePe

      </button>



      <button

        className="paymentBtn"

        style={{
          background:"#022c22",
          color:"white",
          marginLeft:"10px"
        }}

        onClick={paymentReceived}

      >

        <FaCheckCircle/>

        {" "}Payment Received

      </button>


    </div>

  );

}
