async function submitRequest() {
  const name = document.getElementById('name').value;
  const grade = document.getElementById('grade').value;
  const team = document.getElementById('team').value;
  const product = document.getElementById('requestFormElement').dataset.product;
  
  if (!["6th", "7th", "8th"].includes(grade)) {
    alert("Invalid grade.");
    return;
  }
  
  if (!["Lead", "Dream", "Innovate"].includes(team)) {
    alert("Invalid team.");
    return;
  }
  
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, grade, team, product })
  });
  
  if (response.ok) {
    alert("Request sent! I will try to get to you as soon as possible.");
    closeForm();
  } else {
    alert("Error sending request.");
  }
}
