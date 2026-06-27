import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Auth from "./components/Auth";
import Intake from "./components/Intake";
import Dashboard from "./components/Dashboard"; // Make sure this is imported!

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading application...</div>;

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>pshd-ai Dashboard</h1>
      <Auth user={user} />
      
      {/* 1. Only show intake if user is logged in AND no data has been generated yet */}
      {user && !projectData && (
        <Intake onAnalysisComplete={(data) => setProjectData(data)} />
      )}

      {/* 2. Beautiful Dashboard layout takes over when data exists */}
      {projectData && (
        <Dashboard 
          data={projectData} 
          onReset={() => setProjectData(null)} 
        />
      )}
    </div>
  );
}

export default App;