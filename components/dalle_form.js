import React from 'react';
import { useState } from "react";
import { Input } from 'antd';
import { GradientButton, ChatInputArea } from "@lobehub/ui";
import DalleChatInputArea from './dalle_chat_input_area';

const DalleForm = ({ children, setResult, setRevisedPrompt, loading, setLoading }) => {
    const [ImagePrompt, setImagePrompt] = useState("");
    const [ImageQuality, setImageQuality] = useState("standard"); // 'hd', 'standard'
    const [ImageResolution, setImageResolution] = useState("1024x1024"); // 1024x1024, 1024x1792, 1792x1024
    const [ImageStyle, setImageStyle] = useState("vivid"); // 'vivid' or 'natural'
    const [ImagePromptStyle, setImagePromptStyle] = useState("dalle3"); // 'dalle3' => no pre-prompt D3 does prompt-enhancement; 'gpt4' => pass to GPT4 to enhance prompt
    const [advancedSettingsVisible, setAdvancedSettingsVisible] = useState(false);

    async function onSubmit(event) {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/image-gen/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image_prompt: ImagePrompt,
                    image_resolution: ImageResolution,
                    image_quality: ImageQuality,
                    image_style: ImageStyle,
                    image_prompt_style: ImagePromptStyle
                }),
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }

            setResult(data.result);
            setRevisedPrompt(data.revised_prompt);
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} style={{ textAlign: 'center' }}>
            <a href="#" onClick={() => setAdvancedSettingsVisible(!advancedSettingsVisible)}>点这里展开高级设定</a>
            {advancedSettingsVisible && (
                <>
                    <div style={{ border: '1px solid #10a37f', borderRadius: '5px', padding: '12px 16px' }}>
                        <p>
                            <label>
                                Quality: &nbsp;
                                <select defaultValue={ImageQuality} name="图像质量" onChange={(e) => setImageQuality(e.target.value)}>
                                    <option value="hd">High Quality (Slow)</option>
                                    <option value="standard">Standard Quality (Fast)</option>
                                </select>
                            </label>
                        </p>
                        <p>
                            <label>
                                Resolution: &nbsp;
                                <select defaultValue={ImageResolution} name="图像风格" onChange={(e) => setImageResolution(e.target.value)}>
                                    <option value="1024x1024">1024x1024</option>
                                    <option value="1024x1792">1024x1792</option>
                                    <option value="1792x1024">1792x1024</option>
                                </select>
                            </label>
                        </p>
                        <p>
                            <label>
                                Image Style: &nbsp;
                                <select defaultValue={ImageStyle} name="图像风格" onChange={(e) => setImageStyle(e.target.value)}>
                                    <option value="natural">natural</option>
                                    <option value="vivid">vivid</option>
                                </select>
                            </label>
                        </p>
                        <p>
                            <label>
                                Prompt Style: &nbsp;
                                <select defaultValue={ImagePromptStyle} name="提示词类型" onChange={(e) => setImagePromptStyle(e.target.value)}>
                                    <option value="dalle3">DALL-E3 native</option>
                                    <option value="gpt4">GPT4 enhanced (ChatGPT+ default, slow)</option>
                                    <option value="as-is">Use prompt AS-IS (by OpenAI API)</option>
                                    <option value="replicate">Replicate detailed prompt (by OpenAI API)</option>
                                    <option value="debug">Debug Mode (experimental)</option>
                                </select>
                            </label>
                        </p>
                    </div>
                    <br />
                </>
            )}
            <DalleChatInputArea
                name="image_prompt"
                placeholder="A beautiful skyline of New York"
                value={ImagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                disabled={loading}
            />
            <GradientButton
                htmlType="submit"
                disabled={loading}
                style={{ width: '100%', maxWidth: '300px', padding: '10px 16px', margin: '10px auto', display: 'block' }}  // 控制按钮宽度和内边距
            >{loading ? "生成中..." : "启动生成"}</GradientButton>
        </form>
    );
}

export default DalleForm;