import { MarketProps } from "@/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import BigNumber from "bignumber.js";
const CarousalCard: React.FC<MarketProps> = ({
  title,
  imageHash,
  totalYes,
  totalNo,
}) => {
  const ipfsBaseUrl = "https://ipfs.io/ipfs/";

  const formattedImageHash = imageHash.replace("ipfs://", "");

  const imageUrl = imageHash
    ? `${ipfsBaseUrl}${formattedImageHash}`
    : "/default-image-path.jpg";
  return (
    <Card sx={{ height: 330, width: 450, my: 2 }}>
      <CardMedia
        sx={{ height: 170 }}
        image={imageUrl || "https://source.unsplash.com/random"}
        title="green iguana"
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {title}
        </Typography>{" "}
        <CardActions sx={{ px: 0 }}>
          <Button
            size="small"
            variant="outlined"
            sx={{ border: 1, borderColor: "#0ECB81" }}
          >
            {"Yes " + BigNumber(totalYes ?? 0)?.dividedBy(10 ** 18)}
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{ border: 1, borderColor: "#DC4155" }}
          >
            {"No " + BigNumber(totalNo ?? 0)?.dividedBy(10 ** 18)}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CarousalCard;
