import { Box, styled } from "@mui/material";
import navigations from "data/navigations";
import CategoryMenuItem from "./CategoryMenuItem";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2"; // styled component
import Dress from "components/icons/Dress";
import api from "utils/api/market-2";
import {server_ip} from "utils/backend_server_ip.jsx"
import useSWR from 'swr';
import axios from 'axios';

const Wrapper = styled(Box)(({ theme, position, open }) => ({
  left: 0,
  zIndex: 98,
  right: "auto",
  borderRadius: 4,
  padding: "0.5rem 0px",
  transformOrigin: "top",
  boxShadow: theme.shadows[2],
  position: position || "unset",
  transition: "all 250ms ease-in-out",
  transform: open ? "scaleY(1)" : "scaleY(0)",
  backgroundColor: theme.palette.background.paper,
  top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
}));

// Styles for the menu items
const StyledCategoryMenuItem = styled(CategoryMenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    textDecoration: 'none',
  },
  '&:not(:last-child)': {
    marginBottom: theme.spacing(1),
  },
}));

const CategoryMenuCard = (props) => {
  const { open, position, navCategories } = props;
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE;
  const megaMenu = {
    MegaMenu1,
    MegaMenu2,
  };
  const fetcher =(url)=>axios.get(url).then(response=>response.data)
 
  const { data, error } = useSWR(apiUrl+'getNavCategories', fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Wrapper open={open} position={position}>
      {data.map((item) => {
        let MegaMenu = megaMenu[item.menuComponent];
        return (
          <StyledCategoryMenuItem
            key={item.title}
            href={item.href}
          
            title={item.title}
            caret={!!Object.keys(item.menuData['categories']).length}
          >
            {!!Object.keys(item.menuData['categories']).length
            ?
            <MegaMenu data={item.menuData || {}} />:''}
          </StyledCategoryMenuItem>
        );
      })}
    </Wrapper>
  );
};

CategoryMenuCard.defaultProps = {
  position: "absolute",
};
export default CategoryMenuCard;
