// Importing necessary dependencies from React and React Router
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

// Importing custom hooks, components, and utilities
import { useLoginMutation } from "@/redux/api/authApi";
import { loginValidationSchema } from "./utils/validationSchemas";
import { camelCaseToSentenceCase } from "./utils";
import ErrorAlert from "./components/ErrorAlert";
import InputElement from "./components/InputElement";
import ButtonElement from "./components/ButtonElement";

// Login component definition
export default function Login() {
  // Custom hook to manage authentication state
  const { setAuth } = useAuth();

  // React Router's navigate hook
  const navigate = useNavigate();

  // Using the login mutation from the API slice
  const [login, { isError, isLoading, data, error, reset }] =
    useLoginMutation();

  // Handling login logic
  const handleLogin = async (values) => {
    try {
      // Making the login mutation call and unwrapping the result
      const result = await login(values).unwrap();

      // If access token is received, set authentication and navigate to home
      if (result?.accessToken) {
        setAuth(data);
        navigate("/", { replace: true });
      }
    } catch (err) {
      // Clearing the console for any errors
      console.clear();
    }
  };

  // Formik hook for form management and validation
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    setErrors,
    touched,
    submitCount,
    initialValues,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: loginValidationSchema,
  });

  // Input fields configuration based on form initial values
  const inputFields = Object.keys(initialValues).map((fieldName) => ({
    id: fieldName,
    placeholder: camelCaseToSentenceCase(fieldName),
    type: fieldName.toLowerCase().includes("password") ? "password" : "text",
  }));

  // Resetting form errors on button click
  const handleReset = () => {
    setErrors({});
    reset();
  };

  // JSX rendering
  return (
    <main className="min-h-screen flex flex-col bg-cover items-center justify-center px-6 py-8 mx-auto">
      <div className="w-full sm:max-w-md p-4 sm:p-8 flex flex-col gap-8">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl text-gray-500 flex flex-col items-center justify-center gap-4 tracking-tighter">
            <img className="w-8" src={logo} alt="logo" />
            <p>Sign in</p>
          </h1>
          {/* Displaying error alert if there are form errors or API error */}
          {((touched && submitCount > 0 && Object.keys(errors).length > 0) ||
            isError) && (
            <ErrorAlert
              error={Object.values(errors)[0] ?? error?.data?.message}
              onClick={handleReset}
            />
          )}

          {/* Mapping over input fields and rendering InputElement for each */}
          {inputFields.map((field) => (
            <InputElement
              key={field.id}
              field={field}
              handleChange={handleChange}
              values={values}
            />
          ))}
          {/* Rendering the login button */}
          <ButtonElement
            disabled={
              isLoading || Object.keys(values).some((key) => !values[key])
            }
            text={isLoading ? "Logging in..." : "Login"}
          />
          {/* Displaying link to signup page */}
          <div className="text-sm text-center p-2 rounded-lg">
            New here?{" "}
            <Link
              to="/account/signup"
              className="text-blue-600 hover:underline"
              replace={true}
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
