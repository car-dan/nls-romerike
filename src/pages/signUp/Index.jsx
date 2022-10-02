import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import SignUpForm from "./Form";
import { BASE_URL } from "../../constants/api";
import Heading from "../../components/layout/Heading";

function SignUp() {
  let params = useParams();
  const [kurs, setKurs] = useState([]);
  console.log(params.id);

  const fetchDetails = async () => {
    const data = await fetch(BASE_URL + `/kurs/${params.id}?populate=*`);
    const response = await data.json();
    console.log(response.data.attributes);
    setKurs(response.data.attributes);
  };

  useEffect(() => {
    fetchDetails().catch(console.error);
  }, [params.id]);

  const startTime = moment(kurs.start_tid, "hh:mm:ss").format("hh:mm");
  const endTime = moment(kurs.slutt_tid, "hh:mm:ss").format("hh:mm");

  return (
    <>
      <Heading title="Kurs" />
      <SignUpForm
        kurs={kurs.sted}
        type={kurs.Type_kurs}
        startTime={startTime}
        endTime={endTime}
      />
    </>
  );
}

export default SignUp;
