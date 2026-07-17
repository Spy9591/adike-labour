"use client";


import {
useEffect,
useState
}
from "react";


import {
useRouter
}
from "next/navigation";


import {

doc,
getDoc,
updateDoc,
collection,
query,
where,
getDocs

}

from "firebase/firestore";


import { db } from "../../firebase";



import DashboardHeader
from "./DashboardHeader";


import StatsCards
from "./StatsCards";


import BookingRequests
from "./BookingRequests";


import RunningJob
from "./RunningJob";


import PaymentCard
from "./PaymentCard";


import MonthlyEarnings
from "./MonthlyEarnings";


import PendingPayments
from "./PendingPayments";


import OrderHistory
from "./OrderHistory";


import LoadingScreen
from "./LoadingScreen";


import "./dashboard.css";





export default function Dashboard(){



const router=useRouter();



const [labour,setLabour]=useState(null);


const [bookings,setBookings]=useState([]);


const [runningBooking,setRunningBooking]=useState(null);


const [pendingPayments,setPendingPayments]=useState([]);


const [orders,setOrders]=useState([]);


const [monthlyEarnings,setMonthlyEarnings]=useState(0);





useEffect(()=>{

loadLabour();

},[]);







const logout=()=>{


localStorage.removeItem(
"labourId"
);


router.replace("/login");


};







const loadLabour=async()=>{


const labourId=
localStorage.getItem(
"labourId"
);



if(!labourId)
return;



const snap=
await getDoc(

doc(
db,
"labours",
labourId
)

);



if(snap.exists()){


setLabour({

id:snap.id,

...snap.data()

});


loadBookings(labourId);

loadRunning(labourId);

loadPendingPayments(labourId);

loadOrders(labourId);

loadMonthlyEarnings(labourId);


}



};









const loadBookings=async(id)=>{


const q=query(

collection(db,"bookings"),

where(
"labourId",
"==",
id
),

where(
"status",
"==",
"pending"
)

);



const snap=
await getDocs(q);



let list=[];


snap.forEach((item)=>{


list.push({

id:item.id,

...item.data()

});


});


setBookings(list);


};









const loadRunning=async(id)=>{


const q=query(

collection(db,"bookings"),

where(
"labourId",
"==",
id
),

where(
"status",
"==",
"accepted"
)

);



const snap=
await getDocs(q);



if(!snap.empty){


setRunningBooking({

id:snap.docs[0].id,

...snap.docs[0].data()

});


}

else{

setRunningBooking(null);

}



};









const loadPendingPayments=async(id)=>{


const q=query(

collection(db,"bookings"),

where(
"labourId",
"==",
id
),

where(
"paymentStatus",
"==",
"pending"
)

);



const snap=
await getDocs(q);



let list=[];



snap.forEach((item)=>{


list.push({

id:item.id,

...item.data()

});


});



setPendingPayments(list);


};









const loadOrders=async(id)=>{


const q=query(

collection(db,"bookings"),

where(
"labourId",
"==",
id
)

);



const snap=
await getDocs(q);



let list=[];


snap.forEach((item)=>{


const data=item.data();


if(
data.status==="completed" ||
data.status==="cancelled"
)

{


list.push({

id:item.id,

...data

});


}


});



setOrders(list);


};









const loadMonthlyEarnings=async(id)=>{


const q=query(

collection(db,"bookings"),

where(
"labourId",
"==",
id
),

where(
"paymentStatus",
"==",
"paid"
)

);



const snap=
await getDocs(q);



let total=0;



const currentMonth=
new Date().getMonth();



snap.forEach((item)=>{


const data=item.data();



if(data.paymentDate){


const date=
data.paymentDate
.toDate();



if(
date.getMonth()
===
currentMonth
)

{


total +=
data.receivedAmount || 0;


}


}



});



setMonthlyEarnings(total);


};









const toggleDuty=()=>{


navigator.geolocation.getCurrentPosition(

async(position)=>{


const id=
localStorage.getItem(
"labourId"
);



await updateDoc(

doc(
db,
"labours",
id
),

{


onDuty:
!labour.onDuty,


latitude:
position.coords.latitude,


longitude:
position.coords.longitude


}

);



loadLabour();



}

);


};









const acceptBooking=async(id)=>{


const labourId=
localStorage.getItem(
"labourId"
);



await updateDoc(

doc(
db,
"bookings",
id
),

{


status:"accepted",

startTime:new Date()


}

);



await updateDoc(

doc(
db,
"labours",
labourId
),

{


busy:true,

currentBooking:id


}

);



loadLabour();


};









const rejectBooking=async(id)=>{


await updateDoc(

doc(
db,
"bookings",
id
),

{

status:"rejected"

}

);


loadLabour();


};









const completeWork=async()=>{


if(!runningBooking)
return;



await updateDoc(

doc(
db,
"bookings",
runningBooking.id
),

{


status:"completed",

paymentStatus:"pending",

totalAmount:700,

receivedAmount:0,

remainingAmount:700,

completedAt:new Date()


}

);



loadLabour();


};









const receivePayment=async(payment)=>{


await updateDoc(

doc(
db,
"bookings",
payment.id
),

{


paymentStatus:"paid",

receivedAmount:
payment.remainingAmount,

remainingAmount:0,

paymentDate:new Date()


}

);



loadLabour();


};









const cancelOrder=async()=>{


if(!runningBooking)
return;



await updateDoc(

doc(
db,
"bookings",
runningBooking.id
),

{

status:"cancelled"

}

);



loadLabour();


};









const openPhonePe=()=>{


window.location.href=
"phonepe://";


};









if(!labour)

return <LoadingScreen/>;







return (

<div className="dashboard">



<DashboardHeader

labour={labour}

toggleDuty={toggleDuty}

logout={logout}

/>





<StatsCards

labour={{

...labour,

monthlyEarnings

}}

pendingAmount={

pendingPayments.reduce(

(a,b)=>

a+(b.remainingAmount||0)

,0)

}

/>





<MonthlyEarnings

earnings={monthlyEarnings}

month={
new Date()
.toLocaleString(
"default",
{
month:"long"
}
)
}

/>






<BookingRequests

bookings={bookings}

acceptBooking={acceptBooking}

rejectBooking={rejectBooking}

/>







<RunningJob

runningBooking={runningBooking}

completeWork={completeWork}

cancelOrder={cancelOrder}

/>







<PendingPayments

payments={pendingPayments}

receivePayment={receivePayment}

/>







<PaymentCard

awaitingPayment={
!!pendingPayments.length
}

runningBooking={
pendingPayments[0]
}

openPhonePe={openPhonePe}

/>







<OrderHistory

orders={orders}

/>



</div>

);


}
