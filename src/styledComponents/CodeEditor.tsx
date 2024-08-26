import AceEditor from "react-ace";

// all modes supported
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-coffee";
import "ace-builds/src-noconflict/mode-css";

// theme for editor
import "ace-builds/src-noconflict/theme-monokai";
import { forwardRef } from "react";

interface CodeEditorProps {
  mode: string;
  code: string;
  readOnly: boolean;
  showGutter: boolean;
  editorHeight: number;
  handleChange?: any;
  handlePaste?: any;
  highlightActiveLine?: boolean;
}

const CodeEditor = forwardRef(function CodeEditor(
  props: CodeEditorProps,
  ref: any
) {
  const {
    mode,
    code,
    readOnly,
    showGutter,
    editorHeight,
    handleChange,
    handlePaste,
    highlightActiveLine,
  } = props;

  return (
    <AceEditor
      ref={ref}
      mode={mode}
      value={code}
      theme="monokai"
      name="code-editor"
      onChange={handleChange}
      onPaste={handlePaste}
      readOnly={readOnly}
      width="100%"
      showGutter={showGutter}
      editorProps={{ $blockScrolling: true }}
      highlightActiveLine={highlightActiveLine}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
        useWorker: false,
        enableSnippets: false,
        readOnly: readOnly,
      }}
      style={{ maxHeight: editorHeight }}
    />
  );
});

export default CodeEditor;
