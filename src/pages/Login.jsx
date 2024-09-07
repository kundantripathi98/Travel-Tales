import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import { Navigate, useNavigate} from "react-router-dom";
import Message from "../components/Message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false); 

  const {user, isAuthenticated, login, logout} = useAuth();

  function handleLogin(e) {
    e.preventDefault();
    if (email && password) {
      const success = login(email, password);
      console.log("succes: ", success);
      
      if (!success) {
        setLoginFailed(true);  // Set loginFailed if login fails
      }
    }
  }

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/app", {replace: true});
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav/>

      {loginFailed && <Message message="Login is not succesful, Please check the username or password!"/>}

      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
