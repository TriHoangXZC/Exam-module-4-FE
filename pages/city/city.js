function getAllCity() {
    let contentHeaderTitle1 = `City List`;
    let contentHeader = `City Management`;
    let contentMain = `City Management`;
    $('#content-header-title1').html(contentHeaderTitle1);
    $('#content-header').html(contentHeader);
    $('#content-main').html(contentMain);
    let cityTitleContent = `<tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Country</th>
                                        <th colspan="2">Action</th>
                                    </tr>`;
    $('#city-title-content').html(cityTitleContent);
    let button = `<button type="button" class="btn btn-primary" data-toggle="modal"
                                                                     data-target="#create-city" onclick="showCreateCity()">
                                    <i class="fa-solid fa-plus"></i>
                                </button>`;
    $('#card-title-button').html(button);
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/cities',
        success: function (cities) {
            let content = '';
            for (let i = 0; i < cities.length; i++) {
                content += `<tr>
        <td>${i + 1}</td>
        <td><a href="#" onclick="showCityDetail(${cities[i].id})" id="city-name">${cities[i].name}</a></td>
        <td>${cities[i].country == null ? '' : cities[i].country.name}</td>  
        <td><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#create-city" onclick="showEditCity(${cities[i].id})"
        ><i class="fa fa-edit"></i></button></td>
        <td><button class="btn btn-danger" type="button" data-toggle="modal" data-target="#delete-city" onclick="showDeleteCity(${cities[i].id})"
        ><i class="fa fa-trash"></i></button></td>
    </tr>`
            }
            $('#city-content').html(content);
        }
    })
}

function showCityDetail(id) {
    let cityTitleContent = `<tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">Area</th>
                                        <th scope="col">Population</th>
                                        <th scope="col">Description</th>
                                        <th colspan="2">Action</th>
                                        
                                    </tr>`;
    $('#city-title-content').html(cityTitleContent);
    let button = `<button type="button" class="btn btn-primary" 
                                                                     onclick="getAllCountry()">
                                    List Country
                                </button>`;
    $('#card-title-button').html(button);
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/cities/${id}`,
        success: function (city) {
            let content = `<tr>
        <td>${city.id}</td>
        <td>${city.name}</td>
        <td>${city.country == null ? '' : city.country.name}</td>
        <td>${city.area}</td>
        <td>${city.population}</td>
        <td>${city.description}</td>   
        <td><button class="btn btn-primary" type="button" data-toggle="modal" data-target="#create-city" onclick="showEditCity(${city.id})"
        ><i class="fa fa-edit"></i></button></td>
        <td><button class="btn btn-danger" type="button" data-toggle="modal" data-target="#delete-city" onclick="showDeleteCity(${city.id})"
        ><i class="fa fa-trash"></i></button></td>
    </tr>`
            $('#city-content').html(content);
        }
    })
}

function getAllCountry() {
    let contentHeaderTitle1 = `Country List`;
    let contentHeader = `Country Management`;
    let contentMain = `Country Management`;
    $('#content-header-title1').html(contentHeaderTitle1);
    $('#content-header').html(contentHeader);
    $('#content-main').html(contentMain);
    let cityTitleContent = `<tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                      
                                    </tr>`;
    $('#city-title-content').html(cityTitleContent);
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/countries`,
        success: function (countries) {
            let content = '';
            for (let i = 0; i < countries.length; i++) {
                content += `<tr>
<td>${i + 1}</td>
<td>${countries[i].name}</td>
</tr>`
            }
            $('#city-content').html(content);
        }
    })
}

function showCreateCity() {
    let title = 'Create city';
    let footer = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="createCity()"
                        aria-label="Close" class="close" data-dismiss="modal">Create
                </button>`;
    $('#create-city-title').html(title);
    $('#create-city-footer').html(footer);
    $('#name').val(null);
    $('#country').val(null);
    $('#area').val(null);
    $('#population').val(null);
    $('#description').val(null);
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/countries',
        success: function (countries) {
            let content = `<option>Chose country</option>`;
            for (let country of countries) {
                content += `<option value="${country.id}">${country.name}</option>`
            }
            $('#country').html(content);
        }
    })
}

function createCity() {
    let name = $('#name').val();
    let country = $('#country').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let description = $('#description').val();
    let city = {
        name: name,
        country: {
            id: country
        },
        area: area,
        population: population,
        description: description
    }
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/cities`,
        data: JSON.stringify(city),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            getAllCity();
        }
    })
}

function showEditCity(id) {
    $('#name').val(null);
    $('#country').val(null);
    $('#area').val(null);
    $('#population').val(null);
    $('#description').val(null);
    let title = 'Edit city';
    let footer = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="editCity(${id})"
                        aria-label="Close" class="close" data-dismiss="modal">Edit
                </button>`;
    $('#create-city-title').html(title);
    $('#create-city-footer').html(footer);
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/cities/${id}`,
        success: function (city) {
            $('#name').val(city.name);
            $('#country').val(city.country.id);
            $('#area').val(city.area);
            $('#population').val(city.population);
            $('#description').val(city.description);
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/countries',
                success: function (countries) {
                    let content = '';
                    for (let i = 0; i < countries.length; i++) {
                        if (city.country.id === countries[i].id) {
                            content += `<option value="${countries[i].id}" selected>${countries[i].name}</option>`
                        } else {
                            content += `<option value="${countries[i].id}" >${countries[i].name}</option>`
                        }
                    }
                    $('#country').html(content);
                }
            })
        }
    })
}

function editCity(id) {
    let name = $('#name').val();
    let country = $('#country').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let description = $('#description').val();
    let city = {
        name: name,
        country: {
            id: country
        },
        area: area,
        population: population,
        description: description
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/cities/${id}`,
        data: JSON.stringify(city),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            getAllCity();
        }
    })
}

function showDeleteCity(id) {
    let footer = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="deleteCity(${id})"
                        aria-label="Close" class="close" data-dismiss="modal">Delete
                </button>`;
    $('#footer-city').html(footer);
}

function deleteCity(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/cities/${id}`,
        success: function () {
            getAllCity();
        }
    })
}

$(document).ready(function () {
    getAllCity();
})
