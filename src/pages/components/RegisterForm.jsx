import React, { useState, useEffect } from "react";
import { addDays, format, startOfMonth, startOfYear, subDays } from "date-fns";
import { shallow } from "zustand/shallow";
import { cpf } from "cpf-cnpj-validator";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactDatePicker from "react-datepicker";
import useRegisterStore from "../../stores/useRegisterStore";
import useGeneralStore from "../../stores/useGeneralStore";
import axios from "axios";
import api from "../../services/api";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const personalDataSchema = yup.object({
  name: yup
    .string()
    .required("O campo Nome Completo é obrigatório")
    .test("has-full-name", "O campo Nome Completo deve conter um nome e um sobrenome", (value) => {
      if (!value) {
        return;
      }

      const names = value.trim().split(" ");
      return names.length >= 2;
    }),
  cpf: yup.string().min(14, "CPF incorreto").required("O campo CPF é obrigatório"),
  rg: yup.string(),
  dateOfBirth: yup
    .string()
    .min(10, "Data de Nascimento incorreta")
    .required("O campo Data de Nascimento é obrigatório"),
  motherName: yup
    .string()
    .required("O campo Nome Completo da Mãe é obrigatório")
    .test(
      "has-full-mother-name",
      "O campo Nome Completo da Mãe deve conter um nome e um sobrenome",
      (value) => {
        if (!value) {
          return;
        }

        const names = value.trim().split(" ");
        return names.length >= 2;
      },
    ),
  tel1: yup.string().min(14, "Telefone incorreto").required("O campo Telefone 1 é obrigatório"),
  tel2: yup.string(),
});

const addressSchema = yup.object({
  state: yup.string().required("O campo Estado é obrigatório"),
  city: yup.string().required("O campo Cidade é obrigatório"),
  cep: yup.string().min(9, "CEP invalido").required("O campo CEP é obrigatório"),
  address: yup.string().required("O campo Endereço é obrigatório"),
  addressNumber: yup.string().required("O campo Número da Residência é obrigatório"),
  complement: yup.string(),
});

const paymentSchema = yup.object({
  paymentDate: yup.string().required("O campo Dia de pagamento é obrigatório"),
  bank: yup.string().min(3, "Banco invalido"),
  agency: yup.string().min(5, "Agencia invalida"),
  bankAccount: yup.string().min(13, "Conta invalida"),
  accountOwner: yup
    .string()
    .optional()
    .test(
      "has-full-name-account-owner",
      "O campo Titular da conta deve conter um nome e um sobrenome",
      (value) => {
        if (!value) {
          return true;
        }

        const names = value.trim().split(" ");
        return names.length >= 2;
      },
    ),
});

const PersonalDataForm = () => {
  const {
    stepsAnimation,
    activateStepsAnimation,
    deactivateStepsAnimation,
    clientData,
    setClientData,
    updateStep,
  } = useRegisterStore(
    (state) => ({
      stepsAnimation: state.stepsAnimation,
      activateStepsAnimation: state.activateStepsAnimation,
      deactivateStepsAnimation: state.deactivateStepsAnimation,
      clientData: state.clientData,
      setClientData: state.setClientData,
      updateStep: state.updateStep,
    }),
    shallow,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalDataSchema),
  });

  const onSubmit = (data) => {
    deactivateStepsAnimation();

    setTimeout(() => {
      updateStep("step2");
    }, 500);
  };

  useEffect(() => {
    activateStepsAnimation();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="personal-data-form">
      <div
        className={
          stepsAnimation
            ? "personal-data-box animate__animated animate__fadeInRight animate__faster"
            : "personal-data-box animate__animated animate__fadeOutLeft animate__faster"
        }>
        <div className="personal-data-name-wrapper">
          <label htmlFor="name" className="personal-data-label">
            Nome Completo
            <input
              {...register("name")}
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              value={clientData.name}
              onChange={(e) => setClientData("name", e.target.value)}
              style={errors.name ? { borderColor: "#ef5959" } : {}}
              className="personal-data-input"
            />
            {errors.name && (
              <span className="register-form-error-message">{errors.name?.message}</span>
            )}
          </label>

          <label htmlFor="cpf" className="personal-data-label">
            CPF
            <input
              {...register("cpf")}
              id="cpf"
              name="cpf"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              value={clientData.cpf}
              onChange={(e) => {
                const formattedCPF = cpf.format(e.target.value);
                setClientData("cpf", formattedCPF);
              }}
              maxLength={14}
              style={errors.cpf ? { borderColor: "#ef5959" } : {}}
              className="personal-data-input"
            />
            {errors.cpf && (
              <span className="register-form-error-message">{errors.cpf?.message}</span>
            )}
          </label>
        </div>

        <div className="personal-data-wrapper">
          <label htmlFor="rg" className="personal-data-label">
            RG
            <input
              {...register("rg")}
              id="rg"
              name="rg"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              value={clientData.rg}
              onChange={(e) => {
                const formattedRG = e.target.value.replace(/[^0-9.-]/g, "");
                setClientData("rg", formattedRG);
              }}
              style={errors.rg ? { borderColor: "#ef5959" } : {}}
              className="personal-data-input"
            />
            {errors.rg && <span className="register-form-error-message">{errors.rg?.message}</span>}
          </label>

          <label htmlFor="dateOfBirth" className="personal-data-label">
            Data de Nascimento
            <input
              {...register("dateOfBirth")}
              id="dateOfBirth"
              name="dateOfBirth"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              value={clientData.dateOfBirth}
              onChange={(e) => {
                let date = e.target.value;
                date = date.replace(/\D/g, "");
                date = date.replace(/(\d{2})(\d)/, "$1/$2");
                date = date.replace(/(\d{2})(\d)/, "$1/$2");

                setClientData("dateOfBirth", date);
              }}
              maxLength={10}
              style={errors.dateOfBirth ? { borderColor: "#ef5959" } : {}}
              className="personal-data-input"
            />
            {errors.dateOfBirth && (
              <span className="register-form-error-message">{errors.dateOfBirth?.message}</span>
            )}
          </label>
        </div>

        <label htmlFor="motherName" className="personal-data-label">
          Nome Completo da Mãe
          <input
            {...register("motherName")}
            id="motherName"
            name="motherName"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            value={clientData.motherName}
            onChange={(e) => setClientData("motherName", e.target.value)}
            style={errors.motherName ? { borderColor: "#ef5959" } : {}}
            className="personal-data-input"
          />
          {errors.motherName && (
            <span className="register-form-error-message">{errors.motherName?.message}</span>
          )}
        </label>

        <div className="personal-data-wrapper">
          <label htmlFor="tel1" className="personal-data-label">
            Telefone 1
            <input
              {...register("tel1")}
              id="tel1"
              name="tel1"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              value={clientData.tel1}
              onChange={(e) => {
                const tel = e.target.value
                  .replace(/\D/g, "")
                  .replace(/(\d{2})(\d)/, "($1) $2")
                  .replace(/(\d{5})(\d)/, "$1-$2")
                  .replace(/(-\d{4})\d+?$/, "$1");

                setClientData("tel1", tel);
              }}
              style={errors.tel1 ? { borderColor: "#ef5959" } : {}}
              className="personal-data-input"
            />
            {errors.tel1 && (
              <span className="register-form-error-message">{errors.tel1?.message}</span>
            )}
          </label>

          <label htmlFor="tel2" className="personal-data-label">
            Telefone 2
            <input
              {...register("tel2")}
              id="tel2"
              name="tel2"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              value={clientData.tel2}
              onChange={(e) => {
                const tel = e.target.value
                  .replace(/\D/g, "")
                  .replace(/(\d{2})(\d)/, "($1) $2")
                  .replace(/(\d{5})(\d)/, "$1-$2")
                  .replace(/(-\d{4})\d+?$/, "$1");

                setClientData("tel2", tel);
              }}
              style={errors.tel2 ? { borderColor: "#ef5959" } : {}}
              className="personal-data-input"
            />
            {errors.tel2 && (
              <span className="register-form-error-message">{errors.tel2?.message}</span>
            )}
          </label>
        </div>
      </div>

      <button type="submit" className="register-form-button">
        Proximo
      </button>
    </form>
  );
};

const AddressForm = () => {
  const {
    stepsAnimation,
    activateStepsAnimation,
    deactivateStepsAnimation,
    stateOptions,
    clientData,
    setClientData,
    cityOptions,
    setCityOptions,
    updateStep,
    cepError,
    setCepError,
  } = useRegisterStore(
    (state) => ({
      stepsAnimation: state.stepsAnimation,
      activateStepsAnimation: state.activateStepsAnimation,
      deactivateStepsAnimation: state.deactivateStepsAnimation,
      stateOptions: state.stateOptions,
      clientData: state.clientData,
      setClientData: state.setClientData,
      cityOptions: state.cityOptions,
      setCityOptions: state.setCityOptions,
      updateStep: state.updateStep,
      cepError: state.cepError,
      setCepError: state.setCepError,
    }),
    shallow,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  const onSubmit = (data) => {
    deactivateStepsAnimation();

    setTimeout(() => {
      updateStep("step3");
    }, 500);
  };

  useEffect(() => {
    activateStepsAnimation();
  }, []);

  useEffect(() => {
    if (stateOptions.some((state) => state.nome === clientData.state)) {
      const id = stateOptions.filter((state) => state.nome === clientData.state)[0].id;

      axios
        .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
        .then((res) => {
          setCityOptions(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [stateOptions, clientData]);

  useEffect(() => {
    if (clientData.cep.length === 9) {
      axios
        .get(`https://viacep.com.br/ws/${clientData.cep.replace("-", "")}/json/`)
        .then((res) => {
          console.log(res.data);
          setClientData("address", res.data.logradouro);
          setValue("address", res.data.logradouro);

          if (res.data?.erro) {
            setCepError("Cep invalido!");
          } else {
            setCepError("");
          }
        })
        .catch((error) => {
          console.error(error);
          setCepError("Cep invalido!");
        });
    }
  }, [clientData.cep]);

  useEffect(() => {
    console.log(cepError);
  }, [cepError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="address-form">
      <div
        className={
          stepsAnimation
            ? "address-box animate__animated animate__fadeInRight animate__faster"
            : "address-box animate__animated animate__fadeOutLeft animate__faster"
        }>
        <div className="address-wrapper">
          <label htmlFor="state" className="address-label">
            Estado
            <select
              {...register("state")}
              id="state"
              onChange={(e) => setClientData("state", e.target.value)}
              name="state"
              defaultValue={clientData.state || stateOptions[0].nome}
              style={errors.state ? { borderColor: "#ef5959" } : {}}
              className="address-select">
              {stateOptions.map((state) => (
                <option key={state.id} value={state.nome}>
                  {state.nome}
                </option>
              ))}
            </select>
            {errors.state && (
              <span className="register-form-error-message">{errors.state?.message}</span>
            )}
          </label>

          <label htmlFor="city" className="address-label">
            Cidade
            <select
              {...register("city")}
              id="city"
              name="city"
              onChange={(e) => setClientData("city", e.target.value)}
              defaultValue={clientData.city || cityOptions[0].nome}
              style={errors.city ? { borderColor: "#ef5959" } : {}}
              className="address-select">
              {cityOptions.map((city) => (
                <option key={city.id} value={city.nome}>
                  {city.nome}
                </option>
              ))}
            </select>
            {errors.city && (
              <span className="register-form-error-message">{errors.city?.message}</span>
            )}
          </label>
        </div>

        <div className="address-cep-wrapper">
          <label htmlFor="cep" className="address-label">
            CEP
            <input
              {...register("cep")}
              id="cep"
              name="cep"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              value={clientData.cep}
              onChange={(e) => {
                const cep = e.target.value
                  .replace(/\D/g, "")
                  .replace(/(\d{5})(\d)/, "$1-$2")
                  .replace(/(-\d{3})\d+?$/, "$1");

                setClientData("cep", cep);
              }}
              style={errors.cep || cepError ? { borderColor: "#ef5959" } : {}}
              className="address-input"
            />
            {errors.cep && (
              <span className="register-form-error-message">{errors.cep?.message}</span>
            )}
            {cepError && <span className="register-form-error-message">{cepError}</span>}
          </label>

          <label htmlFor="address" className="address-label">
            Endereço
            <input
              {...register("address")}
              id="address"
              name="address"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              value={clientData.address}
              onChange={(e) => setClientData("address", e.target.value)}
              style={errors.address ? { borderColor: "#ef5959" } : {}}
              className="address-input"
            />
            {errors.address && (
              <span className="register-form-error-message">{errors.address?.message}</span>
            )}
          </label>
        </div>

        <div className="address-num-wrapper">
          <label htmlFor="addressNum" className="address-label">
            Número da Residência
            {errors.addressNumber && (
              <span className="register-form-error-message">{errors.addressNumber?.message}</span>
            )}
            <input
              {...register("addressNumber")}
              id="addressNumber"
              name="addressNumber"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              value={clientData.addressNumber}
              onChange={(e) => {
                const formattedValue = e.target.value.replace(/\D/g, "");

                setClientData("addressNumber", formattedValue);
              }}
              style={errors.addressNumber ? { borderColor: "#ef5959" } : {}}
              className="address-input"
            />
          </label>

          <label htmlFor="complement" className="address-label">
            Complemento
            <input
              {...register("complement")}
              id="complement"
              name="complement"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              value={clientData.complement}
              onChange={(e) => setClientData("complement", e.target.value)}
              style={errors.complement ? { borderColor: "#ef5959" } : {}}
              className="address-input"
            />
            {errors.complement && (
              <span className="register-form-error-message">{errors.complement?.message}</span>
            )}
          </label>
        </div>
      </div>

      <button type="submit" className="register-form-button">
        Proximo
      </button>
    </form>
  );
};

const PaymentForm = () => {
  const {
    stepsAnimation,
    activateStepsAnimation,
    deactivateStepsAnimation,
    clientData,
    setClientData,
    updateStep,
    planSelected,
    setSubmit,
    setMessage,
  } = useRegisterStore(
    (state) => ({
      stepsAnimation: state.stepsAnimation,
      activateStepsAnimation: state.activateStepsAnimation,
      deactivateStepsAnimation: state.deactivateStepsAnimation,
      clientData: state.clientData,
      setClientData: state.setClientData,
      updateStep: state.updateStep,
      planSelected: state.planSelected,
      setSubmit: state.setSubmit,
      setMessage: state.setMessage,
    }),
    shallow,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentSchema),
  });

  const onSubmit = (data) => {
    deactivateStepsAnimation();

    if (planSelected.type === "internet" || planSelected.type === "tv") {
      setTimeout(() => {
        updateStep("step4");
      }, 500);
    } else {
      setClientData("planId", planSelected.id);
      setSubmit();
      setMessage(
        encodeURIComponent(
          `Olá, gostaria de saber mais sobre o plano, segue os dados: Nome: ${
            clientData.name
          }; RG: ${clientData.rg}; CPF: ${clientData.cpf}; Data de Nascimento: ${
            clientData.dateOfBirth
          }; Nome Completo da Mãe: ${clientData.motherName}; Telefone1: ${
            clientData.tel1
          }; Telefone2: ${clientData.tel2}; Estado: ${clientData.state}; Cidade: ${
            clientData.city
          }; CEP: ${clientData.cep}; Endereço: ${clientData.address}; Número da Residência: ${
            clientData.addressNumber
          }; Complemento: ${clientData.complement}; Dia do pagamento: ${
            clientData.paymentDate
          }; Forma de pagamento: ${clientData.paymentMethod}; Banco: ${clientData.bank}; Agência: ${
            clientData.agency
          }; Conta: ${clientData.bankAccount}; Titular da conta: ${
            clientData.accountOwner
          }; Plano: ${planSelected.title}; Fraquia: ${
            planSelected.franchise
          }; Valor: R$ ${planSelected.cost.toFixed(2).replace(".", ",")};`,
        ),
      );
    }
  };

  useEffect(() => {
    activateStepsAnimation();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="payment-form">
      <div
        className={
          stepsAnimation
            ? "payment-box animate__animated animate__fadeInRight animate__faster"
            : "payment-box animate__animated animate__fadeOutLeft animate__faster"
        }>
        <div className="payment-wrapper">
          <label htmlFor="paymentDate" className="payment-label">
            Dia de pagamento
            <select
              {...register("paymentDate")}
              id="paymentDate"
              name="paymentDate"
              onChange={(e) => setClientData("paymentDate", e.target.value)}
              defaultValue={clientData.paymentDate}
              style={errors.paymentDate ? { borderColor: "#ef5959" } : {}}
              className="payment-select">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
            {errors.paymentDate && (
              <span className="register-form-error-message">{errors.paymentDate?.message}</span>
            )}
          </label>

          <div className="payment-method-box">
            <span className="payment-method-title">Forma de pagamento</span>

            <div className="payment-method-wrapper">
              <label htmlFor="ticket" className="payment-method-label">
                <input
                  type="radio"
                  id="ticket"
                  name="paymentMethod"
                  value="Boleto"
                  defaultChecked={
                    clientData.paymentMethod === "Boleto" || clientData.paymentMethod === ""
                  }
                  onChange={(e) => setClientData("paymentMethod", e.target.value)}
                  className="payment-method-input"
                />
                Boleto
              </label>

              <label htmlFor="debit" className="payment-method-label">
                <input
                  type="radio"
                  id="debit"
                  name="paymentMethod"
                  defaultChecked={clientData.paymentMethod === "Débito em conta"}
                  value="Débito em conta"
                  onChange={(e) => setClientData("paymentMethod", e.target.value)}
                  className="payment-method-input"
                />
                Débito em conta
              </label>
            </div>
          </div>
        </div>

        <div className="payment-account-wrapper">
          <label htmlFor="bank" className="payment-label">
            Banco
            <input
              {...register("bank")}
              id="bank"
              name="bank"
              type="text"
              disabled={clientData.paymentMethod === "Boleto"}
              autoComplete="off"
              autoCorrect="off"
              value={clientData.bank}
              onChange={(e) => {
                const formattedValue = e.target.value.replace(/\D/g, "");

                setClientData("bank", formattedValue);
              }}
              maxLength={3}
              style={errors.bank ? { borderColor: "#ef5959" } : {}}
              className="payment-input"
            />
            {errors.bank && (
              <span className="register-form-error-message">{errors.bank?.message}</span>
            )}
          </label>

          <label htmlFor="agency" className="payment-label">
            Agencia
            <input
              {...register("agency")}
              id="agency"
              name="agency"
              type="text"
              disabled={clientData.paymentMethod === "Boleto"}
              autoComplete="off"
              autoCorrect="off"
              value={clientData.agency}
              onChange={(e) => {
                const formattedValue = e.target.value.replace(/\D/g, "");

                setClientData("agency", formattedValue);
              }}
              maxLength={5}
              style={errors.agency ? { borderColor: "#ef5959" } : {}}
              className="payment-input"
            />
            {errors.agency && (
              <span className="register-form-error-message">{errors.agency?.message}</span>
            )}
          </label>

          <label htmlFor="bankAccount" className="payment-label">
            Conta
            <input
              {...register("bankAccount")}
              id="bankAccount"
              name="bankAccount"
              type="text"
              disabled={clientData.paymentMethod === "Boleto"}
              autoComplete="off"
              autoCorrect="off"
              value={clientData.bankAccount}
              onChange={(e) => {
                const formattedValue = e.target.value.replace(/\D/g, "");

                setClientData("bankAccount", formattedValue);
              }}
              maxLength={13}
              style={errors.bankAccount ? { borderColor: "#ef5959" } : {}}
              className="payment-input"
            />
            {errors.bankAccount && (
              <span className="register-form-error-message">{errors.bankAccount?.message}</span>
            )}
          </label>
        </div>

        <label htmlFor="accountOwner" className="payment-label">
          Titular da conta
          <input
            {...register("accountOwner")}
            id="accountOwner"
            name="accountOwner"
            type="text"
            disabled={clientData.paymentMethod === "Boleto"}
            autoComplete="off"
            autoCorrect="off"
            value={clientData.accountOwner}
            onChange={(e) => setClientData("accountOwner", e.target.value)}
            style={errors.accountOwner ? { borderColor: "#ef5959" } : {}}
            className="payment-input"
          />
          {errors.accountOwner && (
            <span className="register-form-error-message">{errors.accountOwner?.message}</span>
          )}
        </label>
      </div>

      <button type="submit" className="register-form-button">
        {planSelected.type === "cel" ? "Fazer Pedido" : "Proximo"}
      </button>
    </form>
  );
};

const InstallationForm = () => {
  const {
    stepsAnimation,
    activateStepsAnimation,
    clientData,
    setClientData,
    firstDate,
    setFirstDate,
    secondDate,
    setSecondDate,
    planSelected,
    isSubmitting,
    setSubmit,
    unsetSubmit,
    message,
    setMessage,
  } = useRegisterStore(
    (state) => ({
      stepsAnimation: state.stepsAnimation,
      activateStepsAnimation: state.activateStepsAnimation,
      clientData: state.clientData,
      setClientData: state.setClientData,
      planSelected: state.planSelected,
      firstDate: state.firstDate,
      setFirstDate: state.setFirstDate,
      secondDate: state.secondDate,
      setSecondDate: state.setSecondDate,
      planSelected: state.planSelected,
      isSubmitting: state.isSubmitting,
      setSubmit: state.setSubmit,
      unsetSubmit: state.unsetSubmit,
      message: state.message,
      setMessage: state.setMessage,
    }),
    shallow,
  );

  const checkIfFirstDateItsAfterSecondDate = (date1, date2) => {
    const dateOne = new Date(date1);
    const dateTwo = new Date(date2);
    const dayInMilliseconds = 24 * 60 * 60 * 1000;
    const date2OneDayAfter = new Date(dateTwo.getTime() + dayInMilliseconds);

    dateOne.setHours(0, 0, 0, 0);
    date2OneDayAfter.setHours(0, 0, 0, 0);

    if (dateOne >= date2OneDayAfter) {
      const formattedDate = format(addDays(date1, 1), "dd/MM/yyyy");

      setSecondDate(addDays(date1, 1));
      setClientData("installationDate2", formattedDate);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      clientData.installationDate1 &&
      clientData.installationDate2 &&
      clientData.installationPeriod
    ) {
      setClientData("planId", planSelected.id);
      setSubmit();
      setMessage(
        encodeURIComponent(
          `Olá, gostaria de saber mais sobre o plano, segue os dados: Nome: ${
            clientData.name
          }; RG: ${clientData.rg}; CPF: ${clientData.cpf}; Data de Nascimento: ${
            clientData.dateOfBirth
          }; Nome Completo da Mãe: ${clientData.motherName}; Telefone1: ${
            clientData.tel1
          }; Telefone2: ${clientData.tel2}; Estado: ${clientData.state}; Cidade: ${
            clientData.city
          }; CEP: ${clientData.cep}; Endereço: ${clientData.address}; Número da Residência: ${
            clientData.addressNumber
          }; Complemento: ${clientData.complement}; Dia do pagamento: ${
            clientData.paymentDate
          }; Forma de pagamento: ${clientData.paymentMethod}; Banco: ${clientData.bank}; Agência: ${
            clientData.agency
          }; Conta: ${clientData.bankAccount}; Titular da conta: ${
            clientData.accountOwner
          }; Data da instalação 1: ${clientData.installationDate1}; Data da instalação 2: ${
            clientData.installationDate2
          }; Período: ${clientData.installationPeriod}; Plano: ${planSelected.title}; Fraquia: ${
            planSelected.franchise
          }; Valor: R$ ${planSelected.cost.toFixed(2).replace(".", ",")};`,
        ),
      );
    }
  };

  useEffect(() => {
    activateStepsAnimation();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="installation-form">
      <div
        className={
          stepsAnimation
            ? "installation-box animate__animated animate__fadeInRight animate__faster"
            : "installation-box animate__animated animate__fadeOutLeft animate__faster"
        }>
        <div className="installation-date-wrapper">
          <label htmlFor="installationDate1" className="installation-label">
            Data para instalação
            <ReactDatePicker
              id="installationDate1"
              name="installationDate1"
              className="installation-input"
              selected={firstDate}
              onChange={(date) => {
                setFirstDate(date);

                const formattedDate = format(date, "dd/MM/yyyy");

                setClientData("installationDate1", formattedDate);

                checkIfFirstDateItsAfterSecondDate(date, secondDate);
              }}
              minDate={addDays(new Date(), 1)}
              excludeDates={[secondDate]}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione a primeira data de instalação"
            />
          </label>

          <label htmlFor="installationDate2" className="installation-label">
            Data para instalação reserva <small>(caso a primeira visita não aconteça)</small>
            <ReactDatePicker
              id="installationDate2"
              name="installationDate2"
              className="installation-input"
              selected={secondDate}
              onChange={(date) => {
                setSecondDate(date);

                const formattedDate = format(date, "dd/MM/yyyy");

                setClientData("installationDate2", formattedDate);
              }}
              minDate={firstDate || addDays(new Date(), 1)}
              excludeDates={[firstDate]}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione uma segunda data de instalação caso a primeira visita não aconteça"
            />
          </label>
        </div>

        <div className="installation-period-wrapper">
          <label htmlFor="installationPeriod" className="installation-label">
            Selecione o período da visita
            <select
              id="installationPeriod"
              name="installationPeriod"
              className="installation-select"
              onChange={(e) => setClientData("installationPeriod", e.target.value)}
              defaultValue={clientData.installationPeriod || "Período manhã (8h às 12h)"}>
              <option value="Período manhã (8h às 12h)">Período manhã (8h às 12h)</option>
              <option value="Período tarde (12h às 18h)">Período tarde (12h às 18h)</option>
            </select>
          </label>
        </div>
      </div>

      <button type="submit" className="register-form-button">
        Fazer Pedido
      </button>
    </form>
  );
};

const RegisterForm = () => {
  const {
    closeRegisterForm,
    isRegisterFormOpen,
    planSelected,
    steps,
    setStateOptions,
    stateOptions,
    clientData,
    setCityOptions,
    isSubmitting,
    message,
    unsetSubmit,
  } = useRegisterStore(
    (state) => ({
      closeRegisterForm: state.closeRegisterForm,
      isRegisterFormOpen: state.isRegisterFormOpen,
      planSelected: state.planSelected,
      steps: state.steps,
      setStateOptions: state.setStateOptions,
      stateOptions: state.stateOptions,
      clientData: state.clientData,
      setCityOptions: state.setCityOptions,
      isSubmitting: state.isSubmitting,
      message: state.message,
      unsetSubmit: state.unsetSubmit,
    }),
    shallow,
  );
  const { modalAnimation, deactivateModalAnimation } = useGeneralStore(
    (state) => ({
      modalAnimation: state.modalAnimation,
      deactivateModalAnimation: state.deactivateModalAnimation,
    }),
    shallow,
  );

  const handleClose = () => {
    deactivateModalAnimation();

    setTimeout(() => {
      closeRegisterForm();
    }, 800);
  };

  useEffect(() => {
    let idForCityFetch = "";

    axios
      .get(import.meta.env.VITE_STATE_API)
      .then((res) => {
        setStateOptions(res.data);
        idForCityFetch = res.data[0].id;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        axios
          .get(`${import.meta.env.VITE_STATE_API}${idForCityFetch}/municipios`)
          .then((res) => setCityOptions(res.data))
          .catch((error) => console.error(error));
      });
  }, []);

  useEffect(() => {
    const submitData = () => {
      const data = { ...clientData, planType: planSelected.planType };

      api
        .post("/client-pf/register", data)
        .then((res) => {
          handleClose();

          window.location.assign(`${import.meta.env.VITE_WHATSAPP_BASE_API}${message}`);
        })
        .catch((error) => console.error(error))
        .finally(() => unsetSubmit());
    };

    if (isSubmitting && message) {
      submitData();
    }
  }, [isSubmitting]);

  return (
    <div
      className={
        modalAnimation
          ? "register-form-overlay animate__animated animate__fadeIn animate__fast"
          : "register-form-overlay animate__animated animate__fadeOut animate__fast"
      }>
      <div className="register-form-container">
        <div className="register-form-illustration-box">
          <button type="button" onClick={handleClose} className="register-form-close-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="register-form-title">Confirme seus dados</h2>
        </div>

        <div className="register-form-body">
          <div className="register-form-progress-box">
            <div className="register-form-progress-step">
              <span
                className={
                  steps.step1
                    ? "register-form-progress-ball actual-progress"
                    : "register-form-progress-ball"
                }>
                1
              </span>
              <span className="register-form-progress-desc">Dados pessoais</span>
            </div>

            <div className="register-form-progress-line" />

            <div className="register-form-progress-step">
              <span
                className={
                  steps.step2
                    ? "register-form-progress-ball actual-progress"
                    : "register-form-progress-ball"
                }>
                2
              </span>
              <span className="register-form-progress-desc">Endereço</span>
            </div>

            <div className="register-form-progress-line" />

            <div className="register-form-progress-step">
              <span
                className={
                  steps.step3
                    ? "register-form-progress-ball actual-progress"
                    : "register-form-progress-ball"
                }>
                3
              </span>
              <span className="register-form-progress-desc">Forma de pagamento</span>
            </div>

            {/* se tiver instalação */}
            {Object.hasOwn(steps, "step4") && (
              <>
                <div className="register-form-progress-line" />

                <div className="register-form-progress-step">
                  <span
                    className={
                      steps?.step4
                        ? "register-form-progress-ball actual-progress"
                        : "register-form-progress-ball"
                    }>
                    4
                  </span>
                  <span className="register-form-progress-desc">Instalação</span>
                </div>
              </>
            )}
          </div>

          <div className="register-form-info-box">
            {steps.step1 && <PersonalDataForm />}
            {steps.step2 && <AddressForm />}
            {steps.step3 && <PaymentForm />}
            {steps?.step4 && <InstallationForm />}
          </div>

          <div className="register-form-plan-wrapper">
            <div className="register-form-plan-box">
              <span className="register-form-plan-title">Resumo do pedido</span>

              <div className="register-form-plan-details-container">
                <div className="register-form-plan-details-box">
                  <div className="register-form-plan-provider-icon-box">
                    <img
                      src={`${import.meta.env.VITE_API_KEY}/assets/${planSelected.logo}`}
                      alt="claro"
                      className="register-form-plan-provider-icon"
                    />
                  </div>

                  <div className="register-form-plan-details-infos-box">
                    <span className="register-form-plan-details-infos-plan-title">
                      {planSelected.title.substring(0, 15)}
                    </span>
                    <span className="register-form-plan-details-infos-plan-detail">
                      {planSelected.franchise || planSelected.devicesQuant + " Aparelho(s)"}
                    </span>
                  </div>
                </div>

                <span className="register-form-plan-price">
                  Valor: R$ {planSelected.cost.toFixed(2).replace(".", ",")}/mês
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
