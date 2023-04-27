import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useGetStates } from '../../hooks/useGetStates';
import axios from 'axios';
import { Box } from '@mui/material';

function States({
    selectedCity,
    setSelectedCity,
    setSelectedStateName,
    stateLabel,
    cityLabel,
    isSearchPage,
    setFilterChanged,
}) {
    const { states } = useGetStates();
    const [city, setCity] = useState([]);
    const [selectedState, setSelectedState] = useState(null);

    const [cityOptions, setCityOptions] = useState([]);

    const stateOptions = states.map((state) => ({
        value: state.id,
        label: state.nome,
    }));

    const selectedOptionState = stateOptions.find(
        (e) => e.value === selectedState
    );
    const selectedOptionCity = cityOptions.find(
        (e) => e.value === selectedCity
    );

    const handleStateUpdate = (event) => {
        setSelectedState(event.value);
        setSelectedStateName(event.label);
    };

    const handleCityUpdate = (event) => {
        setSelectedCity(event.label);
        if (isSearchPage) {
            setFilterChanged(true);
        }
    };

    useEffect(() => {
        const handleCityFetch = () => {
            if (selectedState) {
                axios
                    .get(
                        import.meta.env.VITE_CITY_BASE_API +
                            `/${selectedState}/municipios`
                    )
                    .then((res) => {
                        setCity(res.data);

                        const newCityOptions = res.data.map((city) => ({
                            value: city.id,
                            label: city.nome,
                        }));

                        setCityOptions(newCityOptions);
                    })
                    .catch((err) => console.error(err.message));
            }
        };

        handleCityFetch();
    }, [selectedState]);

    return (
        <>
            <Box>
                <label
                    htmlFor='state'
                    style={{
                        marginBottom: '5px',
                        display: 'block',
                        fontFamily: 'montserrat',
                        fontSize: isSearchPage ? '1.25rem' : '1.5rem',
                        fontWeight: isSearchPage ? '600' : '500',
                        color: '#252525',
                    }}
                >
                    {stateLabel}
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
                    required
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
            </Box>

            <Box>
                <label
                    htmlFor='city'
                    style={{
                        marginBottom: '5px',
                        display: 'block',
                        fontFamily: 'montserrat',
                        fontSize: isSearchPage ? '1.25rem' : '1.5rem',
                        fontWeight: isSearchPage ? '600' : '500',
                        color: '#252525',
                    }}
                >
                    {cityLabel}
                </label>

                <Select
                    placeholder='Selecione a cidade'
                    id='city'
                    textFieldProps={{
                        label: 'Label',
                        InputLabelProps: {
                            shrink: true,
                        },
                    }}
                    required
                    options={cityOptions}
                    value={selectedOptionCity}
                    onChange={handleCityUpdate}
                    maxMenuHeight={100}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            cursor: 'pointer',
                        }),
                    }}
                />
            </Box>
        </>
    );
}

export default States;
