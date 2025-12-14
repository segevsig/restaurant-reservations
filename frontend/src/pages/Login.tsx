import { useState } from "react";
import { login } from "../services/auth";
import { saveToken } from "../utils/authToken.ts";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg,setErrorMsg] = useState(null);

  const handleLogin = async () => {
    try{
        const res = await login({ email: email.trim().toLowerCase(), password });
        saveToken(res.token);
    }catch(e: any){
        setErrorMsg(e.message);
    }
  };

  return (
    <div>
      <h1>login</h1>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>login</button>
      <div>{errorMsg}</div>
    </div>
  );
}
