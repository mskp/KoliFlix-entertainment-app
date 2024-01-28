// Importing necessary dependencies from React and React Router
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "@/assets/logo.png";

// Importing custom hooks, components, and utilities
import { useSignupMutation } from "@/redux/api/authApi";
import { signupValidationSchema } from "./utils/validationSchemas";
import { camelCaseToSentenceCase } from "./utils";
import ErrorAlert from "./components/ErrorAlert";
import InputElement from "./components/InputElement";
import ButtonElement from "./components/ButtonElement";

// Signup component definition
export default function Signup() {
  // React Router's navigate hook
  const navigate = useNavigate();

  // Using the signup mutation from the API slice
  const [signup, { isLoading, reset, error, isError }] = useSignupMutation();

  // Handling signup logic
  const handleSignup = async ({ fullName, email, password }) => {
    try {
      // Making the signup mutation call and unwrapping the result
      const result = await signup({ fullName, email, password }).unwrap();

      // Displaying a success toast message and navigating to login page
      toast.success(result.message, { id: "signup-toast" });
      navigate("/account/login", { replace: true });
    } catch (error) {
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
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleSignup,
    validationSchema: signupValidationSchema,
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
    <main className="min-h-screen flex flex-col bg-cover items-center justify-center px-6 py-4 mx-auto">
      <div className="w-full sm:max-w-md sm:p-8 flex flex-col gap-4 py-8">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl text-gray-500 flex flex-col items-center justify-center gap-4 tracking-tighter">
            <img className="w-8" src={logo} alt="Koliflix" />
            <p>Create new account</p>
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

          {/* Rendering the signup button */}
          <ButtonElement
            disabled={
              isLoading || Object.keys(values).some((key) => !values[key])
            }
            text={isLoading ? "Signing up..." : "Signup"}
          />

          {/* Displaying link to login page */}
          <div className="text-sm text-center p-2 rounded-lg">
            Already have an account?{" "}
            <Link
              to="/account/login"
              className="text-blue-600 hover:underline"
              replace={true}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
