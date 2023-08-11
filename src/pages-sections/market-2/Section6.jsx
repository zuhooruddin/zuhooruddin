import { Box, Container, Divider, Grid, styled } from "@mui/material";
import { H4, Paragraph, Span } from "components/Typography"; // custom styled components
import NavLink3 from "components/nav-link/NavLink3";
import BannerCard4 from "components/banners/BannerCard4";
import Link from 'next/link'

const Section6 = ({data1, data2}) => {
  const imgbaseurl = process.env.NEXT_PUBLIC_BACKEND_API_BASE + 'media/';
  const slugbaseurl = 'category/';

  return (
    <Container sx={{ my: 8 }}>
      <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
          <Link href={slugbaseurl + data1.category_slug}>
            <a href="">
              <Box sx={{
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '30%',
                '& > img': {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transition: 'filter 0.3s ease',
                },
                '&:hover > img': {
                  filter: 'brightness(50%)',
                },
                '& > div': {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'left',
                  flexDirection: 'column',
                  transition: 'background-color 0.3s ease',
                },
                '&:hover > div': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
                '&:hover h4': {
                  fontSize:18 ,
                  color: '#fff',
                  transition: 'color 0.5s ease-in-out',
                },
                '&:hover span': {
                  fontSize:14 ,
                  color: '#fff',
                  transition: 'color 0.5s ease-in-out',
                },
              }}>
                <Box component="img" src={data1.image&&data1.image?imgbaseurl + data1.image:'/assets/images/banners/banner-21.jpg'} alt={data1.category_name} sx={{boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', backgroundColor: '#fff' }} />
                <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
                  <H4 fontSize={18} lineHeight={1} sx={{ color: '#000000', mb: 1, ml: 10 }}>
                    {data1.category_name&&data1.category_name?data1.category_name:'Category12'}
                  </H4>
                  <Span fontSize={14} lineHeight={1} sx={{ color: '#000000', ml: 10 }}>
                    View all
                  </Span>
                </Box>
              </Box>
            </a>
          </Link>
        </Grid>
        {/* sx={{ border: '2px solid #ccc' }} */}

        <Grid item md={6} xs={12}>
          <Link href={slugbaseurl + data2.category_slug}>
            <a href="">
              <Box sx={{
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '30%',
                '& > img': {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transition: 'filter 0.3s ease',
                },
                '&:hover > img': {
                  filter: 'brightness(50%)',
                },
                '& > div': {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'left',
                  flexDirection: 'column',
                  transition: 'background-color 0.3s ease',
                },
                '&:hover > div': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
                '&:hover h4': {
                  fontSize:18 ,
                  color: '#fff',
                  transition: 'color 0.5s ease-in-out',
                },
                '&:hover span': {
                  fontSize:14 ,
                  color: '#fff',
                  transition: 'color 0.5s ease-in-out',
                },
              }}>
                <Box component="img" src={ data2.image&& data2.image?imgbaseurl + data2.image:'/assets/images/banners/banner-22.jpg'} alt={data2.category_name} sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', backgroundColor: '#fff' }} />
                <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
                  <div>
                    <H4 fontSize={18} lineHeight={1} sx={{ color: '#000000', mb: 1, ml: 10 }}>
                      {data2.category_name&&data2.category_name?data2.category_name:'Category13'}
                    </H4>
                    <Span fontSize={14} lineHeight={1} sx={{ color: '#000000', ml: 10 }}>
                      View all
                    </Span>
                  </div>
                </Box>
              </Box>
            </a>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Section6