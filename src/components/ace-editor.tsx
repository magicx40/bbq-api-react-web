import Ace from 'react-ace';
/*eslint-disable no-alert, no-console */
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import { useState } from 'react';
import './ace-editor.scss';
import 'ace-builds/src-noconflict/theme-xcode';

const languages = [
    'javascript',
    'java',
    'python',
    'xml',
    'ruby',
    'sass',
    'markdown',
    'mysql',
    'json',
    'html',
    'handlebars',
    'golang',
    'csharp',
    'elixir',
    'typescript',
    'css',
];
languages.forEach(lang => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
});

interface AceEditorProps {
    id?: string;
    value?: string;
    onChange?: (value: string) => void;
    height?: string;
    width?: string;
    name?: string;
    placeholder?: string;
    readOnly?: boolean;
}
export default function AceEditor({
    id,
    height,
    width,
    name,
    placeholder,
    readOnly,
    value,
    onChange,
}: AceEditorProps) {
    const [mode, setMode] = useState('python');
    return (
        <span id={id}>
            <div className="ace-editor-select">
                <select
                    name="mode"
                    onChange={v => setMode(v.target.value)}
                    value={mode}
                >
                    {languages.map(lang => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
            </div>
            <Ace
                width={width || '500px'}
                height={height || '300px'}
                mode={mode || 'sh'}
                theme="xcode"
                placeholder={placeholder || ''}
                onChange={onChange}
                name={name || 'ace-editor'}
                value={value}
                readOnly={readOnly}
                editorProps={{ $blockScrolling: true }}
                fontSize="14px"
                showGutter={true}
                highlightActiveLine={true}
                showPrintMargin={false}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                }}
            />
        </span>
    );
}
