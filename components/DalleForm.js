import React from 'react';
import { useState } from "react";
import { Input } from 'antd';
import { GradientButton } from "@lobehub/ui";

const OptionsInput = ({ settings, setSettings, advancedSettingsVisible }) => {
    const options = [
        {
            label: "Quality",
            name: "图像质量",
            key: "ImageQuality",
            values: [
                { value: "hd", label: "High Quality (Slow)" },
                { value: "standard", label: "Standard Quality (Fast)" }
            ]
        },
        {
            label: "Resolution",
            name: "图像分辨率",
            key: "ImageResolution",
            values: [
                { value: "1024x1024", label: "1024x1024" },
                { value: "1024x1792", label: "1024x1792" },
                { value: "1792x1024", label: "1792x1024" }
            ]
        },
        {
            label: "Image Style",
            name: "图像风格",
            key: "ImageStyle",
            values: [
                { value: "natural", label: "natural" },
                { value: "vivid", label: "vivid" }
            ]
        },
        {
            label: "Prompt Style",
            name: "提示词类型",
            key: "ImagePromptStyle",
            values: [
                { value: "dalle3", label: "DALL-E3 native" },
                { value: "gpt4", label: "GPT4 enhanced (ChatGPT+ default, slow)" },
                { value: "as-is", label: "Use prompt AS-IS (by OpenAI API)" },
                { value: "replicate", label: "Replicate detailed prompt (by OpenAI API)" },
                { value: "debug", label: "Debug Mode (experimental)" }
            ]
        }
    ];

    return (
        <>
            {advancedSettingsVisible && (
                <>
                    <div style={{ border: '1px solid #353740', borderRadius: '5px', padding: '12px 16px' }}>
                        {options.map(({ label, name, key, values }) => (
                            <p key={key}>
                                <label>
                                    {label}: &nbsp;
                                    <select defaultValue={settings[key]} name={name} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}>
                                        {values.map(({ value, label }) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                </label>
                            </p>
                        ))}
                    </div>
                    <br />
                </>
            )}
        </>
    );
}

const DalleForm = ({ setResult, setRevisedPrompt, loading, setLoading }) => {
    const [ImagePrompt, setImagePrompt] = useState("");
    const [advancedSettingsVisible, setAdvancedSettingsVisible] = useState(false);
    const [settings, setSettings] = useState({
        ImageQuality: "standard", // 'hd', 'standard'
        ImageResolution: "1024x1024", // 1024x1024, 1024x1792, 1792x1024
        ImageStyle: "vivid", // 'vivid' or 'natural'
        ImagePromptStyle: "dalle3" // 'dalle3', 'gpt4', 'as-is', 'replicate', 'debug'
    });

    const { TextArea } = Input;

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
                    image_resolution: settings.ImageResolution,
                    image_quality: settings.ImageQuality,
                    image_style: settings.ImageStyle,
                    image_prompt_style: settings.ImagePromptStyle
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
            <OptionsInput 
                settings={settings} 
                setSettings={setSettings} 
                advancedSettingsVisible={advancedSettingsVisible} />
            <TextArea
                name="image_prompt"
                placeholder="A beautiful skyline of New York"
                value={ImagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                disabled={loading}
                rows={4}
                style={{ resize: 'none', display: 'flex', justifyContent: 'center' }}
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