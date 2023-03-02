

const fetchData = () => {
    const URL = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(URL)
    .then(res => res.json())
    .then(data => displayFetchData(data.data.tools))
}

const displayFetchData = (data) =>{
    const cardParent = document.getElementById('card-container');
    data.forEach(singleData => {
        console.log(singleData);
        const {image, features, name} = singleData;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <p class="card-text">
                        <ol>
                            <li>${features[0]}</li>
                            <li>${features[1]}</li>
                            <li>${features[2]}</li>
                        </ol>

                        <hr> 
                        <h5 class="card-title">${name}</h5>
                        </p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
        `;
        cardParent.appendChild(cardDiv);

    });
}



fetchData();