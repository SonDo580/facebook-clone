import { Link, Navigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { PATHS } from "@/config/paths";
import { authSelector } from "@/redux/selectors";
import { loginInit } from "@/redux/auth/authSlice";
import { registerOptions } from "./validation";
import "./style.scss";
import Spinner from "@/common/Spinner";

type FormFields = {
  email: string;
  password: string;
};

function Login() {
  const dispatch = useDispatch();
  const { loading, errorMsg, user } = useSelector(authSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    dispatch(loginInit(data));
  };

  if (user) {
    return <Navigate to={PATHS.home} />;
  }

  return (
    <>
      <div className="login">
        <div className="left">
          <div className="logo">
            <img src="/facebook.svg" alt="facebook" />
          </div>
          <p className="description">
            Connect with people around the world on Facebook.
          </p>
        </div>

        <div className="right">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputGroup">
              <input
                type="email"
                placeholder="Email"
                {...register("email", registerOptions.email)}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="inputGroup">
              <input
                type="password"
                placeholder="Password"
                {...register("password", registerOptions.password)}
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            {errorMsg && <p className="formError">{errorMsg}</p>}
            <button>Log in</button>
          </form>

          <hr />
          <div className="buttonContainer">
            <Link to={PATHS.register}>Create new account</Link>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
    </>
  );
}

export default Login;
