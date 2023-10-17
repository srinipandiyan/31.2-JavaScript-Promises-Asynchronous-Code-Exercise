// 1. Make a GET request to the Cards API for a single card from a shuffled deck
$.getJSON(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`).then(data => {
    const deckId = data.deck_id;
    return $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
}).then(resp => {
    console.log(`${resp.cards[0]['value']} of ${resp.cards[0]['suit']}`)
}).catch(error => {
    console.error(error);
});


//2. Make a GET request to the Cards API for a single card from a shuffled deck and the another card from the same deck
let firstCard = null;
$.getJSON(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`).then(data => {
    const deckId = data.deck_id;
    return $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
}).then(data => {
    const deckId = data.deck_id
    firstCard = `${data.cards[0]['value'].toLowerCase()} of ${data.cards[0]['suit'].toLowerCase()}`
    return $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
}).then(data => {
    const deckId = data.deck_id
    let secondCard = `${data.cards[0]['value'].toLowerCase()} of ${data.cards[0]['suit'].toLowerCase()}`
    console.log(`${firstCard} and ${secondCard}`)
    return $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
}).catch(error => {
    console.error(error);
});

//3. Create an HTML page to draw cards from deck with a button
let deckID = null;
let $btn = $('button');
let $cardArea = $('#card-area');

$.getJSON(`https://deckofcardsapi.com/api/deck/new/shuffle/`).then(data =>{
    deckID = data.deck_id;
    $btn.show();
});

$btn.on('click', function() {
    //get cards from deck with each click
    $.getJSON(`https://deckofcardsapi.com/api/deck/${deckID}/draw/`).then(data => {
    //when cards run out, prevent user from requesting anymore cards from same deck
     if (data.remaining == 0) $btn.remove();
    //Grab card image and card text
    let cardSrc = data.cards[0].image;
    let cardAlt = `${data.cards[0]['value'].toLowerCase()} of ${data.cards[0]['suit'].toLowerCase()}`
        //append card to card area
        $cardArea.append(
            $('<img>', 
            { src: cardSrc, 
                alt: cardAlt 
            })
        );
    });
});