import React, { useRef, useEffect, useMemo, useState } from "react";
import useTVPlansStore from "../../../stores/useTVPlansStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import api from "../../../services/api";
import { motion, AnimatePresence } from "framer-motion";

import Plan from "./Plan";
import Loading from "../../components/Loading";

const TVPlansBody = ({
  filterValues,
  setFilterValues,
  filterValuesValidator,
  setFilterValuesValidator,
}) => {
  const {
    tvPlans,
    setTvPlans,
    filteredTvPlans,
    setFilteredTvPlans,
    providers,
  } = useTVPlansStore(
    (state) => ({
      tvPlans: state.tvPlans,
      setTvPlans: state.setTvPlans,
      filteredTvPlans: state.filteredTvPlans,
      setFilteredTvPlans: state.setFilteredTvPlans,
      providers: state.providers,
    }),
    shallow,
  );
  const { isLoading, setLoading, unsetLoading } = useGeneralStore(
    (state) => ({
      isLoading: state.isLoading,
      setLoading: state.setLoading,
      unsetLoading: state.unsetLoading,
    }),
    shallow,
  );
  const [resetInputs, setResetInputs] = useState(undefined);
  const [isFilterOptionsValid, setIsFilterOptionsValid] = useState(false);
  const [isFilterSubmitting, setIsFilterSubmitting] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sliceEnd, setSliceEnd] = useState(5);

  const filterRef = useRef();

  const openFilterBox = () => {
    setIsFilterOpen(true);
  };

  const closeFilterBox = () => {
    setIsFilterOpen(false);
  };

  const handleFilterBoxButton = () => {
    if (isFilterOpen) {
      closeFilterBox();
      return;
    }

    openFilterBox();
  };

  const handleShowMore = () => {
    if (tvPlans.length <= sliceEnd) {
      return;
    }

    setSliceEnd((prev) => prev + 5);
  };

  const handleShowMoreFiltered = () => {
    if (filteredTvPlans.length <= sliceEnd) {
      return;
    }

    setSliceEnd((prev) => prev + 5);
  };

  const resetSlice = () => {
    setSliceEnd(5);
  };

  const handleSubmitFilterButton = (event) => {
    event.preventDefault();

    setIsFilterSubmitting(true);

    if (window.innerWidth < 1024) {
      closeFilterBox();
    }
  };

  const handleFilterValuesChanges = (option, value) => {
    if (option === "provider") {
      if (filterValues.provider.includes(value)) {
        const newValue = filterValues.provider.filter((prov) => prov !== value);

        setFilterValues((prev) => ({ ...prev, [option]: newValue }));

        return;
      }

      const newValue = [...filterValues.provider];

      newValue.push(value);

      setFilterValues((prev) => ({ ...prev, [option]: newValue }));

      return;
    }

    setFilterValues((prev) => ({ ...prev, [option]: value }));
  };

  useEffect(() => {
    if (filterValues.cep.length === 9) {
      if (
        filterValues.cep !== filterValuesValidator.cep ||
        filterValues.cost !== filterValuesValidator.cost ||
        filterValues.devicesQuant !== filterValuesValidator.devicesQuant ||
        JSON.stringify(filterValues.provider) !==
          JSON.stringify(filterValuesValidator.provider)
      ) {
        setIsFilterOptionsValid(true);
      } else {
        setIsFilterOptionsValid(false);
      }
    } else {
      setIsFilterOptionsValid(false);
    }
  }, [filterValues, filterValuesValidator]);

  useEffect(() => {
    setResetInputs(true);
  }, []);

  useEffect(() => {
    const submitData = () => {
      setLoading();
      setTvPlans([]);
      setFilteredTvPlans([]);

      const data = {
        cep: filterValues.cep,
        provider: filterValues.provider,
        cost: filterValues.cost,
        devicesQuant: filterValues.devicesQuant,
      };

      api
        .post("plan/tv-plan/filter", data)
        .then((res) => {
          const sortedPlans = res.data.sort((a, b) => a.priority - b.priority);

          setTimeout(() => {
            setFilteredTvPlans(sortedPlans);
          }, 350);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsFilterSubmitting(false);
          setIsFilterOptionsValid(false);
          setFilterValuesValidator({ ...filterValues });
          setTvPlans([]);
          resetSlice();

          setTimeout(() => {
            unsetLoading();
          }, 350);
        });
    };

    if (isFilterSubmitting) {
      submitData();
    }
  }, [isFilterSubmitting]);

  return (
    <div className="body-container">
      <AnimatePresence>
        {isLoading && <Loading key={isLoading} type="spin" color="#8186bc" />}
      </AnimatePresence>
      <div className="body-wrapper wrapper">
        <div className="filter-form-container">
          <button
            type="button"
            onClick={handleFilterBoxButton}
            className="filter-form-button"
          >
            Filtrar
          </button>

          <form
            ref={filterRef}
            style={
              isFilterOpen
                ? { maxHeight: `${filterRef.current?.scrollHeight + 25}px` }
                : { maxHeight: "0px" }
            }
            className="filter-form-box"
          >
            <div className="filter-form-wrapper">
              <div className="filter-form-cep-box">
                <span className="filter-form-cep-title">Cep</span>
                <input
                  type="text"
                  name="cep"
                  autoCorrect="off"
                  autoComplete="off"
                  onChange={(event) => {
                    let cep = event.target.value.replace(/\D/g, "");

                    if (cep.length === 8) {
                      cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
                    }

                    handleFilterValuesChanges("cep", cep);
                  }}
                  value={filterValues.cep}
                  maxLength="8"
                  className="filter-form-cep-input"
                />
              </div>

              <div className="filter-form-cost-box">
                <span className="filter-form-cost-title">Preço</span>

                <label htmlFor="cost50" className="filter-form-cost-label">
                  <input
                    type="radio"
                    id="cost50"
                    name="cost"
                    value={50}
                    onChange={(e) =>
                      handleFilterValuesChanges("cost", Number(e.target.value))
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-cost-input"
                  />
                  Até R$ 50,00
                </label>

                <label htmlFor="cost100" className="filter-form-cost-label">
                  <input
                    type="radio"
                    id="cost100"
                    name="cost"
                    value={100}
                    onChange={(e) =>
                      handleFilterValuesChanges("cost", Number(e.target.value))
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-cost-input"
                  />
                  Até R$ 100,00
                </label>

                <label htmlFor="cost150" className="filter-form-cost-label">
                  <input
                    type="radio"
                    id="cost150"
                    name="cost"
                    value={150}
                    onChange={(e) =>
                      handleFilterValuesChanges("cost", Number(e.target.value))
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-cost-input"
                  />
                  Até R$ 150,00
                </label>

                <label htmlFor="cost250" className="filter-form-cost-label">
                  <input
                    type="radio"
                    id="cost250"
                    name="cost"
                    value={250}
                    defaultChecked={resetInputs}
                    onChange={(e) =>
                      handleFilterValuesChanges("cost", Number(e.target.value))
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-cost-input"
                  />
                  Até R$ 250,00
                </label>
              </div>

              <div className="filter-form-devices-box">
                <span className="filter-form-devices-title">
                  Quantidade de dispositivos
                </span>

                <label htmlFor="device1" className="filter-form-devices-label">
                  <input
                    type="radio"
                    id="device1"
                    name="devicesQuant"
                    value={1}
                    defaultChecked={resetInputs}
                    onChange={(e) =>
                      handleFilterValuesChanges(
                        "devicesQuant",
                        Number(e.target.value),
                      )
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-devices-input"
                  />
                  1 aparelho
                </label>

                <label htmlFor="device2" className="filter-form-devices-label">
                  <input
                    type="radio"
                    id="device2"
                    name="devicesQuant"
                    value={2}
                    onChange={(e) =>
                      handleFilterValuesChanges(
                        "devicesQuant",
                        Number(e.target.value),
                      )
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-devices-input"
                  />
                  2 aparelhos
                </label>

                <label htmlFor="device3" className="filter-form-devices-label">
                  <input
                    type="radio"
                    id="device3"
                    name="devicesQuant"
                    value={3}
                    onChange={(e) =>
                      handleFilterValuesChanges(
                        "devicesQuant",
                        Number(e.target.value),
                      )
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-devices-input"
                  />
                  3 aparelhos
                </label>

                <label htmlFor="device4" className="filter-form-devices-label">
                  <input
                    type="radio"
                    id="device4"
                    name="devicesQuant"
                    value={4}
                    onChange={(e) =>
                      handleFilterValuesChanges(
                        "devicesQuant",
                        Number(e.target.value),
                      )
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-devices-input"
                  />
                  4 aparelhos
                </label>
              </div>

              <div className="filter-form-provider-box">
                <span className="filter-form-provider-title">Operadoras</span>

                {providers.map((provider, index) => (
                  <label
                    key={`provider-${index}`}
                    htmlFor={provider}
                    className="filter-form-provider-label"
                  >
                    <input
                      type="checkbox"
                      id={provider}
                      name="provider"
                      value={provider}
                      onChange={(event) =>
                        handleFilterValuesChanges(
                          "provider",
                          event.target.value,
                        )
                      }
                      autoComplete="off"
                      autoCorrect="off"
                      className="filter-form-provider-input"
                    />
                    {provider}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmitFilterButton}
              disabled={!isFilterOptionsValid}
              className="filter-form-submit-button"
            >
              Aplicar
            </button>
          </form>
        </div>

        <div className="result-box">
          <span className="result-status">
            {tvPlans.length !== 0 ? tvPlans.length : filteredTvPlans.length}{" "}
            Resultado(s)
          </span>

          <div className="result-wrapper">
            <AnimatePresence>
              {filteredTvPlans.length !== 0 ? (
                filteredTvPlans
                  .slice(0, sliceEnd)
                  .map((plan) => (
                    <Plan
                      key={plan._id}
                      id={plan._id}
                      providerLogo={plan.providerIcon}
                      title={plan.title}
                      installationCost={plan.installationCost}
                      benefits={plan.benefits}
                      devicesQuant={plan.devicesQuant}
                      cost={plan.cost}
                      afterCost={plan.afterCost}
                      periodToChangeCost={plan.periodToChangeCost}
                      description={plan.description}
                    />
                  ))
              ) : tvPlans.length !== 0 ? (
                tvPlans
                  .slice(0, sliceEnd)
                  .map((plan) => (
                    <Plan
                      key={plan._id}
                      id={plan._id}
                      providerLogo={plan.providerIcon}
                      title={plan.title}
                      installationCost={plan.installationCost}
                      benefits={plan.benefits}
                      devicesQuant={plan.devicesQuant}
                      cost={plan.cost}
                      afterCost={plan.afterCost}
                      periodToChangeCost={plan.periodToChangeCost}
                      description={plan.description}
                    />
                  ))
              ) : (
                <span key="not-found" className="result-not-found-message">
                  Nenhum plano encontrado
                </span>
              )}
            </AnimatePresence>
            {tvPlans.length > sliceEnd ? (
              <button
                type="button"
                onClick={handleShowMore}
                className="result-show-more-button"
              >
                MOSTRAR MAIS
              </button>
            ) : (
              false
            )}
            {filteredTvPlans.length > sliceEnd ? (
              <button
                type="button"
                onClick={handleShowMoreFiltered}
                className="result-show-more-button"
              >
                MOSTRAR MAIS
              </button>
            ) : (
              false
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVPlansBody;
