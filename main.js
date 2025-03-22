// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads
const errorModal = document.getElementById('modal');
errorModal.classList.add('hidden');

// Add event listeners to all empty hearts
const hearts = document.querySelectorAll('.like-glyph');
hearts.forEach((heart) => {
  heart.addEventListener('click', () => {
    if (heart.textContent === EMPTY_HEART) {
      // When a user clicks on an empty heart
      mimicServerCall()
        .then(() => {
          // When the "server" returns a success status
          heart.textContent = FULL_HEART; // Change the heart to a full heart
          heart.classList.add('activated-heart'); // Add the .activated-heart class
        })
        .catch((error) => {
          // When the "server" returns a failure status
          const errorMessage = document.getElementById('modal-message');
          errorMessage.textContent = error; // Display the server error message in the modal
          errorModal.classList.remove('hidden'); // Display the error modal
          setTimeout(() => {
            errorModal.classList.add('hidden'); // Hide the modal after 3 seconds
          }, 3000);
        });
    } else {
      // When a user clicks on a full heart
      heart.textContent = EMPTY_HEART; // Change the heart back to an empty heart
      heart.classList.remove('activated-heart'); // Remove the .activated-heart class
    }
  });
});



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
