import React from 'react';

interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    colors?: unknown[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    paramValues: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const initialValues = this.initializeParamValues();
        this.state = {
            paramValues: initialValues,
        };
    }

    private initializeParamValues(): ParamValue[] {
        const { params, model } = this.props;

        return params.map((param) => {
            const existingValue = model.paramValues.find(
                (pv) => pv.paramId === param.id,
            );

            return {
                paramId: param.id,
                value: existingValue?.value || '',
            };
        });
    }

    public getModel(): Model {
        return {
            paramValues: this.state.paramValues,
            colors: this.props.model.colors,
        };
    }

    private handleParamChange = (paramId: number, value: string) => {
        this.setState((prevState) => ({
            paramValues: prevState.paramValues.map((pv) =>
                pv.paramId === paramId ? { ...pv, value } : pv,
            ),
        }));
    };

    private renderParamInput(param: Param) {
        const paramValue = this.state.paramValues.find(
            (pv) => pv.paramId === param.id,
        );

        switch (param.type) {
            case 'string':
                return (
                    <StringParamInput
                        param={param}
                        value={paramValue?.value || ''}
                        onChange={this.handleParamChange}
                    />
                );
            default:
                return <div>Unsupported type</div>;
        }
    }

    render() {
        const { params } = this.props;

        return (
            <div className="param-editor">
                <h2>Редактор параметров</h2>
                <div className="params-list">
                    {params.map((param) => (
                        <div key={param.id} className="param-item">
                            {this.renderParamInput(param)}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

interface StringParamInputProps {
    param: Param;
    value: string;
    onChange: (paramId: number, value: string) => void;
}

const StringParamInput: React.FC<StringParamInputProps> = ({
    param,
    value,
    onChange,
}) => {
    return (
        <div className="param-input-wrapper">
            <label htmlFor={`param-${param.id}`}>{param.name}</label>
            <input
                id={`param-${param.id}`}
                type="text"
                value={value}
                onChange={(e) => onChange(param.id, e.target.value)}
                placeholder={`Введите ${param.name.toLowerCase()}`}
            />
        </div>
    );
};

export default ParamEditor;
export type { Param, ParamValue, Model, Props };
