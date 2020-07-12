import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Box from "@material-ui/core/Box";
import Loader from "react-loader-spinner";

export default function MainPage() {
  const classes = useStyles();
  const [word, setWord] = useState("");
  const [data, setData] = useState("all");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resWord, setResWord] = useState("");

  const generateAcronym = () => {
    if (/^[A-Za-z]+$/.test(word)) {
      setLoading(true);
      setResWord(formatAcronym(word));
      // /api/acronym?word=${word}&data=${data}
      fetch(`/api/acronym?word=${word.toLowerCase()}&data=${data}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("completed result");
          console.log(word);
          setResult(data.result);
          setLoading(false);
        });
    } else {
      console.log("bad input");
    }
  };

  // Based on https://stackoverflow.com/questions/32589197/how-to-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript
  const formatAcronym = (acronym) => {
    var splitStr = acronym.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  return (
    // <div className={classes.background}>
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h2" variant="h2" className={classes.title}>
          Boboddy
        </Typography>
        <Typography component="h4" variant="h4">
          Acronym Generator
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="title"
                label="Word"
                autoFocus
                helperText="Single word to generate acronym with"
                onChange={(e) => setWord(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                required
                variant="outlined"
                margin="normal"
              >
                <InputLabel id="data-label">Data</InputLabel>
                <Select
                  labelId="data-label"
                  label="Data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                >
                  <MenuItem value={"all"}>All Data</MenuItem>
                  <MenuItem value={"bible"}>The Bible</MenuItem>
                  <MenuItem value={"inaugural"}>Inauguration Speeches</MenuItem>
                  <MenuItem value={"quotes"}>Famous Quotes</MenuItem>
                  <MenuItem value={"shakespeare"}>Shakespeare Plays</MenuItem>
                  <MenuItem value={"state_union"}>
                    State of the Union Addresses
                  </MenuItem>
                </Select>
                <FormHelperText>Data used to generate acronym</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              className={classes.submit}
              onClick={() => generateAcronym()}
              color="primary"
            >
              Generate acronym
            </Button>
          </Box>
        </form>
      </div>
      {loading ? (
        <LoadingIndicator />
      ) : result.length === 0 ? (
        <div></div>
      ) : (
        <div className={classes.results}>
          <Typography component="h4" variant="h4" className={classes.title}>
            Acronyms for "{resWord}"
          </Typography>
          <ol className={classes.list}>
            {result.map((acronym) => (
              <li>{formatAcronym(acronym)}</li>
            ))}
          </ol>
        </div>
      )}
    </Container>
  );
}

const LoadingIndicator = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader type="ThreeDots" color="#FFFFFF" height="100" width="100" />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#5A74D1",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  paper: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(6),
    backgroundColor: "white",
    borderRadius: "20px",
  },
  title: {
    fontWeight: "bold",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  inputs: {
    margin: theme.spacing(3, 0, 2),
  },
  list: {
    fontSize: "18px",
  },
  results: {
    margin: theme.spacing(2),
    padding: theme.spacing(6),
    backgroundColor: "white",
    borderRadius: "20px",
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    alignContent: "center",
  },
}));
