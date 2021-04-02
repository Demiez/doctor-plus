import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import homePageImg from '../../../assets/images/home_page_bg.jpg';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
}));

export const HomePage: React.FC = () => {
  const classes = useStyles();
  return (
    <div className="container">
      <div>Home Page </div>
      <div>
        <img src={homePageImg} alt="Home Page Image" />
      </div>
      <div>Welcome to Doctor Plus home page</div>
      {/* <Card className={classes.card}>
        <Typography variant="h6" className={classes.title}>
          Home Page
        </Typography>
        <CardMedia className={classes.media} image={backgroundImg} title="Doctor Plus Title" />
        <CardContent>
          <Typography variant="body2" component="p">
            Welcome to Doctor Plus home page
          </Typography>
        </CardContent>
      </Card> */}
    </div>
  );
};
