import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useApi } from '../../hooks/useApi'

function ClientRegister({clientRegisterMenu, setClientRegisterMenu, planInfos}) {
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [motherName, setMotherName] = useState('');
  const [cel, setCel] = useState('');
  const [planId, setPlanId] = useState(planInfos?._id);
  const [validCpf, setIsValidCpf] = useState();
  const [error, setError] = useState(false)

  const api = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = isValidCpf(cpf)
    setIsValidCpf(valid)
    if(!valid) {
      setError(!error);
      return
    }
    const response = await api.registerLead(name, cpf, dateOfBirth, motherName, cel, planId);
    console.log(response)
  }

  const isValidCpf = (cpf) => {
    cpf.replace(/[^\d]+/g,'');
    if(cpf === '') return false
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999")
        return false;
      // Valida 1º digito
        let add = 0;
        for (let i=0; i < 9; i ++)
          add += parseInt(cpf.charAt(i)) * (10 - i);
          let rev = 11 - (add % 11);
          if (rev == 10 || rev == 11)
            rev = 0;
          if (rev != parseInt(cpf.charAt(9)))
            return false;
      // Valida 2º digito
        add = 0;
        for (let i = 0; i < 10; i ++)
          add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
          rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
          return false;
        return true;

  }

  return (
    <Box sx={{width: '800px', height: '650px', background: '#fff', position: 'absolute', borderRadius: '10px'}}>
      <Box sx={{width: '100%', height: '20%',
        backgroundImage: 'url(./assets/images/registerClient-header.png)', backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat', position: 'relative'}}>
        <button style={{width: '35px', height: '35px', background: '#fff', border: 'none',
          borderRadius: '8px', fontSize: '16px', position: 'absolute', top: '8%', right: '2%', cursor: 'pointer'}}
          onClick={() => setClientRegisterMenu(!clientRegisterMenu)}
          >X</button>
        <Box sx={{width: '200px', height: '60px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'absolute', bottom: '0px', borderTopRightRadius: '8px'}}>
          <Typography variant="h7" fontWeight="bold">
            Confirme seus dados
          </Typography>
        </Box>
      </Box>
      <Stack sx={{width: '100%', height: '80%', flexDirection: 'row', paddingTop: '1%'}}>
        <form style={{width: '55%', height: '100%', padding: '1.2%', display: 'flex', flexDirection: 'column', gap: '3%'}}
          onSubmit={handleSubmit}
        >
          <Stack gap="4px">
            <Typography variant="h7" fontWeight="medium">
              Nome Completo
            </Typography>
            <input type="text" style={{width: '100%', height: '50px', borderRadius: '8px',
              paddingLeft: '2%', fontSize: '16px', border: '2px solid lightGray'}} onChange={(e) => setName(e.target.value)}
              required
              autoComplete="off"
            />
          </Stack>
          <Box sx={{display: 'flex'}}>
            <Stack gap="4px" sx={{width: '50%'}}>
              <Typography variant="h7" fontWeight="medium">
                {!error ? 'CPF' : 'CPF Inválido'}
              </Typography>
              <input type="text" style={{width: '95%', height: '50px', borderRadius: '8px',
                paddingLeft: '4%', fontSize: '16px', border: !error ? '2px solid lightGray' : '2px solid red'}}
                onChange={(e) => setCpf(e.target.value)}
                value={cpf}
                required
                />
            </Stack>
            <Stack gap="4px" sx={{width: '50%'}}>
              <Typography variant="h7" fontWeight="medium">
                Data de nascimento
              </Typography>
              <input type="text" style={{width: '100%', height: '50px', borderRadius: '8px',
                paddingLeft: '4%', fontSize: '16px', border: '2px solid lightGray'}} onChange={(e) => setDateOfBirth(e.target.value)} />
            </Stack>
          </Box>
          <Stack gap="4px">
            <Typography variant="h7" fontWeight="medium">
              Nome completo da mãe
            </Typography>
            <input type="text" style={{width: '100%', height: '50px', borderRadius: '8px',
              paddingLeft: '2%', fontSize: '16px', border: '2px solid lightGray'}} onChange={(e) => setMotherName(e.target.value)}/>
          </Stack>
          <Stack gap="4px">
            <Typography variant="h7" fontWeight="medium">
              Celular
            </Typography>
            <input type="text" style={{width: '100%', height: '50px', borderRadius: '8px',
              paddingLeft: '2%', fontSize: '16px', border: '2px solid lightGray'}} onChange={(e) => setCel(e.target.value)} />
          </Stack>
          <label style={{width: '100%', height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <input type="checkbox" name="Authorization" id="" style={{accentColor: '#D40066'}} required />
            <Typography variant="h7" width="90%">Autorizo a comunicação referente ao meu pedido e confirmação dos dados para contratação do plano.</Typography>
          </label>
          <button style={{width: '100%', height: '50px', background: '#D40066', color: '#fff', fontSize: '16px',
            fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer'}}
            type="submit"
          >FAZER PEDIDO</button>
        </form>
        <Stack sx={{width: '43.5%', height: '45%', background: '#EFEFEF', borderRadius: '8px', marginTop: '1%', padding: '2%', justifyContent: 'space-evenly'}}>
          <Typography variant="h7" fontWeight="bold">Resumo do Pedido</Typography>
          <Box sx={{width: '100%', height: '50%', borderBottom: '2px solid lightGray'}}>
            <Box sx={{width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Box sx={{width: '30%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src="./assets/icons/discman.png" alt="Provedor image" />
              </Box>
              <Stack sx={{width: '40%', height: '100%', justifyContent: 'center' }}>
                <Typography>
                  {planInfos.title}
                </Typography>
                <Typography>
                  {planInfos.franchise}GB
                </Typography>
              </Stack>
              <Box sx={{width: '30%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                R$ {planInfos.cost.toFixed(2)}
              </Box>
            </Box>
          </Box>
          <Box sx={{width: '100%', height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography>Total</Typography>
            <Typography>R$ {planInfos.cost.toFixed(2)} /{planInfos.period}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ClientRegister
