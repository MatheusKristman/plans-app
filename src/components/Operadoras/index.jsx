import { operadoras } from "../../utils/Menus/menuItems."
import { Box } from "@mui/material"

function Operadoras({setProvider, provider, setProviderLogo, isEditing}) {


  const getUrlExtension = (url) => {
    return url
      .split(/[#?]/)[0]
      .split(".")
      .pop()
      .trim();
  }

const onImageEdit = async (imgUrl) => {
  let imgExt = getUrlExtension(imgUrl);

  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const file = new File([blob], "profileImage." + imgExt, {
    type: blob.type,
  });

  return file
}

  const handleSets = (operadora) => {
    setProvider(operadora.name)
    setProviderLogo(onImageEdit(operadora.image))
  }

  return (
    <Box sx={{width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      {operadoras.map((operadora) => (
        <Box sx={{width: '80px', height: '70px', display: 'flex',
          alignItems: 'center', justifyContent: 'center', background: '#ECECEC', borderRadius: '10px', cursor: 'pointer',
          border: operadora.name === provider ? '2px solid #D40066' : ''
        }}
          key={operadora.id}
          onClick={() => handleSets(operadora)}
        >
          <img src={operadora.image} alt={operadora.alt} style={{width: '100%', height: '100%'}} />
        </Box>
      ))}
    </Box>
  )
}

export default Operadoras
