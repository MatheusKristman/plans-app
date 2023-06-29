import React, { useRef, useMemo, useEffect } from "react";
import useInternetPlanStore from "../../../stores/useInternetPlansStore";
import useRegisterStore from "../../../stores/useRegisterStore";
import useGeneralStore from "../../../stores/useGeneralStore";
import { shallow } from "zustand/shallow";
import { motion } from "framer-motion";

const Plan = ({
  id,
  providerLogo,
  title,
  download,
  benefits,
  technology,
  cost,
  description,
}) => {
  const { idActiveToSeeMore, handleIdActiveToSeeMore, internetPlans } =
    useInternetPlanStore(
      (state) => ({
        idActiveToSeeMore: state.idActiveToSeeMore,
        handleIdActiveToSeeMore: state.handleIdActiveToSeeMore,
        internetPlans: state.internetPlans,
      }),
      shallow
    );
  const { setPlanSelected, openRegisterForm, generateSteps } = useRegisterStore(
    (state) => ({
      setPlanSelected: state.setPlanSelected,
      openRegisterForm: state.openRegisterForm,
      generateSteps: state.generateSteps,
    }),
    shallow
  );
  const { activateModalAnimation } = useGeneralStore(
    (state) => ({
      activateModalAnimation: state.activateModalAnimation,
    }),
    shallow
  );

  const cardAnimation = useMemo(() => ({
    offscreen: { y: -50, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  }));

  const handleRegisterButton = () => {
    setPlanSelected({
      logo: providerLogo,
      title,
      franchise: download,
      cost,
      id,
      type: "internet",
      planType: "internetPlan",
    });
    generateSteps({ step1: true, step2: false, step3: false, step4: false });
    openRegisterForm();
    activateModalAnimation();
  };

  const descriptionRef = useRef();

  return (
    <motion.div
      key="box"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="plan-box"
    >
      <div className="plan-wrapper">
        <div className="plan-title-box">
          <div className="plan-provider-logo-box">
            <img
              src={`${import.meta.env.VITE_API_KEY}/assets/${providerLogo}`}
              alt={providerLogo?.slice(providerLogo.length - 4)}
              className="plan-provider-logo"
            />
          </div>

          <h5 className="plan-title">{title}</h5>
        </div>

        <div className="plan-benefits-wrapper">
          <div className="plan-benefits-box">
            <div className="plan-benefits-download-box">
              <span className="plan-benefits-download">{download}</span>
            </div>

            <div className="plan-benefits-benefits-box">
              <span className="plan-benefits-benefits-title">Benefícios</span>

              <ul className="plan-benefits-benefits-list">
                {benefits?.length > 2 ? (
                  <>
                    {benefits?.slice(0, 2).map((app, index) => (
                      <li
                        key={`app-${index}`}
                        className="plan-benefits-benefits-item"
                      >
                        {app}
                      </li>
                    ))}
                    <li className="plan-benefits-benefits-item">
                      +{benefits?.length - 2}
                    </li>
                  </>
                ) : benefits?.length !== 0 ? (
                  benefits?.map((app, index) => (
                    <li
                      key={`app-${index}`}
                      className="plan-benefits-benefits-item"
                    >
                      {app}
                    </li>
                  ))
                ) : (
                  <li
                    key={`app-${index}`}
                    className="plan-benefits-benefits-item"
                  >
                    Não possui
                  </li>
                )}
              </ul>
            </div>

            <div className="plan-benefits-technology-box">
              <span className="plan-benefits-technology-title">
                Tecnologia do modem
              </span>

              <span className="plan-benefits-technology">{technology}</span>
            </div>

            <div className="plan-benefits-cost-box">
              <span className="plan-benefits-cost-unit">R$</span>

              <span className="plan-benefits-cost-value">
                {cost
                  .toFixed(2)
                  .toString()
                  .slice(0, cost.toFixed(2).toString().length - 3)}
              </span>

              <div className="plan-benefits-cost-wrapper">
                <span className="plan-benefits-cost-decimal">
                  {cost
                    .toFixed(2)
                    .toString()
                    .substring(cost.toFixed(2).toString().length - 3)
                    .replace(".", ",")}
                </span>
                <span className="plan-benefits-cost-period">/mês</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegisterButton}
            className="plan-acquire-button"
          >
            CONTRATAR
          </button>
        </div>

        <div className="plan-details-box">
          <div className="plan-details-wrapper">
            {description.join().length > 150 ? (
              <>
                <span
                  ref={descriptionRef}
                  style={
                    idActiveToSeeMore === id
                      ? {
                          maxHeight: `${
                            descriptionRef.current?.scrollHeight + 50
                          }px`,
                          paddingBottom: "50px",
                        }
                      : { maxHeight: "100px", paddingBottom: "0px" }
                  }
                  className="plan-details-desc"
                >
                  {description.map((desc, i) => (
                    <p
                      key={`description-${i}`}
                      style={
                        i === description.length - 1
                          ? { marginBottom: "0px" }
                          : { marginBottom: "25px" }
                      }
                    >
                      {desc}
                    </p>
                  ))}
                </span>
                <button
                  type="button"
                  onClick={() => handleIdActiveToSeeMore(id)}
                  className="plan-details-expand-button"
                >
                  {idActiveToSeeMore === id ? "Ler menos" : "Ler mais"}
                </button>
              </>
            ) : (
              <span className="plan-details-desc">
                {description.map((desc, i) => (
                  <p
                    key={`description-${i}`}
                    style={
                      i === description.length - 1
                        ? { marginBottom: "0px" }
                        : { marginBottom: "25px" }
                    }
                  >
                    {desc}
                  </p>
                ))}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Plan;
