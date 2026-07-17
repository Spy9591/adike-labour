"use client";

import {
    FaCheckCircle,
    FaTimesCircle,
    FaMoneyBillWave
} from "react-icons/fa";

import "./dashboard.css";


export default function OrderHistory({
    orders
}) {


return (

<div className="card">


<h2 className="cardTitle">

📋 Order History

</h2>



{
orders.length === 0 ?


<p
style={{
color:"#cbd5e1"
}}
>

No Previous Orders

</p>



:


orders.map((order)=>(


<div
key={order.id}
className="booking"
>


<div>


<h3>

{order.ownerName}

</h3>



<p>

Amount:
₹{order.totalAmount || order.amount || 0}

</p>



<p>

Received:
₹{order.receivedAmount || 0}

</p>


</div>



<div>


{
order.status==="completed" ?


<span
style={{
color:"#22c55e",
display:"flex",
alignItems:"center",
gap:"5px"
}}
>

<FaCheckCircle/>

Completed

</span>


:


<span
style={{
color:"#ef4444",
display:"flex",
alignItems:"center",
gap:"5px"
}}
>

<FaTimesCircle/>

Cancelled

</span>


}



</div>


</div>


))


}



</div>

);


}
