import React,{Component} from 'react';
import {Link, withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {compose}  from 'recompose'
import firebase from 'firebase/app'
import 'firebase/database'

const styles = theme=> ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  textField: {
    flexBasis: 200,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
});


class Layout extends Component {
  state = {
    open: false,
    tweet:''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit =async()=>{
    const {tweet} = this.state
    const key = await firebase.database().ref('tweets/').push().key
    firebase.database().ref('tweets/'+key).set({
      tweet:tweet
    }).then((res)=>console.log(res))

    this.setState({ open: false,tweet:"" });
  }
  render() {
    const { classes,children } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}
            component={Link}
            to={'/'}
            style={{ textDecoration: "none", color: "unset" }}
            >
              Twitter
            </Typography>
            <Button color="inherit" onClick={this.handleClickOpen}>tweet</Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Compose new Tweet</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  value={this.state.tweet}
                  onChange={this.handleChange('tweet')}
                  id="name"
                  label="Tweet"
                  multiline
                  rows="4"
                  fullWidth
                  style={{width: "50vh"}}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
              </Button>
                <Button onClick={this.handleSubmit} color="primary">
                  Tweet
              </Button>
              </DialogActions>
            </Dialog>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      </div>
    );
  }
}



export default compose(
    withRouter,
    withStyles(styles)
)(Layout);