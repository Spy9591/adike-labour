"use client";


import {
FaMoneyBillWave,
FaMobileAlt
}
from "react-icons/fa";


import "./dashboard.css";



export default function PaymentCard({

awaitingPayment,

runningBooking,

openPhonePe

}){


if(!awaitingPayment || !runningBooking)

return null;



return (

<div className="paymentCard">


<h2>

<FaMoneyBillWave/>

{" "}Payment Pending

</h2>



<h1
style={{
marginTop:"20px"
}}
>

₹{runningBooking.totalAmount || 700}

</h1>



<p
style={{
marginTop:"10px"
}}
>

Owner:

{" "}

<strong>

{runningBooking.ownerName}

</strong>

</p>


<p>

Payment is pending from this owner.

</p>



<button

className="paymentBtn"

onClick={openPhonePe}

>

<FaMobileAlt/>

{" "}Open PhonePe

</button>



</div>

);


}
