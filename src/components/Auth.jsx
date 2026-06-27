import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Auth({ user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => signOut(auth);

  if (user) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Welcome, {user.email}!</h2>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>{isSignUp ? "Create Account" : "Sign In"}</h2>
      <form onSubmit={handleAuth}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#0070f3", color: "#fff", border: "none" }}>
          {isSignUp ? "Sign Up" : "Log In"}
        </button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)} style={{ background: "none", border: "none", color: "#0070f3", marginTop: "10px", cursor: "pointer" }}>
        {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
      </button>
    </div>
  );
}