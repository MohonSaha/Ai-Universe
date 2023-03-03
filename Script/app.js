const showMoreBtn = document.getElementById('show-more').classList.add('d-none');

const fetchData = () => {
    document.getElementById('spinner-container').classList.remove('d-none')
    const URL = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            const showMoreBtn = document.getElementById('show-more').classList.remove('d-none');
            document.getElementById('spinner-container').classList.add('d-none')
            displayFetchData(data.data.tools.slice(0, 6))
        })
};


const displayFetchData = (data) => {

    const cardParent = document.getElementById('card-container');
    cardParent.innerHTML = '';
    data.forEach(singleData => {
        const { image, features, name, published_in, id } = singleData;
        const btnContainer = document.getElementById('btn-container');
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


const fetchShowDetails = (id) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => displayShowDetails(data.data))
}


const displayShowDetails = (data) => {
    console.log(data);
    const { input_output_examples, image_link, description, pricing, features, integrations, accuracy } = data;
    // const accuracyPercent = accuracy.score * 100;
    // console.log(input_output_examples[0].output.length);
    const modalImg = document.getElementById('modal-img');
    const modalText = document.getElementById('modal-text');
    modalText.innerHTML = `
                    <div class='modal-text-container'>
                        <h4>${description}</h4>

                        <div class= 'price-container'>
                            <div class = 'basic-price price-div'>
                            <p>${pricing ? pricing[0].price : 'Free of Cost'}</p>
                            <p>${pricing ? pricing[0].plan : 'Basic'}</p>
                            </div>

                            <div class = 'pro-price price-div'>
                                <p>${pricing ? pricing[1].price : 'Free of Cost'}</p>
                                <p>${pricing ? pricing[0].plan : 'Pro'}</p>
                            </div>
                            <div class = 'enterprise-price price-div'>
                                <p>${pricing ? pricing[2].price : 'Free of Cost'}</p>
                                <p>${pricing ? pricing[2].plan : 'Enterprise'}</p>
                            </div>
                        </div>

                        <div class = 'features-container'>
                            <div class="row">
                                <div class="col-md-6">
                                    <h4>Features</h4>
                                    <ul>
                                        <li>${features[1].feature_name}</li>
                                        <li>${features[2].feature_name}</li>
                                         <li>${features[3].feature_name}</li>
                                    </ul>
                                </div>
                            
                                <div class="col-md-6">
                                    <h4>Integrations</h4>
                                    <ul>
                                        <li>${integrations ? integrations[0] ? integrations[0] : "No data found" : "No data found"}</li>
                                        <li>${integrations ? integrations[1] ? integrations[1] : "No data found" : "No data found"}</li>
                                         <li>${integrations ? integrations[2] ? integrations[2] : "No data found" : "No data found"}</li>
                                    </ul>
                                </div>
                            </div>                            
                        </div>
                    </div>
    `;


    modalImg.innerHTML = `
                    <div class = 'modal-img-container position-relative'>                   
                    <img class='modal-img pe-2' src="${image_link[0]}" alt="">
                    <span class="badge text-bg-danger p-2"></span>
                    <div class = 'text-center mt-4 pe-3'>
                    <h4>${input_output_examples ? input_output_examples[0].input : "Can you give any example?"}</h4>
                    <p class = 'px-4 text-secondary'>${input_output_examples ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
                    </div>
                    </div>
    `;
}








// Show all button to show all data in UI
const showAllData = () => {
    const URL = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            displayFetchData(data.data.tools)
        })
    const showMoreBtn = document.getElementById('show-more');
    showMoreBtn.classList.add('d-none');
}



const sortByDate = () => {

    const URL = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            displayFetchDataBySort(data.data.tools.slice(0, 6))
        })

    const displayFetchDataBySort = (data) => {
        // Data sorting function 
        customSort = (a, b) => {
            const dateA = new Date(a.published_in);
            const dateB = new Date(b.published_in);
            if (dateA > dateB) return 1;
            else if (dateA < dateB) return -1;
            return 0;
        };
        const sortedData = data.sort(customSort);;

        const cardParent = document.getElementById('card-container');
        cardParent.innerHTML = '';
        sortedData.forEach(singleData => {
            const { image, features, name, published_in, id } = singleData;
            const btnContainer = document.getElementById('btn-container');
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
}





fetchData();