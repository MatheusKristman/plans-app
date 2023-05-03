import { Box, Radio, Stack, Typography } from "@mui/material";
import { mockCities } from "../../utils/Cities/cities";
import { linesLoop } from "../../utils/Lines/Lines";
import { pricesLoop } from "../../utils/Price/Price";
import { franchiseAtLeast } from "../../utils/Franchises/franchises";
import { operadoras } from "../../utils/Menus/menuItems";
import { planTypes } from "../../utils/PlanTypes/planTypes";
import { unlimitedApps } from "../../utils/UnlimitedApps/unlimitedApps";
import { useState, useContext, useEffect } from "react";
import States from "../States";
import { PlansContext } from "../../contexts/Plans/PlansContext";
import axios from "axios";

function HirePlanForm({ clientRegisterMenu }) {
  const { initialFilterOptions, setFilteredPlans } = useContext(PlansContext);

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [lines, setLines] = useState(initialFilterOptions.lines);
  const [cost, setCost] = useState(initialFilterOptions.cost);
  const [franchise, setFranchise] = useState(initialFilterOptions.franchise);
  const [provider, setProvider] = useState(initialFilterOptions.provider);
  const [planType, setPlanType] = useState(initialFilterOptions.planType);
  const [unlimitedApp, setUnlimitedApp] = useState(
    initialFilterOptions.unlimitedApps
  );
  const [filterChanged, setFilterChanged] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
  };

  const handleProviders = (operadora) => {
    setFilterChanged(true);
    if (provider.includes(operadora.name)) {
      let providerIndex = provider.indexOf(operadora.name);
      provider.splice(providerIndex, 1);
      return;
    }
    setProvider([...provider, operadora.name]);
  };

  const handlePlanType = (plan) => {
    setFilterChanged(true);
    if (planType.includes(plan.name)) {
      let providerIndex = planType.indexOf(plan.name);
      planType.splice(providerIndex, 1);
      return;
    }
    setPlanType([...planType, plan.name]);
  };

  const verifyUnlimitedApp = (app) => {
    setFilterChanged(true);
    if (unlimitedApp.includes(app.name)) {
      let appIndex = unlimitedApp.indexOf(app.name);
      unlimitedApp.splice(appIndex, 1);
      return;
    }
    setUnlimitedApp([...unlimitedApp, app.name]);
  };

  useEffect(() => {
    const filterPlans = () => {
      const filter = {
        city: city,
        lines: lines || 1,
        cost: cost || 1000,
        franchise: franchise || 200,
        provider: provider || ["Claro", "Tim", "Vivo", "Oi"],
        planType: planType || ["Pós-pago", "Controle"],
        unlimitedApps: unlimitedApp || [
          "Whatsapp",
          "Instagram",
          "Telegram",
          "Facebook",
          "Messenger",
          "Twitter",
          "Waze",
          "Cabify",
          "Easy Taxi",
          "Moovit",
          "Tiktok",
          "Netflix",
          "Youtube",
          "Claro Música",
        ],
      };

      axios
        .post(`${import.meta.env.VITE_API_BASE}/plan/filter`, filter)
        .then((res) => {
          document.documentElement.style.pointerEvents = "unset";
          setFilteredPlans(res.data);
          setSubmitting(false);
          setFilterChanged(false);
        })
        .catch((err) => {
          document.documentElement.style.pointerEvents = "unset";
          console.error(err.message);
          setSubmitting(false);
        });
    };

    if (submitting) {
      filterPlans();
    }
  }, [submitting]);

  return (
    <form
      style={{
        width: "25%",
        position: "relative",
      }}
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          width: "100%",
          background: "#F0F1F6",
          borderRadius: "10px",
          padding: "30px 25px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          position: "relative",
          zIndex: "2",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            borderBottom: "2px solid lightGray",
            paddingBottom: "30px",
          }}
        >
          <States
            selectedCity={city}
            setSelectedCity={setCity}
            setSelectedStateName={setState}
            stateLabel={"Estado"}
            cityLabel={"Cidade"}
            isSearchPage={true}
            setFilterChanged={setFilterChanged}
          />
        </Stack>

        <Stack
          sx={{
            width: "100%",
            borderBottom: "2px solid lightGray",
            paddingBottom: "30px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              cursor: "default",
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: "1.25rem",
              marginBottom: "15px",
              color: "#252525",
            }}
          >
            Número de Linhas
          </Typography>
          {linesLoop.map((line, i) => (
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                position: "relative",
                marginBottom: i === linesLoop.length - 1 ? "" : "10px",
              }}
              key={line.id}
              onChange={(e) => {
                setLines(e.target.value);
                setFilterChanged(true);
              }}
            >
              <input
                type="radio"
                name="plan-line"
                defaultChecked={i == linesLoop.length - 1}
                value={line.value}
                style={{
                  accentColor: "#D40066",
                }}
              />
              {line.name}
            </label>
          ))}
        </Stack>

        <Stack
          sx={{
            width: "100%",
            borderBottom: "2px solid lightGray",
            paddingBottom: "30px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: "1.25rem",
              marginBottom: "15px",
              color: "#252525",
            }}
          >
            Preço
          </Typography>
          {pricesLoop.map((price, i) => (
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                marginBottom: i === pricesLoop.length - 1 ? "" : "10px",
              }}
              key={price.id}
              onChange={(e) => {
                setCost(e.target.value);
                setFilterChanged(true);
              }}
            >
              <input
                type="radio"
                name="plan-price"
                defaultChecked={i == pricesLoop.length - 1}
                value={price.value}
                style={{
                  accentColor: "#D40066",
                }}
              />
              {price.name}
            </label>
          ))}
        </Stack>

        <Stack
          sx={{
            width: "100%",
            borderBottom: "2px solid lightGray",
            paddingBottom: "30px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: "1.25rem",
              marginBottom: "15px",
              color: "#252525",
            }}
          >
            Franquias de internet
          </Typography>
          {franchiseAtLeast.map((franchise, i) => (
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                marginBottom: i === franchiseAtLeast.length - 1 ? "" : "10px",
              }}
              key={franchise.id}
              onChange={(e) => {
                setFranchise(e.target.value);
                setFilterChanged(true);
              }}
            >
              <input
                type="radio"
                name="plan-franchise"
                defaultChecked={i == franchiseAtLeast.length - 1}
                value={franchise.value}
                style={{
                  accentColor: "#D40066",
                }}
              />
              {franchise.name}
            </label>
          ))}
        </Stack>

        <Stack
          sx={{
            width: "100%",
            borderBottom: "2px solid lightGray",
            paddingBottom: "30px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: "1.25rem",
              marginBottom: "15px",
              color: "#252525",
            }}
          >
            Provedores
          </Typography>
          {operadoras.map((operadora, i) => (
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                marginBottom: i === operadoras.length - 1 ? "" : "10px",
              }}
              key={operadora.id}
              onChange={() => {
                handleProviders(operadora);
              }}
            >
              <input
                type="checkbox"
                name="plan-provider"
                defaultChecked={true}
                value={operadora.name}
                style={{
                  accentColor: "#D40066",
                }}
              />
              {operadora.name}
            </label>
          ))}
        </Stack>

        <Stack
          sx={{
            width: "100%",
            borderBottom: "2px solid lightGray",
            paddingBottom: "30px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: "1.25rem",
              marginBottom: "15px",
              color: "#252525",
            }}
          >
            Planos
          </Typography>
          {planTypes.map((plan, i) => (
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                marginBottom: i === planTypes.length - 1 ? "" : "10px",
              }}
              key={plan.id}
              onChange={() => {
                handlePlanType(plan);
              }}
            >
              <input
                type="checkbox"
                name="plan-type"
                defaultChecked={true}
                value={plan.name}
                style={{
                  accentColor: "#D40066",
                }}
              />
              {plan.name}
            </label>
          ))}
        </Stack>

        <Stack
          sx={{
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: "1.25rem",
              marginBottom: "15px",
              color: "#252525",
            }}
          >
            Apps Ilimitados
          </Typography>
          {unlimitedApps.map((app, i) => (
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                marginBottom: i === unlimitedApps.length - 1 ? "" : "10px",
              }}
              key={app.id}
              onChange={() => {
                verifyUnlimitedApp(app);
              }}
            >
              <input
                type="checkbox"
                name="plan-apps"
                defaultChecked={true}
                value={app.name}
                style={{
                  accentColor: "#D40066",
                }}
              />
              {app.name}
            </label>
          ))}
        </Stack>
      </Box>

      <button
        type="submit"
        style={{
          width: "100%",
          background: "#D40066",
          color: "#fff",
          fontSize: "1.25rem",
          fontWeight: "600",
          textTransform: "uppercase",
          padding: "25px 50px",
          position: "absolute",
          top: "0px",
          zIndex: "1",
          display: "block",
          right: "0%",
          border: "none",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          cursor: "pointer",
          transition: "top 0.3s ease",
          filter: submitting ? "brightness(80%)" : "",
          pointerEvents: submitting ? "none" : "unset",
        }}
        className={filterChanged ? "filter-btn-active" : "filter-btn-desactive"}
        disabled={!filterChanged}
      >
        {submitting ? "Aplicando" : "Aplicar"}
      </button>
    </form>
  );
}

export default HirePlanForm;
