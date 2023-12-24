import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { PATHS } from "../../config/paths";
import "./style.scss";

type FormFields = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
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
              {...register("email", { required: "Email is required!" })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="inputGroup">
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required!" })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          <button>Log in</button>
        </form>

        <hr />
        <div className="buttonContainer">
          <Link to={PATHS.register}>Create new account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
