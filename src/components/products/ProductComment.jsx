import { Box } from "@mui/material";
import BazaarAvatar from "components/BazaarAvatar";
import BazaarRating from "components/BazaarRating";
import { FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import { getDateDifference } from "utils/utils"; // ===========================================================

// ===========================================================
const ProductComment = (props) => {
  const { username, imgUrl, rating, date, review} = props;
  return (
    <Box mb={4} maxWidth="600px">
      <FlexBox alignItems="center" mb={2}>
        <BazaarAvatar src={imgUrl} height={48} width={48} />
        <Box ml={2}>
          <H5 mb={0.5}>{username}</H5>
          <FlexBox alignItems="center">
            <BazaarRating value={rating} color="warn" readOnly />
            <H6 mx={1.25}>{rating}</H6>
            <Span>{getDateDifference(date)}</Span>
          </FlexBox>
        </Box>
      </FlexBox>

      <Paragraph color="grey.700" ml={9}>{review}</Paragraph>
    </Box>
  );
};

export default ProductComment;
