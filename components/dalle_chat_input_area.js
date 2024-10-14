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
        <>
        <Flexbox style={{ maxWidth: '80%', maxHeight: '80%', width: '100%', height: 'auto' }}></Flexbox>
        <ChatInputArea
            // style={{ maxWidth: '80%', maxHeight: '80%', width: '100%', height: 'auto' }}
            topAddons={
                <div>
                    <ChatInputActionBar
                        leftAddons={
                            <>
                                {/* <ActionIcon icon={Languages} />
                            <ActionIcon icon={Eraser} /> */}
                                <TokenTag maxValue={4096} value={props.value.length} />
                            </>
                        }
                    />
                    {props.value}
                </div>

            }
            // enterButton = {true}
            {...props}
        />
        </>
    );
};
