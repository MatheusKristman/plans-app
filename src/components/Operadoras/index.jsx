import { operadoras } from '../../utils/Menus/menuItems';
import { Box } from '@mui/material';
import { HiPlus } from 'react-icons/hi';
import { useEffect, useState } from 'react';

function Operadoras({ setProvider, provider, setProviderLogo, providerLogo }) {
  const [providerLogoUrl, setProviderLogoUrl] = useState('');

  const getUrlExtension = (url) => {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  };

  const onImageEdit = async (imgUrl, operadora) => {
    let imgExt = getUrlExtension(imgUrl);

    console.log(imgExt);

    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], `${operadora?.name.toLowerCase()}.` + imgExt, {
      type: blob.type,
    });

    return file;
  };

  const handleSets = (operadora) => {
    setProvider(operadora.name);
    setProviderLogo(onImageEdit(operadora.image, operadora));
  };

  const handleUploadedImage = async (e) => {
    const file = await e.target.files[0];

    setProvider('');
    setProviderLogo(file);

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        setProviderLogoUrl(reader.result);
      };

      console.log(reader);
    }
  };

  const resetUploadedImage = () => {
    setProviderLogoUrl('');
    setProviderLogo([]);
    setProvider('');
  };

  useEffect(() => {
    console.log(provider);
  }, [providerLogo]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
      }}
    >
      {operadoras.map((operadora) => (
        <Box
          sx={{
            width: '70px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ECECEC',
            borderRadius: '10px',
            cursor: 'pointer',
            border: operadora.name === provider ? '2px solid #D40066' : '',
          }}
          key={operadora.id}
          onClick={() => handleSets(operadora)}
        >
          <img src={operadora.image} alt={operadora.alt} style={{ width: '80%', height: 'auto' }} />
        </Box>
      ))}
      <label
        htmlFor='arquivo'
        style={{
          width: '70px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ECECEC',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '30px',
          overflow: 'hidden',
          border:
            provider !== 'Claro' && provider !== 'Vivo' && provider !== 'Tim' && provider !== 'Oi'
              ? '2px solid #D40066'
              : '',
        }}
        onClick={() => {
          if (providerLogoUrl !== '') {
            resetUploadedImage();
          }
        }}
      >
        {provider === 'Claro' || provider === 'Vivo' || provider === 'Tim' || provider === 'Oi' || (
          <HiPlus color={'#252525'} />
        )}
        {providerLogoUrl === '' && (
          <input
            type='file'
            name='arquivo'
            style={{ display: 'none' }}
            id='arquivo'
            onChange={handleUploadedImage}
          />
        )}

        {providerLogoUrl && (
          <img
            src={providerLogoUrl}
            alt='image Base 64'
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        )}
      </label>
    </Box>
  );
}

export default Operadoras;
