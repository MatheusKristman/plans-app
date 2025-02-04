import React, { useRef, useEffect, useState } from "react";
import useCelPlansStore from "../../../stores/useCelPlansStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import api from "../../../services/api";
import { AnimatePresence } from "framer-motion";

import Plan from "./Plan";
import Loading from "../../components/Loading";

const CelPlansBody = ({
  filterValues,
  setFilterValues,
  filterValuesValidator,
  setFilterValuesValidator,
}) => {
  const {
    celPlans,
    setCelPlans,
    filteredCelPlans,
    setFilteredCelPlans,
    providers,
  } = useCelPlansStore(
    (state) => ({
      celPlans: state.celPlans,
      setCelPlans: state.setCelPlans,
      filteredCelPlans: state.filteredCelPlans,
      setFilteredCelPlans: state.setFilteredCelPlans,
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sliceEnd, setSliceEnd] = useState(5);
  const [isFilterSubmitting, setIsFilterSubmitting] = useState(false);
  const [isFilterOptionValid, setIsFilterOptionValid] = useState(false);

  const filterRef = useRef();
  const bodyRef = useRef();

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
    if (celPlans.length <= sliceEnd) {
      return;
    }

    setSliceEnd((prev) => prev + 5);
  };

  const handleShowMoreFiltered = () => {
    if (filteredCelPlans.length <= sliceEnd) {
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

    const scrollPosition = bodyRef.current.offsetTop;

    window.scrollTo(0, scrollPosition);

    if (window.innerWidth < 1024) {
      closeFilterBox();
    }
  };

  const handleFilterValueChanges = (option, value) => {
    if (option === "planType") {
      if (filterValues.planType.includes(value)) {
        const newValue = filterValues.planType.filter((type) => type !== value);

        setFilterValues({ ...filterValues, [option]: newValue });

        return;
      }

      const newValue = [...filterValues.planType];

      newValue.push(value);

      setFilterValues({ ...filterValues, [option]: newValue });

      return;
    }

    if (option === "provider") {
      if (filterValues.provider.includes(value)) {
        const newValue = filterValues.provider.filter((prov) => prov !== value);

        setFilterValues({ ...filterValues, [option]: newValue });

        return;
      }

      const newValue = [...filterValues.provider];

      newValue.push(value);

      setFilterValues({ ...filterValues, [option]: newValue });

      return;
    }

    setFilterValues({ ...filterValues, [option]: value });
  };

  useEffect(() => {
    setResetInputs(true);
  }, []);

  useEffect(() => {
    if (filterValues.cep.length === 9) {
      if (
        filterValues.cep !== filterValuesValidator.cep ||
        filterValues.cost !== filterValuesValidator.cost ||
        filterValues.franchise !== filterValuesValidator.franchise ||
        JSON.stringify(filterValues.planType) !==
          JSON.stringify(filterValuesValidator.planType) ||
        JSON.stringify(filterValues.provider) !==
          JSON.stringify(filterValuesValidator.provider)
      ) {
        setIsFilterOptionValid(true);
      } else {
        setIsFilterOptionValid(false);
      }
    } else {
      setIsFilterOptionValid(false);
    }
  }, [filterValues, filterValuesValidator]);

  useEffect(() => {
    const submitData = () => {
      setLoading();
      setCelPlans([]);
      setFilteredCelPlans([]);

      const data = {
        cep: filterValues.cep,
        provider: filterValues.provider,
        cost: filterValues.cost,
        franchise: filterValues.franchise,
        planType: filterValues.planType,
      };

      api
        .post("plan/cel-plan/filter", data)
        .then((res) => {
          const sortedPlans = res.data.sort((a, b) => a.priority - b.priority);

          setTimeout(() => {
            setFilteredCelPlans(sortedPlans);
          }, 350);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsFilterSubmitting(false);
          setIsFilterOptionValid(false);
          setFilterValuesValidator({ ...filterValues });
          setCelPlans([]);
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
    <div ref={bodyRef} className="body-container">
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
                  autoCorrect="off"
                  autoComplete="off"
                  onChange={(event) => {
                    let cep = event.target.value.replace(/\D/g, "");

                    if (cep.length === 8) {
                      cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
                    }

                    handleFilterValueChanges("cep", cep);
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
                    id="cost50"
                    name="cost"
                    value={50}
                    onChange={(e) =>
                      handleFilterValueChanges("cost", Number(e.target.value))
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    type="radio"
                    className="filter-form-cost-input"
                  />
                  Até R$ 50,00
                </label>

                <label htmlFor="cost100" className="filter-form-cost-label">
                  <input
                    id="cost100"
                    name="cost"
                    value={100}
                    onChange={(e) =>
                      handleFilterValueChanges("cost", Number(e.target.value))
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    type="radio"
                    className="filter-form-cost-input"
                  />
                  Até R$ 100,00
                </label>

                <label htmlFor="cost150" className="filter-form-cost-label">
                  <input
                    id="cost150"
                    name="cost"
                    value={150}
                    onChange={(e) =>
                      handleFilterValueChanges("cost", Number(e.target.value))
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    type="radio"
                    className="filter-form-cost-input"
                  />
                  Até R$ 150,00
                </label>
                <label htmlFor="cost300" className="filter-form-cost-label">
                  <input
                    id="cost300"
                    name="cost"
                    value={300}
                    defaultChecked={resetInputs}
                    onChange={(e) =>
                      handleFilterValueChanges("cost", Number(e.target.value))
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    type="radio"
                    className="filter-form-cost-input"
                  />
                  Até R$ 300,00
                </label>
              </div>

              <div className="filter-form-franchise-box">
                <span className="filter-form-franchise-title">
                  Franquia de internet
                </span>

                <label htmlFor="10gb" className="filter-form-franchise-label">
                  <input
                    type="radio"
                    id="10gb"
                    name="franchise"
                    value="10GB"
                    onChange={(e) =>
                      handleFilterValueChanges("franchise", e.target.value)
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-franchise-input"
                  />
                  Até 10GB
                </label>

                <label htmlFor="25gb" className="filter-form-franchise-label">
                  <input
                    type="radio"
                    id="25gb"
                    name="franchise"
                    value="25GB"
                    onChange={(e) =>
                      handleFilterValueChanges("franchise", e.target.value)
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-franchise-input"
                  />
                  Até 25GB
                </label>

                <label htmlFor="50gb" className="filter-form-franchise-label">
                  <input
                    type="radio"
                    id="50gb"
                    name="franchise"
                    value="50GB"
                    onChange={(e) =>
                      handleFilterValueChanges("franchise", e.target.value)
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-franchise-input"
                  />
                  Até 50GB
                </label>

                <label htmlFor="300gb" className="filter-form-franchise-label">
                  <input
                    type="radio"
                    id="300gb"
                    name="franchise"
                    value="300GB"
                    defaultChecked={resetInputs}
                    onChange={(e) =>
                      handleFilterValueChanges("franchise", e.target.value)
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-franchise-input"
                  />
                  Até 300GB
                </label>
              </div>

              <div className="filter-form-plan-type-box">
                <span className="filter-form-plan-type-title">
                  Tipo do plano
                </span>

                <label
                  htmlFor="controle"
                  className="filter-form-plan-type-label"
                >
                  <input
                    type="checkbox"
                    id="controle"
                    name="planType"
                    value="Controle"
                    onChange={(e) =>
                      handleFilterValueChanges("planType", e.target.value)
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-plan-type-input"
                  />
                  Controle
                </label>

                <label
                  htmlFor="posPago"
                  className="filter-form-plan-type-label"
                >
                  <input
                    type="checkbox"
                    id="posPago"
                    name="planType"
                    value="Pós-pago"
                    onChange={(e) =>
                      handleFilterValueChanges("planType", e.target.value)
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-plan-type-input"
                  />
                  Pós-pago
                </label>

                <label
                  htmlFor="prePago"
                  className="filter-form-plan-type-label"
                >
                  <input
                    type="checkbox"
                    id="prePago"
                    name="planType"
                    value="Pré-pago"
                    onChange={(e) =>
                      handleFilterValueChanges("planType", e.target.value)
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    className="filter-form-plan-type-input"
                  />
                  Pré-pago
                </label>
              </div>

              <div className="filter-form-provider-box">
                <span className="filter-form-provider-title">Operadora</span>

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
                        handleFilterValueChanges("provider", event.target.value)
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
              disabled={!isFilterOptionValid}
              onClick={handleSubmitFilterButton}
              className="filter-form-submit-button"
            >
              Aplicar
            </button>
          </form>
        </div>

        <div className="result-box">
          <span className="result-status">
            {celPlans.length !== 0 ? celPlans.length : filteredCelPlans.length}{" "}
            Resultado(s)
          </span>

          <div className="result-wrapper">
            <AnimatePresence>
              {filteredCelPlans.length !== 0 ? (
                filteredCelPlans
                  .slice(0, sliceEnd)
                  .map((plan) => (
                    <Plan
                      key={plan._id}
                      id={plan._id}
                      providerLogo={plan.providerIcon}
                      title={plan.title}
                      franchise={plan.franchise}
                      unlimitedApps={plan.unlimitedApps}
                      unlimitedCall={plan.unlimitedCall}
                      cost={plan.cost}
                      description={plan.description}
                    />
                  ))
              ) : celPlans.length !== 0 ? (
                celPlans
                  .slice(0, sliceEnd)
                  .map((plan) => (
                    <Plan
                      key={plan._id}
                      id={plan._id}
                      providerLogo={plan.providerIcon}
                      title={plan.title}
                      franchise={plan.franchise}
                      unlimitedApps={plan.unlimitedApps}
                      unlimitedCall={plan.unlimitedCall}
                      cost={plan.cost}
                      description={plan.description}
                    />
                  ))
              ) : (
                <span className="result-not-found-message">
                  Nenhum plano encontrado
                </span>
              )}
            </AnimatePresence>
            {celPlans.length > sliceEnd ? (
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
            {filteredCelPlans.length > sliceEnd ? (
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

export default CelPlansBody;
