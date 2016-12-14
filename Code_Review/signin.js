// Review done by Andrea Zampieri. Look at the end of the document. Following the original document

/*
 * Daniele Bissoli
 * Universitary Help - Sign In/Up Scritp
 * v0.0.1 - 2016-12-03
*/
var signing = (function() {
  // convert password score
  // into a reppresantive string
  var strength = {
    0 : "Worst",
    1 : "Bad",
    2 : "Weak",
    3 : "Good",
    4 : "Strong"
  };

  // boolean variable that store
  // if input passwords are equal
  var pwdOK = false;

  // password input
  var password = document.getElementById("pwd1");
  // second password input
  var apwd = document.getElementById("pwd2");
  // meter object
  var meter = document.getElementById("pwd-strength");
  // checkbox
  var privacyAccept = document.getElementById("privacy-check");
  var signUpBtn = document.getElementById("sign-up");

  /**
   * Check password strenght and notify user
   */
  function pwdStrength() {
    // pwd value
    var value = password.value;
    // result from strength pwd check library
    var result = zxcvbn(value);

    // Update the password strength meter
    // change scale start so 0 mean no input
    // and 1 is bad password
    meter.value = result.score + 1;

    // Update the text information inside meter element
    if (value !== "") {
      meter.innerHTML = "Strength: " + strength[result.score]; 
    }
    else {
      // reset meter value
      meter.value = 0;
      meter.innerHTML = "";
    }
  }

  /**
   * { Check and act, if it is the case to enable sign up button or not }
   */
  function letSignUp() {
    signUpBtn.disabled = !(privacyAccept.checked && pwdOK);
  }

  /**
   * Adds a class name to specified html element.
   *
   * @param      {element}  element   The html element
   * @param      {string}   theClass  The class name
   */
  function addClass(element, theClass) {
    element.className = element.className + " " + theClass;
  }

  /**
   * Removes a class name from specified html element.
   *
   * @param      {element}  element   The html element
   * @param      {string}   theClass  The class name
   */
  function removeClass(element, theClass) {
    var classes = element.className.split(" ");
    element.className = classes.filter((e) => e !== theClass).join(" ")
  }

  /**
   * { Check if both password provided by user are equal }
   */
  function checkPwdPair() {
    if (apwd.value === "") {
      removeClass(apwd, "pwd-wrong");
      removeClass(apwd, "pwd-right");
      pwdOK = false;
    }
    else if (password.value === apwd.value) {
      removeClass(apwd, "pwd-wrong");
      addClass(apwd, "pwd-right");
      pwdOK = true;
    }
    else {
      removeClass(apwd, "pwd-right");
      addClass(apwd, "pwd-wrong");
      pwdOK = false;
    }

    // check again if it is the case
    // to enable sign up button
    letSignUp();
  }

  /* PUBLIC FUNCTIONS */
  return {
    // module inizialization function
    init : function() {
      // bind meter object with the strength check
      password.addEventListener('input', pwdStrength);
      password.addEventListener("change", checkPwdPair);
      privacyAccept.addEventListener('change', letSignUp);
      apwd.addEventListener("change", checkPwdPair);
      apwd.addEventListener("input", checkPwdPair);
    }
  };
}) ();

// when the windows is loaded, run the initialization
window.onload = signing.init;

/*
  Review 

 - Code is well commented
 - Code is well divided (vars, functions, etc.)
 - Functions are clear in their internal mechanics (some names of the variables are debatable) but the interactions
  between them aren't clear until the end of the document, where the bindings are done

  */