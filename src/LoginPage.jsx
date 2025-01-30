import { LoginForm } from "@/components/login-form";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    console.log("onSubmit -> " + formData);
    navigate("/dashboard"); 
  }

  return (
    <div className="flex min-h-svh w-[100%] flex-col items-center justify-center bg-muted p-6 md:p-10 bg-gray-800">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm
        onSubmit={() => onSubmit()} />
      </div>
    </div>
  );
}

export default LoginPage;
