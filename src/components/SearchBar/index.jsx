import {OutlinedInput, InputAdornment, Button, FormControl} from '@mui/material'

function SearchBar() {
  return (
    <>
      <FormControl variant="outlined" sx={{width: '50%'}}>
        <OutlinedInput
          id="input-with-icon-adornment"
          placeholder="Pesquisar"
          sx={{
            borderRadius: '20px'
          }}
          startAdornment={
            <InputAdornment position="start"
              sx={{
                cursor: 'pointer',
                marginRight: '15px',
                }}
              >
              <img src="./assets/icons/lupa.png" alt="lupa" />
            </InputAdornment>
          }
        />
        </FormControl>
      <Button variant="outlined" sx={{borderColor: '#000', color: '#000', border: '2px solid'}}>
        Admin
      </Button>
    </>
  )
}

export default SearchBar
