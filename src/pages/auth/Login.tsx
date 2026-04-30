import { useState } from "react";
import "../auth.css";

export default function Login() {
  type FormData = {
    email: string;
    password: string;
  };

  type FormErrors = {
    email?: string;
    password?: string;
  };

  //   const [email, setEmail] = useState("");
  //best practes
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
  });

  //Handles Errors
  const [errors, setErrors] = useState<FormErrors>({});

  //Handele Chang Generic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Validation Logic
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 charcters";
    }

    return newErrors;
  };

  //Submit
  //typed e: React.FormEvent is a Event
  const handleSubmit = (e: React.FormEvent) => {
    //preventDefault click the button : Page updates are not allowed
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    //If Errors Stop
    if (Object.keys(validationErrors).length > 0) return;

    console.log("Form Data:", form);

    //Call API
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Sign In</h2>
          <p>Enter your credntials to access your acconunt</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {/*START EMAIL FORM */}
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label>Email Address</label>
            </div>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/*END EMAIL FORM */}
          {/*START PASSWORD FORM */}

          <div className="form-group">
            <div className="input-wrapper password-wrapper">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
            </div>
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
