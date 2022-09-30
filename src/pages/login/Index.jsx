import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../../components/common/FormError";
import { BASE_URL } from "../../constants/api";
import AuthContex from "../../components/contex/AuthContex";

const url = BASE_URL + "/auth/local";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContex);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);
    const apiData = {
      identifier: data.username,
      password: data.password,
    };

    try {
      const response = await axios.post(url, apiData);
      console.log("response", response.data);
      setAuth(response.data);
      navigate("/");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="breadcrumbs">
        <div className="breadcrumbs_text">
          <h1>Log inn</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <FormError>{loginError}</FormError>}
        <fieldset disabled={submitting}>
          <div>
            <label />
            <input
              name="username"
              placeholder="Username"
              {...register("username", {
                required: "Required",
              })}
            />
            {errors.username && (
              <FormError>{errors.username.message}</FormError>
            )}
          </div>

          <div>
            <label />
            <input
              name="password"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Required",
              })}
            />
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </div>
          <button>{submitting ? "Loggin in..." : "Login"}</button>
        </fieldset>
      </form>
    </>
  );
}
