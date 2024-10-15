import Head from "next/head";
import { useState } from "react";
import styles from "../styles/index.module.css";
import DalleForm from "../components/dalle_form";
import ResultArea from "../components/ResultArea";
import EABasicInformation from "../components/EABasicInformation";
import FrostedGlassLayoutWithBackground from "../components/dalle_background";
import { ThemeProvider } from "@lobehub/ui";

export default function Home() {

  const [result, setResult] = useState();
  const [revised_prompt, setRevisedPrompt] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Vectura.ai - simple DALL-E3 FrontEnd</title>
        <link rel="icon" href="/image-gen/icon.png" />
      </Head>
      <ThemeProvider enableGlobalStyle={true} defaultThemeMode="light" enableWebfonts={true} customTheme={{ neutralColor: 'mauve', primaryColors: "orange" }}>
        <FrostedGlassLayoutWithBackground>
          <main className={styles.main}>
            <EABasicInformation />
            <DalleForm setResult={setResult} setRevisedPrompt={setRevisedPrompt} loading={loading} setLoading={setLoading} />
            <ResultArea loading={loading} result={result} revised_prompt={revised_prompt} />
          </main>
        </FrostedGlassLayoutWithBackground>
      </ThemeProvider>
    </>
  );
}
