var firebaseConfig = {
	apiKey: "AIzaSyDIrF0FkWHDSEhyrdqW9-nc-sbY4ovaNkU",
	authDomain: "noplace-e318a.firebaseapp.com",
	databaseURL: "https://noplace-e318a.firebaseio.com",
	projectId: "noplace-e318a",
	storageBucket: "noplace-e318a.appspot.com",
	messagingSenderId: "770326158519",
	appId: "1:770326158519:web:adf35d53e65cac13588132",
	measurementId: "G-BTX6QGTN8J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/**
 * Handles the sign in button press.
 */
function handleSignIn() {
	if (firebase.auth().currentUser == null) {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		//Check for valid email and password length
		if (email.length < 4) {
			alert('Please enter an email address.');
			return;
		}
		if (password.length < 4) {
			alert('Please enter a password.');
			return;
		}
		// Sign in with email and password
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			
			if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
		});
	}
}

/**
 * Handles the sign out button press.
 */
function handleSignOut() {
	if (firebase.auth().currentUser) {
		firebase.auth().signOut();
	}
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('new-email').value;
  var password = document.getElementById('new-password').value;
  //Check for valid email and password length
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function() {
  	//Send email verification if user created
    sendEmailVerification();
    //Set display name to Anon
    changeDisplayName("Anon");
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  firebase.auth().currentUser.sendEmailVerification()
  .then(function() {
    // Email Verification sent!
    alert('Email Verification Sent!');
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
  });
}

/**
 * Sends a reset password email to the user
 */
function sendPasswordReset() {
  var email = firebase.auth().currentUser.email;
  firebase.auth().sendPasswordResetEmail(email)
  .then(function() {
    // Password Reset Email Sent!
    alert('Password Reset Email Sent!');
    signOut();
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
  });
  // [END sendpasswordemail];
}

/**
 * Changes a user display name
 */
function changeDisplayName() {
	let newName = document.getElementById("username").value;
	if(newName == null) {
		newName = "Anon";
	}

	var user = firebase.auth().currentUser;

	if(user) {
		user.updateProfile({
		  	displayName: newName
		}).then(function() {
			alert("Name changed!");
			updateInfo();
		}).catch(function(error) {
			alert(error);
		});
	}
}

function updateInfo() {
	var user = firebase.auth().currentUser;
	if(user) {
		var displayName = user.displayName;
		if(displayName == null) {
			displayName = "Anon";
		}
		var email = user.email;
		var emailVerified = user.emailVerified;
		let accInfo = document.getElementById('account-info');
		let info = "";
		info += "Name: " + displayName;
		info += "<br>";
		info += "Email: " + email;
		info += "<br>";
		info += emailVerified ? "Email Verified" : "Email Not Verified";
		accInfo.innerHTML = info;

		document.getElementById('displayed-username').innerHTML = displayName;
		document.getElementById('username').value = displayName;
	}
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    	// User is signed in.
    	var NSI = document.getElementById('not-signed-in');
    	var SI = document.getElementById('signed-in');
    	if(NSI.className.indexOf("w3-show") != -1) {
			NSI.className = NSI.className.replace("w3-show", "");
    	}
		if(SI.className.indexOf("w3-show") == -1) {
			SI.className += " w3-show";
		}
		
		var displayName = user.displayName;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;
		var providerData = user.providerData;

		
		updateInfo();

    } else {
		var NSI = document.getElementById('not-signed-in');
    	var SI = document.getElementById('signed-in');
    	if(SI.className.indexOf("w3-show") != -1) {
			SI.className = SI.className.replace("w3-show", "");
    	}
		if(NSI.className.indexOf("w3-show") == -1) {
			NSI.className += " w3-show";
		}
    }
  });
  // [END authstatelistener]

  document.getElementById('quickstart-sign-in').addEventListener('click', handleSignIn, false);
  document.getElementById('quickstart-sign-out').addEventListener('click', handleSignOut, false);
  document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
  document.getElementById('change-username').addEventListener('click', changeDisplayName, false);
  document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
  document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function() {
  initApp();
};