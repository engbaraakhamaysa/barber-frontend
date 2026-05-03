import { useState } from "react";
import "../auth.css";

export default function Regester() {
  type FormData = {
    name: string;
    email: string;
    password: string;
    location: string;
  };

  type FormErrors = {
    name?: string;
    email?: string;
    password?: string;
    location?: string;
  };

  //   const [email, setEmail] = useState("");
  //best practes
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    location: "",
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

    if (!form.name) {
      newErrors.name = "Name is required";
    }
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

    if (!form.location) {
      newErrors.name = "location is required";
    }

    return newErrors;
  };

  //Submit
  //typed e: React.FormEvent is a Event
  const handleSubmit = async (e: React.FormEvent) => {
    //preventDefault click the button : Page updates are not allowed
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    //If Errors Stop
    if (Object.keys(validationErrors).length > 0) return;

    console.log("Form Data:", form);

    //Call API

    try {
      const response = await fetch("http://localhost:3000/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="supr">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Regesetr new shop</h2>
            <p>Enter your credntials to access your acconunt</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {/*START NAME FORM */}
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <label>Enter shop name</label>
              </div>
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            {/*END NAME FORM */}
            {/*START EMAIL FORM */}
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="email"
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

            {/*START LOCATION FORM */}
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />

                <label>Enter your location</label>
              </div>
              {errors.location && (
                <span className="error">{errors.location}</span>
              )}
            </div>

            {/*END LOCATION FORM */}

            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
