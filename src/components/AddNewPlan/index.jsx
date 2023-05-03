import { Box, Stack, Typography } from "@mui/material";
import {
  NewPlanFinalInputs,
  NewPlanInputs,
  Operadoras,
  UnlimitedApps,
  Cities,
  States,
} from "../index";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useApi } from "../../hooks/useApi";
import { PlansContext } from "../../contexts/Plans/PlansContext";
import { CgClose } from "react-icons/cg";

function AddNewPlan({ menuTitle }) {
  const [selectedUf, setSelectedUf] = useState("");
  const [provider, setProvider] = useState("");
  const [cost, setCost] = useState("");
  const [title, setTitle] = useState("");
  const [inputDays, setInputDays] = useState("");
  const [unlimitedApp, setUnlimitedApp] = useState([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [period, setPeriod] = useState("");
  const [franchise, setFranchise] = useState("");
  const [unlimitedCall, setUnlimitedCall] = useState(false);
  const [planType, setPlanType] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [providerLogo, setProviderLogo] = useState([]);
  const lines = 1;

  const auth = useContext(AuthContext);
  const {
    plansMenu,
    isEditing,
    setIsEditing,
    setPlansMenu,
    editMenu,
    setEditMenu,
    setLoading,
    loading,
    setAllPlans,
    planId,
    selectedEditPlan,
    setSelectedEditPlan,
  } = useContext(PlansContext);
  const api = useApi();

  const backgroundRef = useRef();
  const modalRef = useRef();

  const handleMenus = () => {
    if (plansMenu) setPlansMenu(!plansMenu);
    if (editMenu) setEditMenu(!editMenu);
    if (isEditing) setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user && isEditing) {
      setLoading(true);
      const response = await api.editPlan(
        planId,
        title,
        cost,
        period,
        franchise,
        unlimitedApp,
        unlimitedCall,
        planType,
        priority,
        description,
        lines
      );

      if (response) {
        setAllPlans(response);
        setEditMenu(!editMenu);
        setLoading(false);
        window.location.reload();
      }

      return;
    }

    if (auth.user && !isEditing) {
      setLoading(true);
      const response = await api.createPlans(
        title,
        cost,
        period,
        franchise,
        unlimitedApp,
        unlimitedCall,
        planType,
        priority,
        description,
        lines,
        providerLogo,
        city,
        provider
      );

      if (response) {
        setAllPlans(response);
        setPlansMenu(!plansMenu);
        setLoading(false);
        window.location.reload();
      }
    }
  };

  const handleCloseModal = () => {
    backgroundRef.current.style.animation = "fadeOutBG 0.4s ease forwards";
    modalRef.current.style.animation = "fadeOut 0.2s ease forwards";

    setTimeout(() => {
      handleMenus();
    }, 400);
  };

  const handleCloseModalOnScreen = (e) => {
    if (e.target.classList.contains("plan-modal-bg")) {
      backgroundRef.current.style.animation = "fadeOutBG 0.4s ease forwards";
      modalRef.current.style.animation = "fadeOut 0.2s ease forwards";

      setTimeout(() => {
        handleMenus();
      }, 400);
    }
  };

  useEffect(() => {
    if (isEditing) {
      setTitle(selectedEditPlan.title);
      setCost(selectedEditPlan.cost);
      setFranchise(selectedEditPlan.franchise);
      setUnlimitedApp(selectedEditPlan.unlimitedApps);
      setPlanType(selectedEditPlan.planType);
      setPriority(selectedEditPlan.priority);
      setDescription(selectedEditPlan.description);
    }
  }, [isEditing]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(32, 33, 36, .5)",
        zIndex: "9",
        "::before": {
          content: '""',
          height: "100%",
          display: "inline-block",
          verticalAlign: "middle",
        },
        padding: "50px",
        overflow: "auto",
      }}
      className="plan-modal-bg"
      ref={backgroundRef}
      onClick={handleCloseModalOnScreen}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          display: "inline-block",
          width: "100%",
          height: "auto",
          maxWidth: "460px",
          verticalAlign: "middle",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "16px",
          overflow: "hidden",
          zIndex: "3",
        }}
        className="plan-modal-box"
        encType="multipart/form-data"
        ref={modalRef}
      >
        <Stack
          sx={{
            width: "100%",
          }}
        >
          {/* Caixa da Imagem */}

          <Box sx={{ position: "relative", width: "100%", height: "13%" }}>
            <img
              src="./assets/images/modal-figure.png"
              className="main-image"
            />
            <button
              style={{
                position: "absolute",
                right: "30px",
                top: "30px",
                width: "35px",
                height: "35px",
                borderRadius: "5px",
                cursor: "pointer",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
              }}
              type="button"
              onClick={handleCloseModal}
            >
              <CgClose size={25} />
            </button>
            <Box
              sx={{
                padding: "15px 30px",
                background: "#fff",
                position: "absolute",
                bottom: "0px",
                left: "0px",
                borderTopRightRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h7"
                fontFamily="Montserrat"
                fontWeight="600"
                fontSize="1.875rem"
              >
                {menuTitle}
              </Typography>
            </Box>
          </Box>

          {/* Fim da caixa da imagem */}

          {/* Corpo da página */}
          <Box
            sx={{
              width: "100%",
              background: "rgba(255,255,255,0.9)",
              padding: "35px 30px",
            }}
          >
            {/* Caixa das operadoras */}

            {!isEditing && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              >
                <Typography
                  variant="h7"
                  fontFamily="Montserrat"
                  fontWeight="500"
                  fontSize="1.25rem"
                >
                  Operadora
                </Typography>
                <Operadoras
                  setProvider={setProvider}
                  provider={provider}
                  setProviderLogo={setProviderLogo}
                  providerLogo={providerLogo}
                />
              </Box>
            )}

            {/* Fim da caixa das operadoras */}

            {/* Caixa das cidades */}
            {!isEditing && (
              <Stack
                sx={{
                  width: "100%",
                  height: "10%",
                  justifyContent: "space-evenly",
                  display: "flex",
                  marginBottom: "15px",
                }}
              >
                <Typography
                  variant="h7"
                  fontFamily="Montserrat"
                  fontWeight="500"
                  fontSize="1.25rem"
                >
                  Localidade
                </Typography>
                <Box sx={{ width: "100%", height: "40%" }}>
                  <States
                    onChange={setSelectedUf}
                    selectedCity={city}
                    setSelectedCity={setCity}
                    setSelectedStateName={setState}
                    stateLabel={""}
                    cityLabel={""}
                  />
                </Box>
              </Stack>
            )}
            {/* Fim da caixa das cidades */}

            {/* Caixa dos inputs */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <NewPlanInputs
                inputDays={inputDays}
                cost={cost}
                setInputDays={setInputDays}
                setCost={setCost}
                title={title}
                setTitle={setTitle}
                period={period}
                setPeriod={setPeriod}
                franchise={franchise}
                setFranchise={setFranchise}
              />
            </Box>
            {/* Fim da caixa dos inputs */}

            {/* Caixa dos apps ilimitados */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginBottom: "15px",
              }}
            >
              <Typography
                variant="h7"
                fontFamily="Montserrat"
                fontWeight="500"
                fontSize="1.25rem"
                color="#252525"
                marginBottom="5px"
              >
                Apps ilimitados
              </Typography>
              <UnlimitedApps
                unlimitedApp={unlimitedApp}
                setUnlimitedApp={setUnlimitedApp}
              />
            </Box>
            {/* Fim da caixa dos apps ilimitados */}

            {/* Caixa dos inputs finais */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginBottom: "25px",
              }}
            >
              <Typography
                variant="h7"
                fontFamily="Montserrat"
                fontWeight="500"
                fontSize="1.25rem"
                color="#252525"
                marginBottom="5px"
              >
                Ligações ilimitadas
              </Typography>
              <NewPlanFinalInputs
                setUnlimitedCall={setUnlimitedCall}
                setPlanType={setPlanType}
                planType={planType}
                setPriority={setPriority}
                priority={priority}
                setDescription={setDescription}
                description={description}
              />
            </Box>
            {/* Fim da caixa dos inputs finais */}

            {/* Caixa do botão de submit */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                type="submit"
                style={{
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  background: "#D40066",
                  color: "#fff",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  padding: "15px 50px",
                }}
                className="new-plan-save-btn"
              >
                {loading ? (
                  <img
                    src="/assets/images/loading-sending.svg"
                    alt="Loading"
                    style={{
                      width: "23px",
                      height: "100%",
                      transform: "scale(1.5) translateY(2px)",
                    }}
                  />
                ) : (
                  "Salvar"
                )}
              </button>
            </Box>
            {/* Fim da caixa do botão de submit */}
          </Box>
          {/* Fim do corpo da página */}
        </Stack>
      </form>
    </Box>
  );
}

export default AddNewPlan;
