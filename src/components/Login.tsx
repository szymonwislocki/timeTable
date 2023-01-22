import { FC, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import { FormEvent, useState } from "react";
import { Alert, Box, Button, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AccountCircleSharp } from "@mui/icons-material";
import { auth, db } from "../firebase";
import CloseIcon from "@mui/icons-material/Close";
import { UserDataContext } from "../providers/userData";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

interface Props {
  open: boolean;
}

interface LoginForm extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  pass: HTMLInputElement;
  passRepeat: HTMLInputElement;
}

const Login: FC<Props> = ({ open }) => {
  const { user, setUser } = useContext(UserDataContext);

  const [error, setError] = useState<null | string>(null);
  const [showRegister, setShowRegister] = useState<boolean>(true);

  const ERRORS = {
    INVALID_INPUTS: "Niepoprawny email lub hasło.",
    IN_PROMISE_ERROR: "Wystąpił błąd. Spróbuj ponownie.",
    EMAIL_IN_USE: "Konto z takim adresem już istnieje.",
    TOO_MANY_TRIES: "Przekroczono limit prób logowania.",
    PASSWORD_DOES_NOT_MATCH: "Podane hasła są różne.",
    INVALID_EMAIL: "Niepoprawny format e-mail.",
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (showRegister) {
      //REGISTER

      const formElements = e.currentTarget.elements as LoginForm;

      const email = formElements.email.value;
      const pass = formElements.pass.value;
      const passRepeat = formElements.passRepeat.value;

      if (passRepeat === pass) {
        createUserWithEmailAndPassword(auth, email, pass)
          .then(() => {
            newUser(email)
              .then(() => {
                setUser(email);
              })
              .catch(() => setError(ERRORS.IN_PROMISE_ERROR));
          })
          .catch(({ code }) => {
            switch (code) {
              case "auth/invalid-email":
                setError(ERRORS.INVALID_EMAIL);
                break;
              case "auth/email-already-in-use":
                setError(ERRORS.EMAIL_IN_USE);
                break;
              default:
                setError(ERRORS.IN_PROMISE_ERROR);
            }
          });
      } else {
        setError(ERRORS.PASSWORD_DOES_NOT_MATCH);
      }
    } else {
      //LOGIN

      const formElements = e.currentTarget.elements as LoginForm;

      const email = formElements.email.value;
      const pass = formElements.pass.value;

      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          setUser(email);
        })
        .catch(({ code }) => {
          console.log(code);
          switch (code) {
            case "auth/invalid-email":
              setError(ERRORS.INVALID_EMAIL);
              break;
            case "auth/wrong-password":
              setError(ERRORS.INVALID_INPUTS);
              break;
            case "auth/too-many-requests":
              setError(ERRORS.TOO_MANY_TRIES);
              break;
            default:
              setError(ERRORS.IN_PROMISE_ERROR);
          }
        });
    }
  };

  const docReference = doc(collection(db, "userConfig"));
  const newUser = async (email: string): Promise<void> => {
    await setDoc(docReference, {
      email: email,
      currency: "PLN",
      rate: 0,
      prevSum: 0,
      beginOfPeriod: new Date().getTime(),
      endOfPeriod: new Date().getTime() + 3600000 * 24 * 30,
      id: docReference.id,
    });
  };

  return (
    <>
      <Dialog open={open} sx={{ backgroundColor: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }}>
        <Box onSubmit={handleSubmit} sx={{ width: 300, maxHeight: 330, display: "flex", flexDirection: "column", gap: 1, m: 1.5 }} component="form">
          <DialogTitle>{showRegister ? "Załóż nowe konto" : "Musisz się zalogować"}</DialogTitle>
          <TextField id="email" required label="Wprowadź e-mail" />
          <TextField id="pass" required type="password" label="Wprowadź hasło" />
          {showRegister && <TextField id="passRepeat" required type="password" label="Powtórz hasło" />}
          <Button variant="contained" type="submit">
            {showRegister ? "Zarejestruj" : "Zaloguj"}
          </Button>
          <Typography onClick={() => setShowRegister(!showRegister)} variant="subtitle2" sx={{ textAlign: "center", cursor: "pointer" }}>
            {showRegister ? "Masz już konto? Zaloguj się." : "Kliknij tutaj, aby założyć konto."}
          </Typography>
        </Box>
        {error && (
          <Alert severity="error">
            {error}
            <IconButton aria-label="close" color="inherit" size="small" onClick={() => setError(null)}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Alert>
        )}
      </Dialog>
    </>
  );
};

export default Login;
