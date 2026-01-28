import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ParamEditor from './ParamEditor';
import type { Param, Model } from './ParamEditor';

describe('ParamEditor', () => {
    const mockParams: Param[] = [
        { id: 1, name: 'Назначение', type: 'string' },
        { id: 2, name: 'Длина', type: 'string' },
    ];

    const mockModel: Model = {
        paramValues: [
            { paramId: 1, value: 'для дома' },
            { paramId: 2, value: '2 метра' },
        ],
    };

    it('отображает все поля по params', () => {
        render(<ParamEditor params={mockParams} model={{ paramValues: [] }} />);

        expect(screen.getByLabelText('Назначение')).toBeInTheDocument();
        expect(screen.getByLabelText('Длина')).toBeInTheDocument();
    });

    it('корректно инициализирует значения из model.paramValues', () => {
        render(<ParamEditor params={mockParams} model={mockModel} />);

        const naznachenieInput = screen.getByLabelText(
            'Назначение',
        ) as HTMLInputElement;
        const dlinaInput = screen.getByLabelText('Длина') as HTMLInputElement;

        expect(naznachenieInput.value).toBe('для дома');
        expect(dlinaInput.value).toBe('2 метра');
    });

    it('корректно возвращает getModel() после изменений', async () => {
        let editorRef: ParamEditor | null = null;

        const TestWrapper = () => {
            return (
                <ParamEditor
                    ref={(ref) => {
                        editorRef = ref;
                    }}
                    params={mockParams}
                    model={mockModel}
                />
            );
        };

        render(<TestWrapper />);

        const naznachenieInput = screen.getByLabelText('Назначение');
        await userEvent.clear(naznachenieInput);
        await userEvent.type(naznachenieInput, 'для офиса');

        const result = editorRef!.getModel(); // изменили ?. на !

        expect(result.paramValues).toEqual([
            // убрали ?.
            { paramId: 1, value: 'для офиса' },
            { paramId: 2, value: '2 метра' },
        ]);
    });

    it('обрабатывает пустые начальные значения', () => {
        const emptyModel: Model = {
            paramValues: [],
        };

        render(<ParamEditor params={mockParams} model={emptyModel} />);

        const inputs = screen.getAllByRole('textbox');
        inputs.forEach((input) => {
            expect((input as HTMLInputElement).value).toBe('');
        });
    });
});
