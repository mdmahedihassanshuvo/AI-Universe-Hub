const loadData = async (dataLimit) => {
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tools`
        const res = await fetch(url)
        const data = await res.json()
        displayData(data.data.tools, dataLimit)
    }
    catch (error) {
        console.log(error);
    }
}

const displayData = (data, dataLimit) => {

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';

    const showAll = document.getElementById('ShowAll')
    if (dataLimit && data.length >= 6) {
        data = data.slice(0, 6)
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    data.forEach(element => {
        // console.log(element);
        const card = document.createElement('div')
        card.classList.add('col')
        card.innerHTML = `
        <div class="card h-100">
                    <img src="${element.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Features</h5>
                      <ol>
                        <li>Natural language processing</li>
                        <li>Contextual understanding</li>
                        <li>Text generation</li>
                      </ol>
                      <hr>
                      <div class="d-flex justify-content-between align-items-center">
                      <div>
                      <h3>${element.name}</h3>
                      <p><i class="fa-solid fa-calendar-days"></i> ${element.published_in}</p>
                      </div>
                      <div>
                      <!-- Button trigger modal -->
                      <button onclick="showDetails('${element.id}')" class="float-end btn btn-success rounded-pill" data-bs-toggle="modal" data-bs-target="#modal-Id"><i class="fa-solid fa-arrow-right"></i></button></div>
                      </div>
                    </div>
                  </div>
        `
        cardContainer.appendChild(card)

    });

    loadSpinner(false)
}

loadData(6)

const showDetails = async (id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
        const res = await fetch(url)
        const data = await res.json()
        modalBody(data.data)
    }
    catch (error) {
        console.log(error)
    }
}

const modalBody = data => {
    console.log(data)
    const modalBodyInner = document.getElementById('modal-body')
    modalBodyInner.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4">
                                <div class="col">
                                    <div class="card h-100">
                                        <div class="card-body rounded" style="min-height:390px">
                                            <p class="card-text">${data.description}</p>
                                            <div class="d-flex gap-3">
                                            <button class="border-0 p-2 text-success rounded">${data.pricing ? data.pricing[0].price : 'Free of Cost/'}<br>${data.pricing ? data.pricing[0].plan : 'Basic'}</button>
                                            <button class="border-0 p-2 text-warning rounded">${data.pricing ? data.pricing[1].price : 'Free of Cost/'}<br>${data.pricing ? data.pricing[1].plan : 'pro'}</button>
                                            <button class="border-0 p-2 text-danger rounded">${data.pricing ? data.pricing[2].price : 'Free of Cost/'}<br>${data.pricing ? data.pricing[2].plan : 'Enterprise'}</button>
                                            </div>

                                            <div class="d-flex gap-3 mt-3">

                                            <div>
                                            <h4>Features</h4>
                                            <div>
                                            <ol>
                                            <li>${data.features['1']['feature_name']}</li>
                                            <li>${data.features['2']['feature_name']}</li>
                                            <li>${data.features['3']['feature_name']}</li>
                                            </ol>
                                            </div>
                                            </div>
                                            <div>
                                            <h4>Integrations</h4>
                                            <ul>
                                            <li>${data.integrations ? data.integrations[0] : 'No data Found'}</li>
                                            <li>${data.integrations ? data.integrations[1] : 'No data Found'}</li>
                                            <li>${data.integrations ? data.integrations[2] : 'No data Found'}</li>
                                            </ul>
                                            </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col">
                                    <div style="position: absolute" class="card">
                                        <img src="${data.image_link[0]}" class="card-img-top img-fluid" alt="...">
                                        <div style="position: absolute; z-index:1; left: 250px; top:20px">
                                        ${data.accuracy.score ? `<span class="btn btn-danger">${data.accuracy.score}%accuracy</span>` : " "}
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">${data.input_output_examples ? data.input_output_examples[0].input : 'No! Not Yet! Take a break!!!'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
    `
}

const loadSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner')
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}


document.getElementById('ShowAll').addEventListener('click', function () {
    loadSpinner(true)
    loadData()
})

