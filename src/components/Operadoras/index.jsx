import { operadoras } from "../../utils/Menus/menuItems."
import { Box } from "@mui/material"

function Operadoras({setProvider, provider}) {
  return (
    <Box sx={{width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      {operadoras.map((operadora) => (
        <Box sx={{width: '80px', height: '70px', display: 'flex',
          alignItems: 'center', justifyContent: 'center', background: '#ECECEC', borderRadius: '10px', cursor: 'pointer',
          border: operadora.name === provider ? '2px solid #D40066' : ''
        }}
          key={operadora.id}
          onClick={() => setProvider(operadora.name)}
        >
          <img src={operadora.image} alt={operadora.alt} />
        </Box>
      ))}
    </Box>
  )
}

export default Operadoras
