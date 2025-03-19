import React, { useEffect, useState } from "react";
import { honda } from "../Api/Allapi";
import { hostip } from "../Api/Commonapi";
import Button from "react-bootstrap/Button";
import { Card as Carddiv } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function Card() {
  const [input, setInput] = useState([]);
  const [todaycap, settodaycap] = useState([]);
  const [uniquedates, setuniqueDates] = useState([]);
  const { seldate } = useParams();
  const navv = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "No Date"; // Handle missing date

    const date = new Date(dateString.split(".")[0] + "Z"); // Fix invalid date issue
    if (isNaN(date)) return "Invalid Date";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  useEffect(() => {
    const header = {
      "content-type": "application/json",
      authorization: `token ${sessionStorage.getItem("token")}`,
    };

    // Temporary data since backend is not set up
    // const tempData = [
    //   { id: 34, desc: "hi", date: "2025-03-02T08:08:10.443629Z", timestampstart: "10:10", timestampend: "10:11", thumb: "background.jpg" },
    //   { id: 35, desc: "hi", date: "2025-03-03T08:08:10.443629Z", timestampstart: "10:10", timestampend: "10:11", thumb: "background.jpg" }
    // ];

    // setInput(tempData);

    honda(header)
      .then((res) => {
        if (res.data) {
          setInput(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [seldate]);

  useEffect(() => {
    if (input.length > 0) {
      let today = new Date().toISOString().split("T")[0];
      if (seldate) {
        today = seldate;
      }

      const filteredData = input.filter((item) => item.date.startsWith(today));
      settodaycap(filteredData);
    }
    const uniqueDates = new Set(input.map((item) => item.date.split("T")[0]));
    setuniqueDates(uniqueDates);
  }, [input]);

  return (
    <div className="container p-5">
      
      <div className="mt-5 pt-4 w-100 d-flex justify-content-between border-bottom border-dark border-bottom-2">
      <h3>{seldate || "Today"}</h3>
      {seldate && 
        <button className="btn btn-secondery-outline" onClick={()=>navv('/home/')}>
          Back
        </button>
      }

      </div>
      <div className="d-flex m-1 flex-wrap gap-2">
        {todaycap.length > 0 ? (
          todaycap.map((item, index) => (
            <Carddiv style={{ width: "250px" }} key={index}>
              {item.thumb && (
                <Carddiv.Img height={"150px"} variant="top" src={item.thumb} />
              )}
              <Carddiv.Body>
                <Carddiv.Text>{item.desc}</Carddiv.Text>
                <Carddiv.Text>{formatDate(item.date)}</Carddiv.Text>
              </Carddiv.Body>
            </Carddiv>
          ))
        ) : (
          <p>Loading or no data available...</p>
        )}
      </div>
      <div className="d-flex flex-wrap gap-2 mt-5">
        {uniquedates && !seldate &&
          [...uniquedates].map((i, j) => (
            <div
              key={j}
              className="d-flex flex-column card p-3"
              onClick={() => navv("/home/" + i)}
            >
              <i className="fa-solid fa-10x fa-folder-open"></i>
              {i}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Card;
