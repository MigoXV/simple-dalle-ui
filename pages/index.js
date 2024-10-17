import Head from "next/head";
import { useState } from "react";
import styles from "../styles/index.module.css";
import DalleForm from "../components/DalleForm";
import ResultArea from "../components/ResultArea";
import EABasicInformation from "../components/EABasicInformation";
import FrostedBackground from "../components/FrostedBackground";
import { ThemeProvider } from "@lobehub/ui";

export default function Home() {

  const [result, setResult] = useState();
  const [revised_prompt, setRevisedPrompt] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>DALL·E绘图</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <ThemeProvider enableGlobalStyle={true} defaultThemeMode="light" enableWebfonts={true} customTheme={{ neutralColor: 'mauve', primaryColors: "orange" }}>
        <FrostedBackground>
          <main className={styles.main}>
            <EABasicInformation />
            <DalleForm setResult={setResult} setRevisedPrompt={setRevisedPrompt} loading={loading} setLoading={setLoading} />
            <ResultArea loading={loading} result={result} revised_prompt={revised_prompt} />
          </main>
        </FrostedBackground>
      </ThemeProvider>
    </>
  );
}
