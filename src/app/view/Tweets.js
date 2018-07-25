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
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom'
const styles = {
  card: {
    maxWidth: 450,
    marginBottom: '10px',
    display: 'flex',
    flexDirection:'column'
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
    this._unMount=true
    const tweetsRef = firebase.database().ref('tweets')
    tweetsRef.on('value', (dataSnap) => {
      if(this._unMount) this.setState({
        allTweets: dataSnap.val()
      })
    })
  }
  componentWillUnmount(){
    this._unMount=false
  }
  render() {
    const { allTweets } = this.state
    const { classes, auth_user } = this.props;
    if (allTweets && allTweets.length === 0) {
      return (
        <div>
          Loading
        </div>
      )
    }
    if(!allTweets){
      return (
        <div>
          Your are the first to post
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
          {Object.keys(allTweets).map((key) =>{
          const date = new Date(allTweets[key].timestamp)
          
           return <Card className={classes.card} key={key} >
              <CardContent>
              <div style={{display:'flex',flexDirection:'row',flexGrow: 1}}>
              <Avatar src={allTweets[key].avatar} />
                <Typography gutterBottom variant="title" component="h2" style={{marginLeft:"20px"}}>
                  {allTweets[key].name}
                </Typography>
                </div>
                <Typography component="p" style={{display:'flex',flexDirection:'row',marginTop:"10px"}}>
                  {allTweets[key].tweet}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary"
                  component={Link}
                  to={'/tweet/'+allTweets[key].tweetId}
                >
                  Reply
                 </Button>
                 <Typography gutterBottom variant="body2" component="h2" style={{ flexGrow:1,justifyContent:'flex-end'}} >
                  {`${date.getHours()}:${date.getMinutes()}`}
                </Typography>
              </CardActions>
            </Card>
          })}
        </Grid>
      </div>
    )
  }
}


export default compose(
  withStyles(styles)
)(Tweets)