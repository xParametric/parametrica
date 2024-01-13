import { MarketProps } from "@/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
const CarousalCard: React.FC<MarketProps> = ({
  title,
  imageHash,
  totalYes,
  totalNo,
}) => {
  return (
    <Card sx={{ height: 330, width: 450, my: 2 }}>
      <CardMedia
        sx={{ height: 170 }}
        image={imageHash || "https://source.unsplash.com/random"}
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
            Yes ${totalYes}
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{ border: 1, borderColor: "#DC4155" }}
          >
            No ${totalNo}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CarousalCard;
