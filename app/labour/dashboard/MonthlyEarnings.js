"use client";

import {
    FaMoneyBillWave,
    FaCalendarAlt
} from "react-icons/fa";

import "./dashboard.css";


export default function MonthlyEarnings({
    earnings,
    month
}) {


    return (

        <div className="card">

            <h2 className="cardTitle">

                <FaMoneyBillWave />

                {" "}Monthly Earnings

            </h2>


            <div
                style={{
                    marginTop:"20px"
                }}
            >

                <h1
                    style={{
                        fontSize:"42px",
                        color:"#22c55e"
                    }}
                >

                    ₹{earnings || 0}

                </h1>


                <p
                    style={{
                        marginTop:"10px",
                        color:"#cbd5e1"
                    }}
                >

                    <FaCalendarAlt />

                    {" "}

                    {month}

                </p>


                <p
                    style={{
                        marginTop:"10px",
                        color:"#94a3b8"
                    }}
                >

                    Earnings calculated from
                    received payments only.

                </p>


            </div>


        </div>

    );

}
