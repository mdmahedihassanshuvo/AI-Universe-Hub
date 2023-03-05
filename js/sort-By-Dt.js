document.getElementById('sort-btn').addEventListener('click', function loadByDate() {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(res => res.json())
        .then(data => showByDate(data.data.tools))

})
const showByDate = (data) => {
    console.log(data)
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';
    data = data.sort(function (a, b) {
        var dateA = new Date(a.published_in), dateB = new Date(b.published_in)
        return dateA - dateB
    });

    const showAll = document.getElementById('ShowAll')
    if (data.length >= 6) {
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