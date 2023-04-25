import { Box } from "@mui/material";
import Select from "react-select";
import { useGetCities } from '../../hooks/useGetCities';

function Cities({setCity, uf, city}) {
  const {cities, loading: loadingCities} = useGetCities({
    uf
  });

  const citieOptions = cities.map((city) => ({
    value: city.codigo_ibge,
    label: city.nome
  }));

  const selectedOptionCity = citieOptions.find((e) => e.value === city);

  const handleCityUpdate = (event) => {
    setCity(event.label);
  }

  return (
    <Select
      isLoading={loadingCities}
      isDisabled={loadingCities || citieOptions.length === 0}
      options={citieOptions}
      placeholder="Selecione a cidade"
      styles={{width: '50px', height: '50px'}}
      value={selectedOptionCity}
      onChange={handleCityUpdate}
    />
  )
}

export default Cities
