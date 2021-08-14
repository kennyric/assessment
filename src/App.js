import './App.css';
import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const [items, setItems] = useState([]);
  const [resourceType, setResourceType] = useState();
  const [completeName, setCompleteName] = useState("");
  const [imageLink, setImageLink] = useState('');
  const [arrayLength, setArrayLength] = useState('');
  const [textFieldPage, setTextFieldPage] = useState(1);
  const [maxPeople, setMaxPeople] = useState(10);
  const [incrementDisable, setIncrementDisable] = useState(false);
  const [decrementDisable, setDecrementDisable] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [openPageNum, setOpenPageNum] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [pageNumError, setPageNumError] = useState(false);
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
 
  const handleClick = () => {
    setSnackbarOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      return;
    }
    setSnackbarOpen(false);
  }

  const handleOpenCard = () =>{
    setOpenCard(true);
  }

  const handleCloseCard = () =>{
    setOpenCard(false);
  }

  const handleOpenPageNum = () =>{
    setOpenPageNum(true);
    setPageNumError(false);
  }

  const handleClosePageNum = () => {
    setOpenPageNum(false);
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 400,
    },
    media: {
      height: 400,
    },
  }));

  const classes = useStyles();

  const handleIncrement = () => {
    if(textFieldPage > 0){
      const integerPage = parseInt(textFieldPage) + 1;
      setTextFieldPage(integerPage);
      changeData(integerPage);
      }

  }

  const handleDecrement = () => {
    if(textFieldPage > 0){
    const integerPage = parseInt(textFieldPage) - 1;
    setTextFieldPage(integerPage);
    changeData(integerPage);
    }
  }

  const changeData = (integerPage) => {
    if(Object.keys(items).lenth < 10){
      
    }
    else{
      const integerPage2 = integerPage - 1;
      setImageLink(items.results[integerPage2].picture.large);
      setCompleteName(items.results[integerPage2].name.title + " " + items.results[integerPage2].name.first + " " + items.results[integerPage2].name.last);
      setArrayLength(items.results.length);
      setAddress(items.results[integerPage2].location.street.number + ', ' + items.results[integerPage2].location.street.name + ', ' + items.results[integerPage2].location.city + ', ' + items.results[integerPage2].location.state
      + ', ' + items.results[integerPage2].location.country);
      setPostCode(items.results[integerPage2].location.postcode);
      setTimeZone(items.results[integerPage2].location.timezone.offset + '(' + items.results[integerPage2].location.timezone.description +')');
      setEmail(items.results[integerPage2].email);
      setBirthDate(items.results[integerPage2].dob.date);
      setPhoneNumber(items.results[integerPage2].phone);
  
      setTextFieldPage(integerPage);
      if(integerPage <= 1){
        setIncrementDisable(false);
        setDecrementDisable(true);
      }
      else if(integerPage > 1 && integerPage < maxPeople){
        setIncrementDisable(false);
        setDecrementDisable(false);
      }
      else if(integerPage >= maxPeople){
        setIncrementDisable(true);
        setDecrementDisable(false);
      }
    }

  }

  const mainButtonClick = () => {
    if(Object.keys(items.results).length > 0){
      changeData(1);
    }
    else{
      handleClick();
    }
    fetch('https://randomuser.me/api/?results=' + maxPeople)
    .then(response=>response.json())
    .then(json=>setItems(json));
    setShowResult(true);
  } 

  const debugButton = () =>{
    console.log(items.results);
    handleClick();
  }

  const handleGoPageNum = () =>{
    if(textFieldPage <= maxPeople && textFieldPage >= 1){
      changeData(textFieldPage);
      setOpenPageNum(false);
    }
    else{
      setPageNumError(true);
    }
  }

    useEffect(()=>{ 
      fetch('https://randomuser.me/api/?results=' + maxPeople)
      .then(response=>response.json())
      .then(json=>setItems(json));
    }, [resourceType])


    const ResultsData = () =>{
      return(
<div className="App">
      <Grid>
        <Grid item xs={12}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
          <Card className={classes.root}>
          <CardActionArea onClick={handleOpenCard}>
          <CardMedia
          className={classes.media}
          image={imageLink}
          title="Picture"
          />
          <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {completeName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          {/* {arrayLength} */}
          </Typography>
          </CardContent>
          </CardActionArea>
          </Card>
          </div>
        </Grid>
      </Grid>

      <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
      <IconButton size="small" onClick={handleDecrement} disabled={decrementDisable}><ArrowBackIcon/></IconButton>
      <label onClick={handleOpenPageNum}>{textFieldPage} of {maxPeople}</label>
      <IconButton size="small" onClick={handleIncrement} disabled={incrementDisable}><ArrowForwardIcon/></IconButton>
      </div>
      <div className="MainCard" style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="warning">Failed to generate data. Please try again</Alert>
      </Snackbar>
      </div>
    </div>
      ); 
    }
  return (
    <div>
      <div style={{display:'flex', justifyContent: 'center'}}>
      <button className="MainButton" onClick={mainButtonClick} >Generate Data</button>
      <button className="MainButton" onClick={debugButton} >Show Warning</button>
      </div>
    { showResult ? <ResultsData/> : null }

    <Dialog
    open={openPageNum}
    onClose={handleClosePageNum}>
      <DialogTitle>Jump Page</DialogTitle>
      <DialogContent>
        <TextField
        type="numeric"
        onChange={e => setTextFieldPage(e.target.value)}
        fullWidth
        placeholder="1"
        error={pageNumError}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleGoPageNum}>
        <b>Go</b>
        </Button>
        <Button onClick={handleClosePageNum}>
        Cancel
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog
    open={openCard}
    onClose={handleCloseCard}
    fullWidth
    maxWidth="md"
    className="dialogCard">
      <DialogTitle><center>Detailed Information</center></DialogTitle>
      <DialogContent>
        <div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}><img src={imageLink} style={{width:'300px', height:'300px'}}/> <br/></div>
        <div className="row">
          <div className="column">
          <b>Name: </b><br/>
          </div>
          <div className="columnRight">
          {completeName}<br/>
          </div>
        </div>

        <div className="row">
          <div className="column">
          <b>Address: </b><br/>
          </div>
          <div className="columnRight">
          {address}<br/>
          </div>
        </div>

        <div className="row">
          <div className="column">
          <b>Post Code: </b><br/>
          </div>
          <div className="columnRight">
          {postCode}<br/>
          </div>
        </div>

        <div className="row">
          <div className="column">
          <b>Time Zone: </b><br/>
          </div>
          <div className="columnRight">
          {timeZone}<br/>
          </div>
        </div>

        <div className="row">
          <div className="column">
          <b>Email: </b><br/>
          </div>
          <div className="columnRight">
          {email}<br/>
          </div>
        </div>

        <div className="row">
          <div className="column">
          <b>Date of Birth: </b><br/>
          </div>
          <div className="columnRight">
          {birthDate}<br/>
          </div>
        </div>

        <div className="row">
          <div className="column">
          <b>Phone Number: </b><br/>
          </div>
          <div className="columnRight">
          {phoneNumber}<br/>
          </div>
        </div>
        </div>

        
      </DialogContent>
      <Button onClick={handleCloseCard}>
        Close
      </Button>
    </Dialog>
    </div>
  );
}

export default App;
