import {
    ActionIcon,
    ChatInputActionBar,
    ChatInputArea,
    ChatSendButton,
    TokenTag,
} from '@lobehub/ui';
import { Eraser, Languages } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';

export default (props) => {
    return (
        <Flexbox style={{ height: '20vh', position: 'relative' }}>
        <ChatInputArea
            style={{ maxWidth: '80%', maxHeight: '80%', width: '100%', height: 'auto', background: 'rgba(255, 255, 255, 0)' }}
            topAddons={
                <div>
                    <ChatInputActionBar
                        leftAddons={
                                <TokenTag maxValue={4096} value={props.value.length} />
                        }
                    />
                    {/* {props.value} */}
                </div>
            }
            // enterButton = {true}
            {...props}
        />
        </Flexbox>
    );
};
