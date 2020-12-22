const form = document.querySelector('#searchForm');
const imagesArea = document.querySelector('#content');
form.addEventListener('submit',async function(e){
   e.preventDefault();
   clearImages();
   const searchTerm =form.elements.query.value;
   await getShows(searchTerm);  
   form.elements.query.value=' ';
});

const getShows = async (query) => {
    const config = {params : {q: query } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`,config);
    makeImages(res.data);
}

const makeImages = (shows) => {
    for(let result of shows){
        if(result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            imagesArea.append(img);
        }
    }
}

const clearImages = () => {
    imagesArea.innerHTML=" ";
}