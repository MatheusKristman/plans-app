import { useState } from "react"
import Select from 'react-select'
import {useGetStates} from '../../hooks/useGetStates';

function States({onChange}) {
  const { states } = useGetStates();
  const [selectedState, setSelectedState] = useState(null);

  const stateOptions = states.map(state => ({
    value: state.id,
    label: state.nome
  }));

  const selectedOptionState = stateOptions.find((e) => e.value === selectedState);

  const handleStateUpdate = (event) => {
    setSelectedState(event.value);
    const selectedUf = states.find((e) => e.id === event.value)?.sigla;
    onChange(selectedUf)
  };

  return (
    <Select
      placeholder="Selecione o estado"
      options={stateOptions}
      value={selectedOptionState}
      onChange={handleStateUpdate}
    />
  )
}

export default States
