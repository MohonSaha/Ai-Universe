const showMoreBtn = document.getElementById('show-more').classList.add('d-none');

const fetchData = () => {
    const URL = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            const showMoreBtn = document.getElementById('show-more').classList.remove('d-none');
            displayFetchData(data.data.tools.slice(0, 6))
        })
};

const displayFetchData = (data) => {
    const cardParent = document.getElementById('card-container');
    cardParent.innerHTML = '';
    data.forEach(singleData => {
        const { image, features, name, published_in, id} = singleData;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
                <div class="card h-100 p-3">
                    <img src="${image}" class="card-img-top rounded card-img" alt="">
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <p class="card-text">
                        <ol>
                            <li>${features[0] ? features[0] : 'Not available'}</li>
                            <li>${features[1] ? features[1] : 'Not available'}</li>
                            <li>${features[2] ? features[2] : 'Not available'}</li>
                        </ol>

                        <hr class = 'mb-4'> 
                            <div class='d-flex align-items-center justify-content-between'>
                                <div>
                                    <h5 class="card-title">${name}</h5>
                                    <div class='date-container d-flex align-items-center'> 
                                         <i class="fa-solid fa-calendar-days me-2"></i>
                                        <p class='publish-date'>${published_in}</p>
                                    </div>
                                </div>
                                <i onclick="fetchShowDetails('${id}')" class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#aiPage"></i>
                            </div>
                            </p>
                    </div>
                </div>
        `;
        cardParent.appendChild(cardDiv);

    });
}


const fetchShowDetails = (id) =>{
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(URL)
    .then(res => res.json())
    .then(data => displayShowDetails(data.data))
}


const displayShowDetails = (data) =>{
    console.log(data.input_output_examples);
    const {input_output_examples, image_link} = data;
    const modalImg = document.getElementById('modal-img');
    const modalText = document.getElementById('modal-text');
    modalImg.innerHTML = `
                    <img class='modal-img' src="${image_link[0]}" alt="">
                    <div class = 'accuracy-container text-center mt-4 pe-3'>
                    <h4>${input_output_examples[0].input}</h4>
                    <p class = 'px-4 text-secondary'>${input_output_examples[0].output}</p>
                    </div>
    `;
}








// Show all button to show all data in UI
const showAllData = () =>{
    const URL = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            displayFetchData(data.data.tools)
        })
    const showMoreBtn = document.getElementById('show-more');
    showMoreBtn.classList.add('d-none');
}

fetchData();