import { useRef } from 'react';
import ParamEditor from './ParamEditor';
import type { Param, Model } from './ParamEditor';
import './App.css';

function App() {
    const editorRef = useRef<ParamEditor>(null);

    const params: Param[] = [
        { id: 1, name: 'Назначение', type: 'string' },
        { id: 2, name: 'Длина', type: 'string' },
    ];

    const model: Model = {
        paramValues: [
            { paramId: 1, value: 'для дома' },
            { paramId: 2, value: '' },
        ],
    };

    const handleGetModel = () => {
        if (editorRef.current) {
            const currentModel = editorRef.current.getModel();
            console.log('Current model:', currentModel);
        }
    };

    return (
        <div>
            <ParamEditor ref={editorRef} params={params} model={model} />
            <button onClick={handleGetModel}>Получить модель</button>
        </div>
    );
}

export default App;
