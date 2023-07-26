import React, { useRef, useEffect, useState } from "react";
import useInternetPlanStore from "../../../stores/useInternetPlansStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { motion, AnimatePresence } from "framer-motion";
import { shallow } from "zustand/shallow";
import api from "../../../services/api";

import Plan from "./Plan";
import Loading from "../../components/Loading";

const InternetPlansBody = ({
  filterValues,
  setFilterValues,
  filterValuesValidator,
  setFilterValuesValidator,
}) => {
  const {
    internetPlans,
    providers,
    filteredInternetPlans,
    setFilteredInternetPlans,
    setInternetPlans,
  } = useInternetPlanStore(
    (state) => ({
      internetPlans: state.internetPlans,
      providers: state.providers,
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

  const resetSlice = () => {
    setSliceEnd(5);
  };

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

    setSliceEnd((prev) => prev + 5);
  };

  const handleShowMoreFiltered = () => {
    if (filteredInternetPlans.length <= sliceEnd) {
      return;
    }

    setSliceEnd((prev) => prev + 5);
  };

  const handleSubmitFilterButton = (event) => {
    event.preventDefault();

    setIsFilterSubmitting(true);

    if (window.innerWidth < 1024) {
      closeFilterBox();
    }
  };

  const handleFilterValuesChanges = (option, value) => {
    if (option === "technology") {
      if (filterValues.technology.includes(value)) {
        const newValue = filterValues.technology.filter((tech) => tech !== value);
        setFilterValues({ ...filterValues, [option]: newValue });
        return;
      }

      const newValue = [...filterValues.technology];
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
        filterValues.download !== filterValuesValidator.download ||
        JSON.stringify(filterValues.technology) !==
          JSON.stringify(filterValuesValidator.technology) ||
        JSON.stringify(filterValues.provider) !== JSON.stringify(filterValuesValidator.provider)
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
          }, 350);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsFilterSubmitting(false);
          setIsFilterOptionsValid(false);
          setFilterValuesValidator({ ...filterValues });
          setInternetPlans([]);
          resetSlice();
          unsetLoading();
        });
    };

    if (isFilterSubmitting) {
      submitData();
    }
  }, [isFilterSubmitting]);

  useEffect(() => {
    console.log("filteredInternetPlans: ", filteredInternetPlans);
  }, [filteredInternetPlans]);

  return (
    <div className="body-container">
      <AnimatePresence>
        {isLoading && <Loading key={isLoading} type="spin" color="#8186bc" />}
      </AnimatePresence>
      <div className="body-wrapper wrapper">
        <div className="filter-form-container">
          <button type="button" onClick={handleFilterBoxButton} className="filter-form-button">
            Filtrar
          </button>

          <form
            ref={filterRef}
            style={
              isFilterOpen
                ? { maxHeight: `${filterRef.current.scrollHeight + 25}px` }
                : { maxHeight: "0px" }
            }
            className="filter-form-box">
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

                <label htmlFor="cost100" className="filter-form-cost-label">
                  <input
                    id="cost100"
                    name="cost"
                    value={100}
                    onChange={(e) => handleFilterValuesChanges("cost", Number(e.target.value))}
                    autoComplete="off"
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
                    onChange={(e) => handleFilterValuesChanges("cost", Number(e.target.value))}
                    autoComplete="off"
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
                    onChange={(e) => handleFilterValuesChanges("cost", Number(e.target.value))}
                    autoComplete="off"
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
                    defaultChecked={resetInputs}
                    onChange={(e) => handleFilterValuesChanges("cost", Number(e.target.value))}
                    autoComplete="off"
                    type="radio"
                    className="filter-form-cost-input"
                  />
                  Até R$ 500,00
                </label>
              </div>

              <div className="filter-form-download-box">
                <span className="filter-form-download-title">Velocidade de Internet</span>

                <label htmlFor="download10" className="filter-form-download-label">
                  <input
                    type="radio"
                    id="download10"
                    name="download"
                    value="10MB"
                    onChange={(e) => handleFilterValuesChanges("download", e.target.value)}
                    autoComplete="off"
                    className="filter-form-download-input"
                  />
                  Até 10MB
                </label>

                <label htmlFor="download100" className="filter-form-download-label">
                  <input
                    type="radio"
                    id="download100"
                    name="download"
                    value="100MB"
                    onChange={(e) => handleFilterValuesChanges("download", e.target.value)}
                    autoComplete="off"
                    className="filter-form-download-input"
                  />
                  Até 100MB
                </label>

                <label htmlFor="download200" className="filter-form-download-label">
                  <input
                    type="radio"
                    id="download200"
                    name="download"
                    value="200MB"
                    onChange={(e) => handleFilterValuesChanges("download", e.target.value)}
                    autoComplete="off"
                    className="filter-form-download-input"
                  />
                  Até 200MB
                </label>

                <label htmlFor="download500" className="filter-form-download-label">
                  <input
                    type="radio"
                    id="download500"
                    name="download"
                    value="500MB"
                    onChange={(e) => handleFilterValuesChanges("download", e.target.value)}
                    autoComplete="off"
                    className="filter-form-download-input"
                  />
                  Até 500MB
                </label>

                <label htmlFor="download1000" className="filter-form-download-label">
                  <input
                    type="radio"
                    id="download1000"
                    name="download"
                    value="1000MB"
                    defaultChecked={resetInputs}
                    onChange={(e) => handleFilterValuesChanges("download", e.target.value)}
                    autoComplete="off"
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
                    onChange={(e) => handleFilterValuesChanges("technology", e.target.value)}
                    autoComplete="off"
                    className="filter-form-plan-type-input"
                  />
                  Fibra Ótica
                </label>

                <label htmlFor="metalico" className="filter-form-plan-type-label">
                  <input
                    type="checkbox"
                    id="metalico"
                    name="planType"
                    value="Cabo Metálico"
                    onChange={(e) => handleFilterValuesChanges("technology", e.target.value)}
                    autoComplete="off"
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
                    onChange={(e) => handleFilterValuesChanges("technology", e.target.value)}
                    autoComplete="off"
                    className="filter-form-plan-type-input"
                  />
                  Via Rádio
                </label>

                <label htmlFor="satelite" className="filter-form-plan-type-label">
                  <input
                    type="checkbox"
                    id="satelite"
                    name="planType"
                    value="Via Satélite"
                    onChange={(e) => handleFilterValuesChanges("technology", e.target.value)}
                    autoComplete="off"
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
                    className="filter-form-provider-label">
                    <input
                      type="checkbox"
                      id={provider}
                      name="provider"
                      value={provider}
                      onChange={(event) =>
                        handleFilterValuesChanges("provider", event.target.value)
                      }
                      autoComplete="off"
                      className="filter-form-provider-input"
                    />
                    {provider}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFilterOptionsValid}
              onClick={handleSubmitFilterButton}
              className="filter-form-submit-button">
              Aplicar
            </button>
          </form>
        </div>

        <div className="result-box">
          <span className="result-status">
            {internetPlans.length !== 0 ? internetPlans.length : filteredInternetPlans.length}{" "}
            Resultado(s)
          </span>

          <motion.div
            transition={{ staggerChildren: 0.3 }}
            initial="offscreen"
            animate="onscreen"
            viewport={{ once: true }}
            className="result-wrapper">
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
                <span className="result-not-found-message">Nenhum plano encontrado</span>
              )}
            </AnimatePresence>
            {internetPlans.length > sliceEnd && filteredInternetPlans.length === 0 ? (
              <button type="button" onClick={handleShowMore} className="result-show-more-button">
                MOSTRAR MAIS
              </button>
            ) : null}
            {filteredInternetPlans.length > sliceEnd && internetPlans.length === 0 ? (
              <button
                type="button"
                onClick={handleShowMoreFiltered}
                className="result-show-more-button">
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
