import { operadoras } from "../../utils/Menus/menuItems."
import { Box } from "@mui/material";

function Operadoras({setProvider, provider, setProviderLogo, providerLogo}) {

  const getUrlExtension = (url) => {
    return url
      .split(/[#?]/)[0]
      .split(".")
      .pop()
      .trim();
  }

const onImageEdit = async (imgUrl, operadora) => {
  let imgExt = getUrlExtension(imgUrl);

  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const file = new File([blob], `${operadora?.name}` + imgExt, {
    type: blob.type,
  });

  return file
}

  // (e) => setProviderLogo(e.target.files[0])

  const handleSets = (operadora) => {
    setProvider(operadora.name)
    setProviderLogo(onImageEdit(operadora.image))
  }

  const handleUploadedImage = (e) => {
    setProvider(e.target.files[0].name)
    setProviderLogo(e.target.files[0])
  }

  return (
    <Box sx={{width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
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
      <label htmlFor="arquivo" style={{width: '80px', height: '70px', display: 'flex',
          alignItems: 'center', justifyContent: 'center', background: '#ECECEC', borderRadius: '10px', cursor: 'pointer',
          fontSize: '30px'}}>
        +
        <input type="file" name="arquivo" style={{display: 'none'}} id="arquivo" onChange={(e) => handleUploadedImage(e)} />
        {/* <img src={imageBase64} alt="image Base 64"/> */}
      </label>
    </Box>
  )
}

export default Operadoras
