import React, { useEffect, useState, useContext } from "react";
import AuthContex from "../../components/contex/AuthContex";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/api";

import "../signUp/SignUp.module.scss";
import Heading from "../../components/layout/Heading";

function EditNewsArticle() {
  const [auth, setAuth] = useContext(AuthContex);
  const [newsArticle, setNewsArticle] = useState([]);
  let [text, setText] = useState();
  let [heading, setHeading] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [buttonText, setButtonText] = useState("Oppdater");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();

  const url = BASE_URL + `/articles/${params.id}?populate=*`;

  useEffect(
    function () {
      async function getArticle() {
        try {
          const respons = await axios.get(url);

          setNewsArticle(respons.data.data);
          setPreview(respons.data.data.attributes.Image.data.attributes.url);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      getArticle();
    },
    [params.id]
  );

  useEffect(() => {
    if (!selectedFile) {
      console.log(preview);

      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (event) => {
    if (event.target.type === "textarea") {
      setText(event.target.value);
    } else if (event.target.type === "text") {
      setHeading(event.target.value);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Sending...");

    let newText;
    let newHeading;
    const formData = new FormData();

    formData.append("File", selectedFile);

    if (typeof text === "undefined") {
      newText = newsArticle.attributes.text;
    } else {
      newText = text;
    }
    if (typeof heading === "undefined") {
      newHeading = newsArticle.attributes.Title;
    } else {
      newHeading = heading;
    }

    axios
      .put(url, {
        data: {
          Title: newHeading,
          text: newText,
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
  }

  if (loading) return <div>Laster artikkel...</div>;
  if (error) return <div>Vennligs prøv igjen senere</div>;

  return (
    <>
      <Heading title="Admin" subtitle="Nyhet" />
      <form>
        <label>Overskrift: </label>
        <input
          type="text"
          name="overskrift"
          onChange={handleChange}
          defaultValue={newsArticle.attributes.Title}
        />
        <div className="preview">
          <input type="file" name="file" onChange={onSelectFile} />
          <img src={preview} alt="preview" />
        </div>
        <label htmlFor="tekst">Artikkel: </label>
        <TextareaAutosize
          type="textarea"
          defaultValue={newsArticle.attributes.text}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>{buttonText}</button>
      </form>
      <div className="article"></div>
    </>
  );
}

export default EditNewsArticle;
