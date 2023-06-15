import React, { useRef, useEffect } from "react";
import useCelPlansStore from "../../../stores/useCelPlansStore";
import { shallow } from "zustand/shallow";
import api from "../../../services/api";

import Plan from "./Plan";

const CelPlansBody = () => {
  const {
    isFilterOpen,
    openFilterBox,
    closeFilterBox,
    celPlans,
    setCelPlans,
    filteredCelPlans,
    setFilteredCelPlans,
    sliceBegin,
    setSliceBegin,
    sliceEnd,
    setSliceEnd,
    filterValues,
    setFilterValues,
    handlePlanTypeFilterOption,
    handleProviderFilterOption,
    providers,
    submittingFilter,
    setSubmittingFilter,
    unsetSubmittingFilter,
    validFilterOptions,
    setValidFilterOptions,
    unsetValidFilterOptions,
  } = useCelPlansStore(
    (state) => ({
      isFilterOpen: state.isFilterOpen,
      openFilterBox: state.openFilterBox,
      closeFilterBox: state.closeFilterBox,
      celPlans: state.celPlans,
      setCelPlans: state.setCelPlans,
      filteredCelPlans: state.filteredCelPlans,
      setFilteredCelPlans: state.setFilteredCelPlans,
      sliceBegin: state.sliceBegin,
      setSliceBegin: state.setSliceBegin,
      sliceEnd: state.sliceEnd,
      setSliceEnd: state.setSliceEnd,
      filterValues: state.filterValues,
      setFilterValues: state.setFilterValues,
      handlePlanTypeFilterOption: state.handlePlanTypeFilterOption,
      handleProviderFilterOption: state.handleProviderFilterOption,
      providers: state.providers,
      submittingFilter: state.submittingFilter,
      setSubmittingFilter: state.setSubmittingFilter,
      unsetSubmittingFilter: state.unsetSubmittingFilter,
      validFilterOptions: state.validFilterOptions,
      setValidFilterOptions: state.setValidFilterOptions,
      unsetValidFilterOptions: state.unsetValidFilterOptions,
    }),
    shallow
  );

  const filterRef = useRef();

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

    setSliceEnd(sliceEnd + 5);
    setSliceBegin(sliceBegin + 5);
  };

  const handleSubmitFilterButton = (event) => {
    event.preventDefault();

    setSubmittingFilter();
  };

  useEffect(() => {
    if (
      filterValues.cep !== "" &&
      filterValues.cep.length === 9 &&
      filterValues.cost !== 0 &&
      filterValues.franchise !== ""
    ) {
      setValidFilterOptions();
    }
  }, [filterValues]);

  useEffect(() => {
    const submitData = () => {
      const data = {
        cep: filterValues.cep,
        provider: filterValues.provider,
        cost: filterValues.cost,
        franchise: filterValues.franchise,
        planType: filterValues.planType,
      };

      api
        .post("plan/cel-plan/filter", data)
        .then((res) => setFilteredCelPlans(res.data))
        .catch((err) => console.error(err))
        .finally(() => {
          unsetSubmittingFilter();
          unsetValidFilterOptions();
          setCelPlans([]);
        });
    };

    if (submittingFilter) {
      submitData();
    }
  }, [submittingFilter]);

  useEffect(() => {
    console.log(filterValues);
  }, [filterValues]);

  return (
    <div className="body-container">
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
                ? { maxHeight: `${filterRef.current.scrollHeight + 25}px` }
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

                    setFilterValues("cep", cep);
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
                      setFilterValues("cost", Number(e.target.value))
                    }
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
                      setFilterValues("cost", Number(e.target.value))
                    }
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
                      setFilterValues("cost", Number(e.target.value))
                    }
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
                    onChange={(e) =>
                      setFilterValues("cost", Number(e.target.value))
                    }
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
                      setFilterValues("franchise", e.target.value)
                    }
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
                      setFilterValues("franchise", e.target.value)
                    }
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
                      setFilterValues("franchise", e.target.value)
                    }
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
                    onChange={(e) =>
                      setFilterValues("franchise", e.target.value)
                    }
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
                    onChange={(e) => handlePlanTypeFilterOption(e.target.value)}
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
                    onChange={(e) => handlePlanTypeFilterOption(e.target.value)}
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
                    onChange={(e) => handlePlanTypeFilterOption(e.target.value)}
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
                        handleProviderFilterOption(event.target.value)
                      }
                      className="filter-form-provider-input"
                    />
                    {provider}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!validFilterOptions}
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
            {filteredCelPlans.length !== 0 ? (
              filteredCelPlans
                .slice(sliceBegin, sliceEnd)
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
                .slice(sliceBegin, sliceEnd)
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelPlansBody;
