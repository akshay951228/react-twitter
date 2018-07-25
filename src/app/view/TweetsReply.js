import React, { Component } from 'react'
import firebase from 'firebase'
import 'firebase'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { compose } from 'recompose'
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import {TextField,Button} from '@material-ui/core';
const styles = theme=>({
  card: {
    maxWidth: 500,
    marginBottom: '10px',
    display: 'flex',
    flexDirection:'column',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    borderStyle:"solid",
    marginBottom:theme.spacing.unit*3
  }
});
class Tweets extends Component {
  state = {
    selectedTweet: [],
    replyTweets:[]
  }
  handleSubmit=async (event)=>{
    const {auth_user,match:{params}} = this.props
    event.preventDefault()
    const comment= event.target.reply.value
    const key = await firebase.database().ref('replies/'+params.id).push().key
    const newselectedTweet={
      name:auth_user.displayName,
      comment:comment,
      uid:auth_user.uid,
      avatar:auth_user.photoURL,
      timestamp:firebase.database.ServerValue.TIMESTAMP
    }
    firebase.database().ref('replies/'+params.id+'/'+key).set(newselectedTweet).then((res)=>console.log("succes"))
  }
  componentDidMount() {
    this._unMount=true
    if(!this.props.auth_user){
      this.props.history.push('/')
    }
    else{
      const {params} = this.props.match
      const tweetsRef = firebase.database().ref('tweets/' + params.id)
      const replyTweetRef = firebase.database().ref('replies/'+params.id)
      tweetsRef.on('value', (dataSnap) => {
        if (this._unMount) this.setState({
          selectedTweet: dataSnap.val()
        })
      })
      replyTweetRef.on('value', (dataSnap) => {
        if (this._unMount) this.setState({
          replyTweets: dataSnap.val()
        })
      })
    }
  }
  componentDidUpdate(){
    if(!this.props.auth_user){
      this.props.history.push('/')
    }
  }
  componentWillUnmount(){
    this._unMount=false
  }
  render() {
    const { selectedTweet,replyTweets } = this.state
    const { classes, auth_user } = this.props;
    if (selectedTweet && selectedTweet.length === 0) {
      return (
        <div>
          Loading
        </div>
      )
    }
    if(!selectedTweet){
      return (
        <div>
          You haven't posted any Tweets.
        </div>
      )
    }
    const date = new Date(selectedTweet.timestamp) 
    if(selectedTweet){
      return (
        <div>
          <Grid
            container
            wrap="nowrap" spacing={16}
            align="center" direction='column'
          >
              <Card className={classes.card}>
              <CardContent>
              <div style={{display:'flex',flexDirection:'row',flexGrow: 1}}>
              <Avatar src={selectedTweet.avatar} />
                <Typography gutterBottom variant="title" component="h2" style={{marginLeft:"20px"}}>
                  {selectedTweet.name}
                </Typography>
                </div>
                <Typography component="p" style={{display:'flex',flexDirection:'row',marginTop:"10px"}}>
                  {selectedTweet.tweet}
                </Typography>
              </CardContent>
              <CardActions>
              <Typography gutterBottom variant="body2" component="h2">
                  {`${date.getHours()}:${date.getMinutes()}`}
                </Typography>
                </CardActions>
            </Card>
            <form noValidate autoComplete='off' onSubmit={this.handleSubmit} >
              <TextField
                label="Reply For Tweet"
                id="reply"
                defaultValue={''}
                className={classes.textField}
              />
              <Button type='submit' variant="contained" color="primary">
                Reply
              </Button>
            </form>
            {replyTweets && Object.keys(replyTweets).length!=0 && Object.keys(replyTweets).map((key) =>{
              const date = new Date(replyTweets[key].timestamp)
            return <Card className={classes.card} key={key}>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
                  <Avatar src={replyTweets[key].avatar} />
                  <Typography gutterBottom variant="title" component="h2" style={{ marginLeft: "20px" }}>
                    {replyTweets[key].name}
                  </Typography>
                </div>
                <Typography component="p" style={{ display: 'flex', flexDirection: 'row', marginTop: "10px" }}>
                  {replyTweets[key].comment}
                </Typography>
              </CardContent>
              <CardActions>
                <Typography gutterBottom variant="body2" component="h2">
                  {`${date.getHours()}:${date.getMinutes()}`}
                </Typography>
              </CardActions>
            </Card>
            })}
          </Grid>
        </div>
      )
    }
    return(
      <div>
        Something is going wrong
        </div>
    )
  }
}
const mapStateToProps = state => {
  return { auth_user: state.auth_user };
};


export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Tweets)