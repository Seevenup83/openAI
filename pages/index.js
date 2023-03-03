import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userInput, setuserInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setuserInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/ChatGPT_icon.png" />
      </Head>

      <main className={styles.main}>
        <img src="/OpenAI_Logo.png" className={styles.icon} />
        <h3>OpenAI Testing</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="userInput"
            placeholder="Enter your question"
            value={userInput}
            onChange={(e) => setuserInput(e.target.value)}
          />
          <input type="submit" value=">>" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}