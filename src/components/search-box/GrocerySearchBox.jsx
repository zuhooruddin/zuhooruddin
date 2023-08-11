import { Box, MenuItem, Pagination, TextField } from "@mui/material";
import BazaarButton from "components/BazaarButton";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SearchOutlinedIcon, SearchResultCard } from "./SearchBox";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
const GrocerySearchBox = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const router = useRouter();

  const server_ip = process.env.NEXT_PUBLIC_BACKEND_API_BASE;

  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false); // Add messageError state variable
  const [resultList, setResultList] = useState([]);
  const parentRef = useRef();

  const handleSearch = useCallback(() => {
    console.log("search words",message)
    setMessage(message.replaceAll("/"," "))
    console.log("search words after",message)
    router.push("/search/" + message);
  }, [router, message]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setMessage(value);
    setMessageError(value.trim() === ''); // Set messageError to true if value is empty or only whitespace
  };

  const handlebutton = (value) => {
    if (message.trim() !== '') { // Only handle search if message is not empty or only whitespace
      handleSearch();
    }
  };

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{
        ref: parentRef,
      }}
    >
      <TextField
        fullWidth
        name="name"
        variant="outlined"
        placeholder="Searching for..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        required // Add the required prop here
        error={messageError} // Add the error prop here
        helperText={messageError ? 'This field is required' : ''} // Add the helperText prop here
        InputProps={{
          sx: {
            height: 44,
            paddingRight: 0,
            borderRadius: 300,
            color: "grey.700",
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
          endAdornment: (
            <BazaarButton
              onClick={handlebutton}
              color="primary"
              disableElevation
              variant="contained"
              sx={{
                px: "3rem",
                height: "100%",
                borderRadius: "0 300px 300px 0",
              }}
            >
              Search
            </BazaarButton>
          ),
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {typeof resultList !== "undefined" && !!resultList.length && (
        <SearchResultCard elevation={2}>
          {resultList.map((item) => (
            <Link href={`/product/search/${item.name}`} key={item} passHref>
              <MenuItem key={item.name}>{item.name}</MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )}
    </Box>
  );
};

export default GrocerySearchBox;
