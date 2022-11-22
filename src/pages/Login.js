import Button from "components/button/Button";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputHook from "../components/form/InputHook";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckboxHook from "../components/form/CheckboxHook";


const schema = yup.object({
  email: yup.string().email("Please enter a valid email").required("Please enter your email"),
  password: yup
    .string()
    .matches(
     
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .min(8, "Password must be 8 characters or more")
    .required("Please enter your password"), 
    remember: yup
    .boolean(),
});

const Login = () => {
  const {
    handleSubmit,
    formState: { errors, isValid,isSubmitting },
    control,    
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onchange",
    defaultValues: {
      remember: false,
    }, 
  });



  const submitHandler = async(values) => {  
    if(!isValid) return
    await signInWithEmailAndPassword(auth,values.email, values.password)
    reset({
      email: "",
      password: ""
    })
    navigate("/")
  };
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState("");
  onAuthStateChanged(auth, (currentUser) => {
    setUserInfo(currentUser);
  });
  useEffect(() =>{
    if(userInfo)  navigate('/')
  },[navigate, userInfo])
  return (
    <div className="page-container lg:w-screen  h-[600px] flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="border border-primary rounded-lg p-5 block w-[500px]"
      >
        <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="email" className="text-xl cursor-pointer text-white">
          Email Address
        </label>
        <InputHook
          name="email"
          id="email"
          placeholder="Enter your email"
          control={control}
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        </div>
        <div className="flex flex-col gap-3 mb-10">
        <label htmlFor="password" className="text-lg cursor-pointer text-white">
          Password
        </label>
        <InputHook
          name="password"
          id="password"
          placeholder="Enter your password"
          control={control}
          type="password"
        />
        
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        </div>
        <div className="w-full flex">
        <CheckboxHook
          control={control}
          text="Remember email and password"
          name="remember"
          className="text-white"
          value={false}
        ></CheckboxHook>
      </div>
        <div className="flex items-center justify-center mb-5 ">
        <Button
        type="submit"
        className={`w-full p-5 text-white font-semibold mt-5 rounded-lg mb-5 ${
          isSubmitting ? "opacity-50" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className=" w-5 h-5 rounded-full border-2 border-t-2 border-white border-t-transparent animate-spin mx-auto"></div>
        ) : (
          "Submit"
        )}
      </Button>   
        </div>
        <div className="text-white w-full text-center">
          <span>New to TMDB? </span>
          <span className="underline">
            <Link to="/signup">Sign up now</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
