import { Box, Button, Stack,
  Typography, TextField, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { operadoras } from '../../utils/Menus/menuItems.';

function NewPlan({plansMenu, setPlansMenu, title}) {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const onSubmit = data => console.log(data)

  return (
    <Box
      sx={{
        width: '400px',
        height: '700px',
        overflowY: 'auto',
        position: 'absolute',
        zIndex: '99999',
        top: '5%',
        left: '40%',
        right: '60%',
      }}
    >
      <Box
      sx={{
        width: '100%',
        height: '1200px',
        background: 'rgba(255,255,255, 0.6)',
      }}
    >
      <Stack
        sx={{
          width: '100%',
          height: '14%',
          position: 'relative',
        }}
      >
        <img src="./assets/images/modal-figure.png" alt="" />
        <Button
          variant="outlined"
          onClick={() => setPlansMenu(!plansMenu)}
          sx={{
            fontWeight: '500',
            color: 'black',
            fontSize: '16px',
            borderRadius: '10px',
            position: 'absolute',
            right: '10px',
            top: '10px',
            borderColor: 'transparent',
            background: '#fff',
            '&:hover': {
              background: '#fff',
              boxShadow: 'inset 1px 1px 5px #000',
              border: '1px solid #000'
            }
          }}
        >
          X
        </Button>
        <Box
          sx={{
            width: '120px',
            height: '50px',
            background: '#fff',
            bottom: '0px',
            position: 'absolute',
            borderTopRightRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant='h6'
          >
             {title}
          </Typography>
        </Box>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)} className='plans-form'>
        <Stack
          sx={{
            width: '100%',
            height: '10%',
            padding: '2.2%',
            gap: '5%'
          }}
        >
          <Typography
            variant='h7'
            fontWeight='bold'
          >
            Operadora
          </Typography>
          <Stack
            sx={{
              width: '100%',
              height: '80%',
              flexDirection: 'row',
              gap: '5%',
            }}
          >
            {
              operadoras.map((operadora) => (
                <Box
                  sx={{
                    background: '#ECECEC',
                    width: '80px',
                    height: '80px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={operadora.id}
                >
                  <img src={operadora.image} alt={operadora.alt} />
                </Box>
              ))
            }
          </Stack>
        </Stack>
        <Stack
          sx={{
            width: '100%',
            height: '35%',
            gap: '3%',
            padding: '2.2%'
          }}
        >
          <TextField
            label="Titulo"
            {...register("titulo", {required: true})}
            aria-invalid={errors.titulo ? 'true' : 'false'}
            variant="outlined"
            required
            helperText={errors.titulo?.type === 'required' && 'Este campo é requerido'}
            error={errors.titulo?.type === 'required' && 'true'}
            sx={{
              border: '1.5px',
              outline: 'none'
            }}
          />
          <TextField
            label="Valor"
            {...register("valor", {required: true})}
            aria-invalid={errors.valor ? 'true' : 'false'}
            variant="outlined"
            required
            helperText={errors.valor?.type === 'required' && 'Este campo é requerido'}
            error={errors.valor?.type === 'required' && 'true'}
            sx={{
              border: '1.5px',
              outline: 'none'
            }}
          />
          <Stack
            direction="row"
            gap="5px"
            sx={{
              width: '100%',
              height: '10%',
              justifyContent: 'start',
              alignItems: 'center'
            }}
          >
            <FormLabel id='row-area-label' sx={{marginRight: '20px'}}>Duração: </FormLabel>
            <RadioGroup
              row
              aria-labelledby='row-area-label'
              name='row-radio-buttons-group'
            >
              <FormControlLabel value='7 dias' control={<Radio />} label={"7 dias"} />
              <FormControlLabel value="mes" control={<Radio />} label="mes" />
            </RadioGroup>
          </Stack>
          <button type='submit'>Salvar</button>
        </Stack>
      </form>
    </Box>
    </Box>
  )
}

export default NewPlan
