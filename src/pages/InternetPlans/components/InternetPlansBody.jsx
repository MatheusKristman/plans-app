import React, { useRef, useEffect, useMemo } from "react";
import useInternetPlanStore from "../../../stores/useInternetPlansStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { motion, AnimatePresence } from "framer-motion";
import { shallow } from "zustand/shallow";
import api from "../../../services/api";

import Plan from "./Plan";
import Loading from "../../components/Loading";

const InternetPlansBody = () => {
  const {
    isFilterOpen,
    openFilterBox,
    closeFilterBox,
    internetPlans,
    sliceEnd,
    setSliceEnd,
    resetSlice,
    filterValues,
    setFilterValues,
    handleTechnologyFilterOption,
    handleProviderFilterOption,
    providers,
    submittingFilter,
    setSubmittingFilter,
    unsetSubmittingFilter,
    validFilterOptions,
    setValidFilterOptions,
    unsetValidFilterOptions,
    filteredInternetPlans,
    setFilteredInternetPlans,
    setInternetPlans,
  } = useInternetPlanStore(
    (state) => ({
      isFilterOpen: state.isFilterOpen,
      openFilterBox: state.openFilterBox,
      closeFilterBox: state.closeFilterBox,
      internetPlans: state.internetPlans,
      sliceEnd: state.sliceEnd,
      setSliceEnd: state.setSliceEnd,
      resetSlice: state.resetSlice,
      filterValues: state.filterValues,
      setFilterValues: state.setFilterValues,
      handleTechnologyFilterOption: state.handleTechnologyFilterOption,
      handleProviderFilterOption: state.handleProviderFilterOption,
      providers: state.providers,
      submittingFilter: state.submittingFilter,
      setSubmittingFilter: state.setSubmittingFilter,
      unsetSubmittingFilter: state.unsetSubmittingFilter,
      validFilterOptions: state.validFilterOptions,
      setValidFilterOptions: state.setValidFilterOptions,
      unsetValidFilterOptions: state.unsetValidFilterOptions,
      filteredInternetPlans: state.filteredInternetPlans,
      setFilteredInternetPlans: state.setFilteredInternetPlans,
      setInternetPlans: state.setInternetPlans,
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

  const filterRef = useRef();

  const filterAnimation = useMemo(() => ({
    offscreen: { y: -50, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));

  const handleFilterBoxButton = () => {
    if (isFilterOpen) {
      closeFilterBox();
      return;
    }

    openFilterBox();
  };

  const handleShowMore = () => {
    if (internetPlans.length <= sliceEnd) {
      return;
    }

    setSliceEnd();
  };

  const handleShowMoreFiltered = () => {
    if (filteredInternetPlans.length <= sliceEnd) {
      return;
    }

    setSliceEnd();
  };

  const handleSubmitFilterButton = (event) => {
    event.preventDefault();

    setSubmittingFilter();

    if (window.innerWidth < 1024) {
      closeFilterBox();
    }
  };

  useEffect(() => {
    if (
      filterValues.cep !== "" &&
      filterValues.cep.length === 9 &&
      filterValues.cost !== 0 &&
      filterValues.download !== ""
    ) {
      setValidFilterOptions();
    }
  }, [filterValues]);

  useEffect(() => {
    const submitData = () => {
      setLoading();

      const data = {
        cep: filterValues.cep,
        provider: filterValues.provider,
        cost: filterValues.cost,
        download: filterValues.download,
        technology: filterValues.technology,
      };

      api
        .post("plan/internet-plan/filter", data)
        .then((res) => {
          const sortedPlans = res.data.sort((a, b) => a.priority - b.priority);

          setInternetPlans([]);
          setFilteredInternetPlans([]);

          setTimeout(() => {
            setFilteredInternetPlans(sortedPlans);
          }, 300);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          unsetSubmittingFilter();
          unsetValidFilterOptions();
          setInternetPlans([]);
          resetSlice();
          unsetLoading();
        });
    };

    if (submittingFilter) {
      submitData();
    }
  }, [submittingFilter]);

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

          <motion.form
            variants={window.innerWidth >= 1024 ? filterAnimation : {}}
            initial="offscreen"
            animate="onscreen"
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
                  name="cep"
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

                <label htmlFor="cost200" className="filter-form-cost-label">
                  <input
                    id="cost200"
                    name="cost"
                    value={200}
                    onChange={(e) =>
                      setFilterValues("cost", Number(e.target.value))
                    }
                    type="radio"
                    className="filter-form-cost-input"
                  />
                  Até R$ 200,00
                </label>

                <label htmlFor="cost500" className="filter-form-cost-label">
                  <input
                    id="cost500"
                    name="cost"
                    value={500}
                    defaultChecked
                    onChange={(e) =>
                      setFilterValues("cost", Number(e.target.value))
                    }
                    type="radio"
                    className="filter-form-cost-input"
                  />
                  Até R$ 500,00
                </label>
              </div>

              <div className="filter-form-download-box">
                <span className="filter-form-download-title">
                  Velocidade de Internet
                </span>

                <label
                  htmlFor="download10"
                  className="filter-form-download-label"
                >
                  <input
                    type="radio"
                    id="download10"
                    name="download"
                    value="10MB"
                    onChange={(e) =>
                      setFilterValues("download", e.target.value)
                    }
                    className="filter-form-download-input"
                  />
                  Até 10MB
                </label>

                <label
                  htmlFor="download100"
                  className="filter-form-download-label"
                >
                  <input
                    type="radio"
                    id="download100"
                    name="download"
                    value="100MB"
                    onChange={(e) =>
                      setFilterValues("download", e.target.value)
                    }
                    className="filter-form-download-input"
                  />
                  Até 100MB
                </label>

                <label
                  htmlFor="download200"
                  className="filter-form-download-label"
                >
                  <input
                    type="radio"
                    id="download200"
                    name="download"
                    value="200MB"
                    onChange={(e) =>
                      setFilterValues("download", e.target.value)
                    }
                    className="filter-form-download-input"
                  />
                  Até 200MB
                </label>

                <label
                  htmlFor="download500"
                  className="filter-form-download-label"
                >
                  <input
                    type="radio"
                    id="download500"
                    name="download"
                    value="500MB"
                    onChange={(e) =>
                      setFilterValues("download", e.target.value)
                    }
                    className="filter-form-download-input"
                  />
                  Até 500MB
                </label>

                <label
                  htmlFor="download1000"
                  className="filter-form-download-label"
                >
                  <input
                    type="radio"
                    id="download1000"
                    name="download"
                    value="1000MB"
                    defaultChecked
                    onChange={(e) =>
                      setFilterValues("download", e.target.value)
                    }
                    className="filter-form-download-input"
                  />
                  Mais de 500MB
                </label>
              </div>

              <div className="filter-form-plan-type-box">
                <span className="filter-form-plan-type-title">Conexão via</span>

                <label htmlFor="fibra" className="filter-form-plan-type-label">
                  <input
                    type="checkbox"
                    id="fibra"
                    name="planType"
                    value="Fibra Ótica"
                    onChange={(e) =>
                      handleTechnologyFilterOption(e.target.value)
                    }
                    className="filter-form-plan-type-input"
                  />
                  Fibra Ótica
                </label>

                <label
                  htmlFor="metalico"
                  className="filter-form-plan-type-label"
                >
                  <input
                    type="checkbox"
                    id="metalico"
                    name="planType"
                    value="Cabo Metálico"
                    onChange={(e) =>
                      handleTechnologyFilterOption(e.target.value)
                    }
                    className="filter-form-plan-type-input"
                  />
                  Cabo Metálico
                </label>

                <label htmlFor="radio" className="filter-form-plan-type-label">
                  <input
                    type="checkbox"
                    id="radio"
                    name="planType"
                    value="Via Rádio"
                    onChange={(e) =>
                      handleTechnologyFilterOption(e.target.value)
                    }
                    className="filter-form-plan-type-input"
                  />
                  Via Rádio
                </label>

                <label
                  htmlFor="satelite"
                  className="filter-form-plan-type-label"
                >
                  <input
                    type="checkbox"
                    id="satelite"
                    name="planType"
                    value="Via Satélite"
                    onChange={(e) =>
                      handleTechnologyFilterOption(e.target.value)
                    }
                    className="filter-form-plan-type-input"
                  />
                  Via Satélite
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
          </motion.form>
        </div>

        <div className="result-box">
          <span className="result-status">
            {internetPlans.length !== 0
              ? internetPlans.length
              : filteredInternetPlans.length}{" "}
            Resultado(s)
          </span>

          <motion.div
            transition={{ staggerChildren: 0.3 }}
            initial="offscreen"
            animate="onscreen"
            viewport={{ once: true }}
            className="result-wrapper"
          >
            <AnimatePresence>
              {filteredInternetPlans.length !== 0 ? (
                filteredInternetPlans
                  .slice(0, sliceEnd)
                  .map((plan) => (
                    <Plan
                      key={plan._id}
                      id={plan._id}
                      providerLogo={plan.providerIcon}
                      title={plan.title}
                      download={plan.download}
                      benefits={plan.benefits}
                      technology={plan.technology}
                      cost={plan.cost}
                      description={plan.description}
                    />
                  ))
              ) : internetPlans.length !== 0 ? (
                internetPlans
                  .slice(0, sliceEnd)
                  .map((plan) => (
                    <Plan
                      key={plan._id}
                      id={plan._id}
                      providerLogo={plan.providerIcon}
                      title={plan.title}
                      download={plan.download}
                      benefits={plan.benefits}
                      technology={plan.technology}
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
            {internetPlans.length > sliceEnd &&
            filteredInternetPlans.length === 0 ? (
              <button
                type="button"
                onClick={handleShowMore}
                className="result-show-more-button"
              >
                MOSTRAR MAIS
              </button>
            ) : null}
            {filteredInternetPlans.length > sliceEnd &&
            internetPlans.length === 0 ? (
              <button
                type="button"
                onClick={handleShowMoreFiltered}
                className="result-show-more-button"
              >
                MOSTRAR MAIS
              </button>
            ) : null}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InternetPlansBody;
