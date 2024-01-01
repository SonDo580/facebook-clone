import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { PATHS } from "@/config/paths";
import { Gender, Month } from "@/constants";
import { getDays, getStringMonths, getYears } from "@/utils/datetime";
import { authSelector } from "@/redux/selectors";
import { registerInit } from "@/redux/auth/authSlice";
import Spinner from "@/common/Spinner";
import { registerOptions } from "./validation";
import "./style.scss";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDay: number;
  birthMonth: Month;
  birthYear: number;
  gender: Gender;
};

const months = getStringMonths();
const days = getDays();
const years = getYears();

const processData = (data: FormFields) => {
  data.birthDay = Number(data.birthDay);
  data.birthMonth = Number(data.birthMonth);
  data.birthYear = Number(data.birthYear);
};

function Register() {
  const dispatch = useDispatch();
  const { loading, errorMsg, user } = useSelector(authSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    processData(data);
    dispatch(registerInit(data));
  };

  if (user) {
    return <Navigate to={PATHS.home} />;
  }

  return (
    <>
      <div className="register">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="logo">
            <img src="/facebook.svg" alt="facebook" />
          </div>

          <div className="formGroup">
            <div className="inputGroup">
              <input
                placeholder="First name"
                {...register("firstName", registerOptions.firstName)}
              />
              {errors.firstName && (
                <p className="error">{errors.firstName.message}</p>
              )}
            </div>

            <div className="inputGroup">
              <input
                placeholder="Last name"
                {...register("lastName", registerOptions.lastName)}
              />
              {errors.lastName && (
                <p className="error">{errors.lastName.message}</p>
              )}
            </div>
          </div>

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

          <div>
            <p className="field">Date of birth</p>
            <div className="formGroup">
              <select {...register("birthDay")}>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              <select {...register("birthMonth")}>
                {months.map((month) => (
                  <option
                    key={month}
                    value={Month[month as keyof typeof Month]}
                  >
                    {month}
                  </option>
                ))}
              </select>

              <select {...register("birthYear")}>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <p className="field">Gender</p>
            {errors.gender && <p className="error">{errors.gender.message}</p>}
            <div className="formGroup">
              {Object.keys(Gender).map((gender) => (
                <label key={gender} className="option">
                  <span>{gender}</span>
                  <input
                    type="radio"
                    value={gender}
                    {...register("gender", registerOptions.gender)}
                  />
                </label>
              ))}
            </div>
          </div>

          {errorMsg && <p className="formError">{errorMsg}</p>}
          <button>Sign up</button>
          <p>
            Already had an account? <Link to={PATHS.login}>Log in here</Link>
          </p>
        </form>
      </div>
      {loading && <Spinner />}
    </>
  );
}

export default Register;
