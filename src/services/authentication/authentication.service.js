import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const loginRequest = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // console.log(user, "user");

  //     if (user) {
  //       setIsAuthenticated(true);
  //     }
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });
};
