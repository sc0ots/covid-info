import React, { useEffect, useState } from 'react'
import "../../css/validation.css"

function ValidationErr({ value, nameType, id }) {
    const [errorShow, setErrorShow] = useState("");
    const [idDiv, setIdDiv] = useState("");


    useEffect(() => {
        switch (nameType) {
            case "name":
                if (id == "name" && (value.length < 2 || value.length > 50) && value.length != 0) {
                    setErrorShow("Name input must have 2-50 characters");
                }
                else if (value.length == 0) {
                    setErrorShow("Input is required");
                }
                else setErrorShow("");
                setIdDiv(nameType)
                break;
            case "citizen_id":
                if (id == "citizen_id" && (value.length < 2 || value.length > 50) && value.length != 0) {
                    setErrorShow("Citizen input must have 2-50 characters");
                }
                else if (value.length == 0) {
                    setErrorShow("Input is required");
                }
                else setErrorShow("");
                setIdDiv(nameType)

                break;
            case "yob":
                if (id == "yob" && (value.length < 2 || value.length > 50) && value.length != 0) {
                    setErrorShow("Yob input must have 2-50 characters");
                }
                else if (value.length == 0) {
                    setErrorShow("Input is required");
                }
                else setErrorShow("");
                setIdDiv(nameType)

                break;
            case "address":
                if (id == "address" && (value.length < 2 || value.length > 50) && value.length != 0) {
                    setErrorShow("Address input must have 2-50 characters");
                }
                else if (value.length == 0) {
                    setErrorShow("Input is required");
                }
                else setErrorShow("");
                setIdDiv(nameType)

                break;
            case "temp":
                if (id == "temp" && (value.length < 2 || value.length > 50) && value.length != 0) {
                    setErrorShow("Temp input must have 2-50 characters");
                }
                else if (value.length == 0) {
                    setErrorShow("Input is required");
                }
                else setErrorShow("");
                setIdDiv(nameType)

                break;
            case "heart_rate":
                if (id == "heart_rate" && (value.length < 2 || value.length > 50) && value.length != 0) {
                    setErrorShow("Heart rate input must have 2-50 characters");
                }
                else if (value.length == 0) {
                    setErrorShow("Input is required");
                }
                else setErrorShow("");
                setIdDiv(nameType)

                break;
            case "spo2":
                if (id == "spo2" && (value.length < 2 || value.length > 50) && value.length != 0) {
                    setErrorShow("Spo2 rate input must have 2-50 characters");
                }
                else if (value.length == 0) {
                    setErrorShow("Input is required");
                }
                else setErrorShow("");
                setIdDiv(nameType)

                break;
            case "tlc":
                if (id == "tlc" && (value.length < 2 || value.length > 50) && value.length != 0) {
                    setErrorShow("Tlc rate input must have 2-50 characters");
                }
                else if (value.length == 0) {
                    setErrorShow("Input is required");
                }
                else setErrorShow("");
                setIdDiv(nameType)

                break;
            case "day_start":
                if (value.length == 0) {
                    setErrorShow("Input is required");
                }
                else setErrorShow("");
                setIdDiv(nameType)

                break;
            case "day_end":
                if (value.length == 0) {
                    setErrorShow("Input is required");
                }
                else setErrorShow("");
                setIdDiv(nameType)

                break;
            default:
                break;
        }
    }, [value, nameType])

    useEffect(() => {
        if (idDiv) {
            document.getElementById(idDiv).style.display = "block";
        }
    }, [idDiv])

    return (
        <div >
            <div className="validation" id={id} style={{ display: "none" }}>
                {errorShow}
            </div>
        </div>

    )
}

export default ValidationErr
