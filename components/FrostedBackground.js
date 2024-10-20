import React from 'react';
import { Layout, Row, Col } from 'antd';
import styles from '../styles/mask.module.css'; // 引入自定义的样式文件

const { Content } = Layout;

const FrostedBackground = ({ children }) => {
    return (
        <Layout
            style={{
                height: '100vh',
                backgroundImage: 'url(/background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden', // 确保背景图片部分不滚动
            }}
        >
            <Content
                style={{
                    height: '100%',
                    overflowY: 'auto', // 允许内容部分垂直滚动
                }}
            >
                <div className={styles["frosted-glass-content"]} max-width="100%">
                    {children}
                </div>
            </Content>
        </Layout>
    );
}

export default FrostedBackground;
