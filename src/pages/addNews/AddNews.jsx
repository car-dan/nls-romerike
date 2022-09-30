import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../constants/api";

function AddNews() {
  const [file, setFile] = useState(false);
  const [heading, setHeading] = useState();
  const [text, setText] = useState();
  const [dato, setDato] = useState();

  const handleInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChange = (event) => {
    if (event.target.type === "textarea") {
      setText(event.target.value);
    } else if (event.target.type === "text") {
      setHeading(event.target.value);
    } else if (event.target.type === "date") {
      setDato(event.target.value);
      console.log(event.target.value);
    }
  };

  const upload = (e) => {
    let formData = new FormData();

    formData.append("files", file);
    axios({
      method: "post",
      url: BASE_URL + "/upload",
      data: formData,
    }).then(({ data }) => {
      console.log("Succesfully uploaded: ", data[0].id);
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
          console.log(response);
        });
    });
  };

  return (
    <>
      <div className="breadcrumbs">
        <div>
          <h1>Admin</h1>
          <h2>Artikkel</h2>
        </div>
      </div>
      <div>
        <label>Overskrift</label>
        <input id="overskrift" type="text" onChange={handleChange} />
        <label>Dato</label>
        <input id="dato" type="date" onChange={handleChange} />
        <label>Last opp fil</label>
        <input type="file" onChange={handleInputChange} />
        <label>Skriv inn artikkel</label>
        <input id="artikkel" type="text" onChange={handleChange} />
        <button onClick={upload}>Upload Article</button>
      </div>
    </>
  );
}

export default AddNews;
