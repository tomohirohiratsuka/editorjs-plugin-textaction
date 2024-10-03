import {API, BlockAPI, BlockTool, BlockToolConstructorOptions, OutputData} from '@editorjs/editorjs';
import {MenuConfigItem} from "@editorjs/editorjs/types/tools";
import './styles.css';
import {BlockToolData} from "@editorjs/editorjs/types/tools/block-tool-data";
import {TextActionConfig, TextActionData, TextActionNodeMap} from "./types";


type TextActionConstructorOptions = BlockToolConstructorOptions<TextActionData, TextActionConfig>
export default class TextAction implements BlockTool {
    private api: API;
    private  block: BlockAPI
    private data: TextActionData;
    private config: TextActionConfig
    private nodes: TextActionNodeMap;


    constructor({data, api, config, readOnly, block}: TextActionConstructorOptions) {
        this.api = api;
        this.block = block;
        this.config = {
            placeholder: 'Type something',
            rows: 5,
            buttonText: 'Submit',
            onSubmit: async () => {
            },
            ...config
        }
        this.data = {
            value: data?.value ?? '',
            placeholder: data.placeholder || config?.placeholder || 'Type something',
            rows: data.rows || config?.rows || 5,
            buttonText: data.buttonText || config?.buttonText || 'Submit',
            onSubmit: data.onSubmit || config?.onSubmit || (async () => {}),
        };
        const container = this.createContainer();
        const textareaWrapper = this.createTextareaWrapper();
        const textarea = this.createTextarea();
        const submitButtonWrapper = this.createSubmitButtonWrapper();
        const submitButton = this.createSubmitButton();
        textareaWrapper.appendChild(textarea);
        submitButtonWrapper.appendChild(submitButton);
        container.appendChild(textareaWrapper);
        container.appendChild(submitButtonWrapper);
        this.nodes = {
            container,
            textareaWrapper,
            textarea,
            submitButtonWrapper,
            submitButton,
        }
    }

    static get toolbox() {
        return {
            title: 'Text Action',
            icon: '<span>📝</span>',
        };
    }

    render() {
        return this.nodes.container;
    }

    save(block: HTMLElement): BlockToolData {
        return this.data;
    }

    renderSettings(): MenuConfigItem[] {
        return [];
    }

    /**
     * Create a container for the tool
     * @private
     */
    private createContainer(): HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add('ce-ta__container');
        return container;
    }

    /**
     * Create a wrapper for the textarea
     * @private
     */
    private createTextareaWrapper(): HTMLDivElement {
        const textareaWrapper = document.createElement('div');
        textareaWrapper.classList.add('ce-ta__textarea-wrapper');
        return textareaWrapper;
    }

    /**
     * Create a textarea
     * @private
     */
    private createTextarea(): HTMLTextAreaElement {
        const textarea = document.createElement('textarea');
        textarea.classList.add('ce-ta__textarea');
        textarea.placeholder = this.data.placeholder;
        textarea.rows = this.data.rows;
        textarea.value = this.data.value;
        textarea.addEventListener('input', () => {
            this.data.value = textarea.value;
        });
        return textarea;
    }

    /**
     * Create a wrapper for the submit button
     * @private
     */
    private createSubmitButtonWrapper(): HTMLDivElement {
        const submitButtonWrapper = document.createElement('div');
        submitButtonWrapper.classList.add('ce-ta__button-wrapper');
        return submitButtonWrapper;
    }

    /**
     * Create a submit button
     * @private
     */
    private createSubmitButton(): HTMLButtonElement {
        const submitButton = document.createElement('button');
        submitButton.classList.add('ce-ta__button');
        submitButton.textContent = this.data.buttonText;
        submitButton.addEventListener('click', async () => {
            submitButton.disabled = true;
            this.nodes.textarea.disabled = true;
            submitButton.textContent = '';
            submitButton.appendChild(this.createLoader());
            await this.config.onSubmit?.({data: this.data, block: this.block});
            submitButton.disabled = false;
            this.nodes.textarea.disabled = false;
            submitButton.querySelector('.ce-ta__loader')?.remove();
            submitButton.textContent = this.data.buttonText;
        });
        return submitButton;
    }

    /**
     * Create a loader
     * @private
     */
    private createLoader(): HTMLSpanElement {
        const loader = document.createElement('span');
        loader.classList.add('ce-ta__loader');
        return loader;
    }

    /**
     * Notify core that read-only mode is supported
     */
    public static get isReadOnlySupported(): boolean {
        return true;
    }


}
