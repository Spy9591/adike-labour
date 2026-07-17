"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase";

import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import BookingRequests from "./BookingRequests";
import RunningJob from "./RunningJob";
import PaymentCard from "./PaymentCard";
import LoadingScreen from "./LoadingScreen";

import "./dashboard.css";


export default function Dashboard() {


  const router = useRouter();


  const [labour,setLabour] = useState(null);

  const [bookings,setBookings] = useState([]);

  const [runningBooking,setRunningBooking] =
  useState(null);

  const [awaitingPayment,setAwaitingPayment] =
  useState(false);



  useEffect(()=>{

    loadLabour();

  },[]);




  // LOAD ACTIVE JOB

  const loadRunningBooking = async(labourId)=>{


    const q=query(

      collection(db,"bookings"),

      where(
        "labourId",
        "==",
        labourId
      ),

      where(
        "status",
        "==",
        "accepted"
      )

    );


    const snapshot =
    await getDocs(q);



    if(!snapshot.empty){


      setRunningBooking({

        id:snapshot.docs[0].id,

        ...snapshot.docs[0].data()

      });


    }

    else{


      setRunningBooking(null);


    }


  };





  // LOAD REQUESTS

  const loadBookings = async(labourId)=>{


    const q=query(

      collection(db,"bookings"),

      where(
        "labourId",
        "==",
        labourId
      ),

      where(
        "status",
        "==",
        "pending"
      )

    );



    const snapshot =
    await getDocs(q);



    let list=[];



    snapshot.forEach((item)=>{


      list.push({

        id:item.id,

        ...item.data()

      });


    });



    setBookings(list);


  };






  // LOAD LABOUR PROFILE

  const loadLabour = async()=>{


    const labourId =
    localStorage.getItem("labourId");



    if(!labourId)
    return;



    const snap =
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

      loadRunningBooking(labourId);


    }


  };





  // LOGOUT

  const logout=()=>{


    localStorage.removeItem(
      "labourId"
    );


    router.replace("/login");


  };





  // DUTY TOGGLE

  const toggleDuty=()=>{


    navigator.geolocation.getCurrentPosition(

      async(position)=>{


        const labourId =
        localStorage.getItem(
          "labourId"
        );



        await updateDoc(

          doc(
            db,
            "labours",
            labourId
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


      },


      ()=>{

        alert(
          "Please enable location"
        );

      }

    );


  };






  // ACCEPT BOOKING

  const acceptBooking=async(id)=>{


    const labourId =
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



    alert(
      "Booking Accepted"
    );


    loadLabour();


  };






  // REJECT

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







  // CANCEL JOB

  const cancelOrder=async()=>{


    if(!runningBooking)
    return;



    const labourId =
    localStorage.getItem(
      "labourId"
    );



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



    await updateDoc(

      doc(
        db,
        "labours",
        labourId
      ),

      {

        busy:false,

        currentBooking:null

      }

    );



    loadLabour();


  };







  // COMPLETE WORK

  const completeWork=async()=>{


    if(!runningBooking)
    return;



    const labourId =
    localStorage.getItem(
      "labourId"
    );



    await updateDoc(

      doc(
        db,
        "bookings",
        runningBooking.id
      ),

      {

        status:"completed",

        paymentStatus:"pending",

        amount:700

      }

    );



    await updateDoc(

      doc(
        db,
        "labours",
        labourId
      ),

      {

        busy:false,

        currentBooking:null,


        completedJobs:
        (labour.completedJobs || 0)+1

      }

    );



    setAwaitingPayment(true);



    loadLabour();


  };







  const openPhonePe=()=>{


    window.location.href =
    "phonepe://";


  };







  const paymentReceived=async()=>{


    const labourId =
    localStorage.getItem(
      "labourId"
    );



    await updateDoc(

      doc(
        db,
        "labours",
        labourId
      ),

      {

        walletBalance:
        (labour.walletBalance || 0)+700

      }

    );



    setAwaitingPayment(false);


    loadLabour();


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

        labour={labour}

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





      <PaymentCard

        awaitingPayment={awaitingPayment}

        openPhonePe={openPhonePe}

        paymentReceived={paymentReceived}

      />



    </div>

  );

}
