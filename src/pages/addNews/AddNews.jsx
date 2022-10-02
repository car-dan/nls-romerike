import axios from "axios";
import { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { BASE_URL } from "../../constants/api";
import AuthContex from "../../components/contex/AuthContex";

import "../signUp/SignUp.module.scss";
import Heading from "../../components/layout/Heading";

function AddNews() {
  const [file, setFile] = useState(false);
  const [heading, setHeading] = useState();
  const [text, setText] = useState();
  const [dato, setDato] = useState();
  const [preview, setPreview] = useState();
  const [buttonText, setButtonText] = useState("Oppdater");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(AuthContex);

  useEffect(() => {
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const onFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    setFile(e.target.files[0]);
  };

  const handleChange = (event) => {
    if (event.target.type === "textarea") {
      setText(event.target.value);
    } else if (event.target.type === "text") {
      setHeading(event.target.value);
    } else if (event.target.type === "date") {
      setDato(event.target.value);
    }
  };

  const upload = (e) => {
    e.preventDefault();
    let formData = new FormData();
    setButtonText("Sending...");

    formData.append("files", file);

    axios({
      method: "post",
      url: BASE_URL + "/upload",
      data: formData,
    }).then(({ data }) => {
      axios
        .post(BASE_URL + "/articles", {
          data: {
            Title: heading,
            text: text,
            Date: dato,
            Image: data[0].id,
          },
        })
        .then((response) => {
          if (response?.status === 200) {
            setButtonText("Sendt");
            setTimeout(function () {
              setButtonText("Oppdater");
            }, 2000);
          } else {
            alert(response?.message);
          }
        });
    });
  };

  return (
    <>
      <Heading title="Admin" subtitle="Nyhet" />
      <form>
        <label>Overskrift</label>
        <input id="overskrift" type="text" onChange={handleChange} />
        <label>Dato</label>
        <input id="dato" type="date" onChange={handleChange} />
        <label>Last opp fil</label>
        <div className="preview">
          <input type="file" name="file" onChange={onFile} />
          <img src={preview} alt="preview" />
        </div>
        <label>Skriv inn artikkel</label>
        <TextareaAutosize id="artikkel" type="text" onChange={handleChange} />
        <button onClick={upload}>{buttonText}</button>
      </form>
    </>
  );
}

export default AddNews;
