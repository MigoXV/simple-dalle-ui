import Head from "next/head";
import { useState } from "react";
import styles from "../styles/index.module.css";
import DalleForm from "../components/dalle_form";
import EABasicInformation from "../components/EABasicInformation";
import FrostedGlassLayoutWithBackground from "../components/dalle_background";
import { ThemeProvider, GradientButton } from "@lobehub/ui";

export default function Home() {

  const [result, setResult] = useState();
  const [revised_prompt, setRevisedPrompt] = useState();
  const [loading, setLoading] = useState(false);

  return (

    <ThemeProvider>
      <Head>
        <title>Vectura.ai - simple DALL-E3 FrontEnd</title>
        <link rel="icon" href="/image-gen/icon.png" />
      </Head>
      <FrostedGlassLayoutWithBackground>
        <main className={styles.main}>
          <EABasicInformation />
          <DalleForm setResult={setResult} setRevisedPrompt={setRevisedPrompt} loading={loading} setLoading={setLoading} />
          {loading && <div><small>图片正在生成，请耐心等待</small></div>}
          <a href={result} target="_blank" rel="noopener noreferrer">
            {result && <img src={result} className={styles.result} />}
          </a>
          {result && revised_prompt &&
            <div className={styles.result}>
              <small>Revised prompt used to generate image:</small>
              <p>{revised_prompt}</p>
            </div>
          }
        </main>
      </FrostedGlassLayoutWithBackground>
    </ThemeProvider>
  );
}
