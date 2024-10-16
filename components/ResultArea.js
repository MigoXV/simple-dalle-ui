import styles from "../styles/index.module.css";


export default ({loading, result, revised_prompt}) => {
    return (
        <>
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
        </>
    );
}