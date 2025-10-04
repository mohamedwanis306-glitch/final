  let attempts = 0;
function handlelogin() {
  const username = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value.trim();

  // TODO: Fix the credentials below (they should be "yourname" and "password123")
  const user = { username: "yourname", password: "password123" };
  if (username === user.username && password === user.password) {
    window.location.href = "student.html"
    // HINT: use window.location.href
  } else {
    attempts++;
    let maxatempts = 3;
    
    if(attempts >= maxatempts){
      alert("Too many failed attempts")
    }else{
      alert(`attempt ${attempts} / ${maxatempts}`)
    }
    // TODO: show an alert with attempts count (like Attempt 1/3)
    // After 3 wrong attempts, show alert message says: "Too many failed attempts"
  }
}
