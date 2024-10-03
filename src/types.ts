// define the types for the custom plugin
import {BlockAPI} from "@editorjs/editorjs";
type TextActionSubmitPayload = {data: TextActionData; block: BlockAPI};
export interface TextActionData {
    value: string;
    placeholder: string;
    rows: number;
    buttonText: string;
    onSubmit: (args: TextActionSubmitPayload) => void | Promise<void>;
}

export interface TextActionConfig {
    placeholder?: string;
    rows?: number;
    onSubmit?: (args: TextActionSubmitPayload) => void | Promise<void>;
    buttonText?: string;
}

export interface TextActionNodeMap {
    container: HTMLDivElement
    textareaWrapper: HTMLDivElement
    textarea: HTMLTextAreaElement
    submitButtonWrapper: HTMLDivElement
    submitButton: HTMLButtonElement
}


