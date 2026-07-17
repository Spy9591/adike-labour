"use client";


import {
    FaUser,
    FaPhone,
    FaRupeeSign
} from "react-icons/fa";


import "./dashboard.css";


export default function PendingPayments({

payments,
receivePayment

}) {


return (

<div className="card">


<h2 className="cardTitle">

💳 Pending Payments

</h2>



{
payments.length===0 ?


<p
style={{
color:"#cbd5e1"
}}
>

No Pending Payments

</p>



:


payments.map((item)=>(


<div
key={item.id}
className="booking"
>


<div>


<h3>

<FaUser/>

{" "}

{item.ownerName}

</h3>


<p>

<FaPhone/>

{" "}

{item.ownerPhone || "No Number"}

</p>



<p
style={{
color:"#facc15",
marginTop:"10px"
}}
>

Pending:

₹{item.remainingAmount}

</p>



</div>



<button

className="acceptBtn"

onClick={()=>receivePayment(item)}

>

<FaRupeeSign/>

Receive

</button>



</div>


))


}



</div>


);


}
