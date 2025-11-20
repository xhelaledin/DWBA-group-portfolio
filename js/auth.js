document.getElementById('auth-form').addEventListener('submit', function(e) {
  e.preventDefault();

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // --- Password validation variables ---
  var capitalCount = 0;
  var digitCount = 0;
  var specialCount = 0;

  // --- Count characters manually ---
  for (var i = 0; i < password.length; i++) {
    var ch = password[i];

    if (ch >= 'A' && ch <= 'Z') {
      capitalCount++;
    } else if (ch >= '0' && ch <= '9') {
      digitCount++;
    } else if ((ch >= 'a' && ch <= 'z')) {
      // lowercase letter, do nothing
    } else {
      // not A-Z, not a-z, not 0-9 → special character
      specialCount++;
    }
  }

  // --- Check rules ---
  if (password.length >= 8 &&
      capitalCount >= 2 &&
      digitCount >= 1 &&
      specialCount >= 1) {

    alert("Login successful!");
  } else {
    alert(
      "Password is invalid!\n\n" +
      "Requirements:\n" +
      "- At least 8 characters\n" +
      "- At least 2 capital letters\n" +
      "- At least 1 digit\n" +
      "- At least 1 special character"
    );
  }
});
