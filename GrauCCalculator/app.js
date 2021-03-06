//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  //Hide results
  document.getElementById('results').style.display = 'none';

  //Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//Calculate Results
function calculateResults() {
  //UI Vars
  const grauA = document.getElementById('grauA');
  const grauB = document.getElementById('grauB');
  const grauFinal = document.getElementById('grauFinal');
  const grauAFinal = document.getElementById('grauAFinal');
  const grauBFinal = document.getElementById('grauBFinal');

  if(grauA.value === '' && grauB.value === '') {
    showMessage('Os campos estão vazios!', 'alert-danger' )
  } else {
    //Compute notaFinal
    const novoGrauA = parseFloat(grauA.value) * 0.33;
    let novoGrauB = 0.0;
    let conditional = false;
    let notaFinal = 0.0;
    //Compute grauB if is blank
    if(grauB.value === '') {
      conditional = true;
      novoGrauB = (6 - novoGrauA) * 1.493;
      showMessage('Você precisa tirar ' + novoGrauB.toFixed(2) + ' para ficar na média', 'alert-info');
      notaFinal = novoGrauA + novoGrauB;
    } else {
      novoGrauB = parseFloat(grauB.value);
      notaFinal = novoGrauA + novoGrauB * 0.67;
    }

    if(isFinite(notaFinal) && notaFinal <= 10) {
      //Clear inputs
      grauA.value = '';
      grauB.value = '';

      //Show points
      grauAFinal.value = novoGrauA.toFixed(2);
      grauBFinal.value = conditional === false ? novoGrauB.toFixed(2) : (novoGrauB * 0.67).toFixed(2);
      grauFinal.value = notaFinal.toFixed(2);

      //Show Results
      document.getElementById('results').style.display = 'block';

      //Hide loader
      document.getElementById('loading').style.display = 'none';

      //Show Message
      conditional === false ? grauFinal.value >= 6 ? showMessage('Parabéns! Você foi aprovado!', 'alert-success') : showMessage('Parece que alguém vai ter que fazer o GrauC...', 'alert-warning') : '';
    } else {
      showMessage('Algo deu errado! Confira se as notas estão corretas.', 'alert-danger');
    }
  }
}

//Show Message
function showMessage(message, alert) {
  if(alert === 'alert-danger') {
    //Hide Results
   document.getElementById('results').style.display = 'none';

   //Hide loader
   document.getElementById('loading').style.display = 'none';
  }

  //Create a div
  const messageDiv = document.createElement('div');

  //Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  messageDiv.className = 'alert ' + alert;

  //Create text node and append to div
  messageDiv.appendChild(document.createTextNode(message));

  //Insert error above heading
  card.insertBefore(messageDiv, heading);

  //Clear error after 3 seconds
  setTimeout(clearMessage, 5000);
}

//Clear Message
function clearMessage() {
  document.querySelector('.alert').remove();  
}
