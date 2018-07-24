import React, { Component } from 'react'
import firebase from 'firebase'
import 'firebase'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { compose } from 'recompose'
const styles = {
  card: {
    maxWidth: 450,
    marginBottom: '10px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};
class Tweets extends Component {
  state = {
    allTweets: []
  }
  componentDidMount() {
    const tweetsRef = firebase.database().ref('tweets')
    tweetsRef.on('value', (dataSnap) => {
      this.setState({
        allTweets: dataSnap.val()
      })
    })
  }
  render() {
    const { allTweets } = this.state
    const { classes, auth_user } = this.props;
    if (allTweets.length === 0) {
      return (
        <div>
          Loading
        </div>
      )
    }
    return (
      <div>
        <Grid
          container
          wrap="nowrap" spacing={16}
          align="center" direction='column'
        >
          {Object.keys(allTweets).map((key) =>
            <Card className={classes.card} key={key} >
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  Tweet
        </Typography>
                <Typography component="p">
                  {allTweets[key].tweet}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Reply
        </Button>
              </CardActions>
            </Card>
          )}
        </Grid>
      </div>
    )
  }
}

export default compose(
  withStyles(styles)
)(Tweets)