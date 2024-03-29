import { CreditCard, FavoriteBorder, Person, Place } from "@mui/icons-material";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { Card, styled, Typography } from "@mui/material";
import { FlexBox } from "components/flex-box";
import CustomerService from "components/icons/CustomerService";
import NavLink from "components/nav-link/NavLink";
import { useRouter } from "next/router";
import { Fragment } from "react"; // custom styled components

const MainContainer = styled(Card)(({ theme }) => ({
  paddingBottom: "1.5rem",
  [theme.breakpoints.down("md")]: {
    boxShadow: "none",
    overflowY: "auto",
    height: "calc(100vh - 64px)",
  },
}));
const StyledNavLink = styled(({ children, isCurrentPath, ...rest }) => (
  <NavLink {...rest}>{children}</NavLink>
))(({ theme, isCurrentPath }) => ({
  display: "flex",
  alignItems: "center",
  borderLeft: "4px solid",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  marginBottom: "1.25rem",
  justifyContent: "space-between",
  borderColor: isCurrentPath ? theme.palette.primary.main : "transparent",
  "& .nav-icon": {
    color: isCurrentPath ? theme.palette.primary.main : theme.palette.grey[600],
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
    "& .nav-icon": {
      color: theme.palette.primary.main,
    },
  },
}));

const Navigations = () => {
  const { pathname } = useRouter();
  return (
    <MainContainer>
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="grey.600" fontSize="12px">
            {item.title}
          </Typography>

          {item.list.map((item) => (
            <StyledNavLink
              href={item.href}
              key={item.title}
              isCurrentPath={pathname.includes(item.href)}
            >
              <FlexBox alignItems="center" gap={1}>
                <item.icon
                  color="inherit"
                  fontSize="small"
                  className="nav-icon"
                />
                <span>{item.title}</span>
              </FlexBox>

            
            </StyledNavLink>
          ))}
        </Fragment>
      ))}
    </MainContainer>
  );
};

const linkList = [
  {
    title: "DASHBOARD",
    list: [
      {
        href: "/orders",
        title: "Orders",
        icon: ShoppingBagOutlined,
     
      },
      {
        href: "/wish-list",
        title: "Wishlist",
        icon: FavoriteBorder,
     
      },
     
    ],
  },
  {
    title: "ACCOUNT SETTINGS",
    list: [
      {
        href: "/profile",
        title: "Profile Info",
        icon: Person,
        
      },
      {
        href: "/address",
        title: "Addresses",
        icon: Place,
        
      },
  ,
    ],
  },
];
export default Navigations;
