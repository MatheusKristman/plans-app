import { useState } from 'react';
import Select from 'react-select';
import { useGetStates } from '../../hooks/useGetStates';

function States({ onChange }) {
    const { states } = useGetStates();
    const [selectedState, setSelectedState] = useState(null);

    const stateOptions = states.map((state) => ({
        value: state.id,
        label: state.nome,
    }));

    const selectedOptionState = stateOptions.find(
        (e) => e.value === selectedState
    );

    const handleStateUpdate = (event) => {
        setSelectedState(event.value);
        const selectedUf = states.find((e) => e.id === event.value)?.sigla;
        onChange(selectedUf);
    };

    return (
        <>
            <label
                htmlFor='state'
                style={{ marginBottom: '5px', display: 'block' }}
            >
                Qual estado você mora?
            </label>

            <Select
                placeholder='Selecione o estado'
                id='state'
                textFieldProps={{
                    label: 'Label',
                    InputLabelProps: {
                        shrink: true,
                    },
                }}
                options={stateOptions}
                value={selectedOptionState}
                onChange={handleStateUpdate}
                maxMenuHeight={150}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        cursor: 'pointer',
                        marginBottom: '25px',
                    }),
                }}
            />

            <label
                htmlFor='city'
                style={{ marginBottom: '5px', display: 'block' }}
            >
                Qual cidade você mora?
            </label>

            <Select
                placeholder='Selecione o estado'
                id='city'
                textFieldProps={{
                    label: 'Label',
                    InputLabelProps: {
                        shrink: true,
                    },
                }}
                options={stateOptions}
                value={selectedOptionState}
                onChange={handleStateUpdate}
                maxMenuHeight={150}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        cursor: 'pointer',
                    }),
                }}
            />
        </>
    );
}

export default States;
