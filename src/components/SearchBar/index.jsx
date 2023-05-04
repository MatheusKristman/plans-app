import { OutlinedInput, InputAdornment, Box, FormControl } from "@mui/material";
import { useContext } from "react";
import { PlansContext } from "../../contexts/Plans/PlansContext";
import { GrSearch } from "react-icons/gr";

function SearchBar() {
  const { setSearch } = useContext(PlansContext);

  return (
    <>
      <FormControl variant="outlined" sx={{ width: "50%" }}>
        <OutlinedInput
          id="input-with-icon-adornment"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar"
          sx={{ borderRadius: "30px", fontFamily: "Montserrat" }}
          startAdornment={
            <InputAdornment
              position="start"
              sx={{ cursor: "pointer", marginRight: "15px" }}
            >
              <GrSearch size={24} color={"#d40066"} />
            </InputAdornment>
          }
        />
      </FormControl>
      <Box
        sx={{
          borderColor: "#000",
          color: "#000",
          border: "2px solid",
          padding: "10px 15px",
          borderRadius: "10px",
          fontFamily: "Montserrat",
          fontWeight: "600",
        }}
      >
        Admin
      </Box>
    </>
  );
}

export default SearchBar;
