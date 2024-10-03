Here's a completed `README.md` file based on your provided code:

```markdown
# Text Action Tool
Text Action is a custom tool for the [Editor.js](https://editorjs.io) framework that provides a simple text area and submit button interface for various use cases like AI-generated text requests or other prompt-based actions.
This library is intended to be used mainly while creating documents with the Editor.js framework.

## Installation

### Install via NPM or Yarn

Get the package:

```shell
npm i editorjs-plugin-textaction
```

Include the module in your application:

```typescript
import TextAction from 'editorjs-plugin-textaction';
```

## Usage

Add the `TextAction` Tool to the `tools` property of the Editor.js initial configuration.

```typescript
const editor = new EditorJS({
  ...
  tools: {
    textAction: {
      class: TextAction,
    }
  }
  ...
});
```

Or initialize the TextAction Tool with additional configuration options:

```typescript
const editor = new EditorJS({
  ...
  tools: {
    textAction: {
      class: TextAction,
      config: {
        placeholder: 'Enter your prompt here',
        rows: 5,
        buttonText: 'Submit',
        onSubmit: async ({data, block}) => {
          // Handle submission logic
          console.log(`Submitted value: ${data.value}`);
          // You may perform an API call or any async operation here
          block.remove();
        },
      },
    },
  },
  ...
});
```

## Config Params

| Field       | Type     | Description                                      |
| ----------- | -------- | ------------------------------------------------ |
| placeholder | `string` | Placeholder text for the textarea input           |
| rows        | `number` | Number of rows for the textarea input             |
| buttonText  | `string` | Text for the submit button                        |
| onSubmit    | `function` | Callback function executed on submit. Receives the submitted data and the block object for additional handling (like block removal). |

## Output Data

When saving data, the TextAction Tool returns the following structure:

| Field     | Type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| value     | `string` | The current value of the text area          |
| placeholder | `string` | The placeholder text used for the textarea |
| rows      | `number` | Number of rows of the textarea              |
| buttonText | `string` | Text displayed on the submit button         |
| onSubmit  | `function` | Callback function executed on submit       |

Example:

```typescript
const outputData = {
    type : "textAction",
    data: {
        value: "Submitted text",
        placeholder: "Enter something",
        rows: 5,
        buttonText: "Submit",
        onSubmit: async ({data, block}) => {
            // Handle submission logic
            console.log(`Submitted value: ${data.value}`);
            // You may perform an API call or any async operation here
            block.remove();
        }
    }
}
```
**Note**: The `onSubmit` function is not serialized when it's json.

## Theme

This tool supports both light and dark themes. To enable the dark theme, simply add a `dark` class to the parent element of the editor:

```html
<div id="editorjs" class="dark"></div>
```

## License

This project is licensed under the MIT License.
