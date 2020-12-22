fetch('http://api.tvmaze.com/search/shows?q=GOT')
    .then(res => {
        console.log("Ovo se pozove čim se npr. nešto vrati, ali ne mora značiti da je skroz završeno.");
        return res.json();  //S ovim čekamo da dobijemo i data full, da možemo dalje raditi s tim
    })
    .then(data => {
        console.log("Sada imamo i tražene podatke.");
        console.log(data);
    })
    .catch(err => {
        console.log("Došlo do greške!", err);
    })


const fetchBitcoin = async () => {
    try{
        const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
        const data = await res.json();
        console.log(data.ticker.price);
    }catch(err) {
        console.log(err);
    }
    
}