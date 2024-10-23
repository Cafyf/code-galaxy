export default class ValidationUtils {
    // Check if username is valid (non-empty)
    static usernameIsValid(username) {
      return username.trim() !== "";
    }
  
    // Validate email with a more comprehensive regex
    static emailIsValid(email) {
      const emailPattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return email.trim() !== "" && emailPattern.test(email.trim().toLowerCase());
    }
  
    // Validate password length and non-emptiness
    static passwordIsValid(password) {
      return password.trim() !== "" && password.trim().length >= 8;
    }
  
    // Check if passwords match
    static passwordMatch(password, password2) {
      return password === password2;
    }
  }
  