const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn  = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//  Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function completeLoading(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quotes
function newQuote() {
    loading();
    // Pick Random Quote from Quotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is empty
    if (!quote.author) {
        authorText.textContent = 'unknown';
    } else {
        authorText.textContent = quote.author;
    }
    
    // Check Quote Length to determine styling
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    // Set Quote and hide loader if completed
    quoteText.textContent = quote.text;
    completeLoading()
}

// Load quotes from Local File
function loadLocalQuotes() {
    loading();
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    // quoteText.textContent = quote.text;
    // authorText.textContent = quote.author;
    if (!quote.author) {
        authorText.textContent = 'unknown';
    } else {
        authorText.textContent = quote.author;
    }
    
    // Check Quote Length to determine styling
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    // Set Quote and hide loader if completed
    quoteText.textContent = quote.text;
    completeLoading()
}

// Get Quotes From API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    }
    catch(error){
        console.log(error);
        // Load Loacal Quotes if API fails
        loadLocalQuotes();

    }
}




// Tweeet Quote
function TweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// New Quote
newQuoteBtn.addEventListener('click', async () => { 
    // Get Random Quote from Quotes Array
    getQuotes();
});
twitterBtn.addEventListener('click', async () => {
    TweetQuote();
});

// On Load
getQuotes();