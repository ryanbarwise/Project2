$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post('/api/signup', {
      email: email,
      password: password,
    })
      .then(() => {
        window.location.replace('/members');
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    
    let errors = err.responseJSON.errors;
    if (errors) {
      let text = '';
      for (var i = 0; i < errors.length; i++) {
        text += '\b' + errors[i].message;
      }
      $('#alert .msg').text(text);
    } else {
      $('#alert .msg').text(JSON.stringify(err));
    }
    $('#alert').fadeIn(500);
  }
});
