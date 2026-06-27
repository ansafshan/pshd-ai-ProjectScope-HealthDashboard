import { useState } from "react";
import { GoogleGenAI } from "@google/genai"; // Ensure the curly braces are there!
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export default function Intake({ onAnalysisComplete }) {
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeText = async (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setLoading(true);
    setError("");

    try {
      console.log("1. Starting Gemini API Call...");
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: rawText,
        config: {
          systemInstruction: `You are an expert technical Project Manager. 
          Analyze the provided raw client communication. 
          Extract core technical deliverables, timelines, and evaluate risks.
          You MUST respond strictly in valid JSON format matching this schema:
          {
            "projectName": "Short descriptive name",
            "techStack": ["list"],
            "features": ["feature 1"],
            "timeline": "Timeline string",
            "riskScore": "Low" | "Medium" | "High",
            "riskReason": "Brief reason"
          }`,
          responseMimeType: "application/json",
        },
      });

      console.log("2. Gemini responded successfully!");
      const structuredData = JSON.parse(response.text);
      console.log("3. Parsed Data:", structuredData);
      
      const currentUser = auth.currentUser;
      console.log("4. Logged in user payload:", currentUser?.uid);

      if (currentUser) {
        console.log("5. Attempting Firestore database upload...");
        await addDoc(collection(db, "projects"), {
          userId: currentUser.uid,
          analysis: structuredData,
          createdAt: serverTimestamp()
        });
        console.log("6. Database upload complete!");
      }
      
      onAnalysisComplete(structuredData);
      setRawText(""); 
    } catch (err) {
      console.error("🔴 CATCH ERROR HIT:", err);
      setError(`Processing failed: ${err.message}`);
    } finally {
      console.log("7. Execution finished, resetting loader.");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>📥 Project Intake Area</h3>
      <p style={{ fontSize: "14px", color: "#666" }}>Paste raw client emails, project briefs, or messy chat logs below.</p>
      
      <form onSubmit={analyzeText}>
        <textarea
          rows="8"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Example: 'Hey! We need a dashboard built in React. It needs email login and must sync up with Firebase. We have a budget of $2k and need it done by next month...'"
          required
          style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "sans-serif", boxSizing: "border-box" }}
        />
        
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ marginTop: "10px", width: "100%", padding: "12px", backgroundColor: loading ? "#ccc" : "#222", color: "#fff", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer", fontWeight: "bold" }}
        >
          {loading ? "AI is orchestrating..." : "Analyze Project Scope"}
        </button>
      </form>
    </div>
  );
}