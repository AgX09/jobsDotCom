const jobsCardTemplate = document.querySelector("[jobs-template]");
const jobsCardContainer = document.querySelector("[jobs-cards-container]");
let searchInputName = document.querySelector("[data-search-name]");
let searchInputLocation = document.querySelector("[data-search-location]");
let filterFT = document.querySelector("[data-search-FT]");
let filterPT = document.querySelector("[data-search-PT]");

searchInputName = addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();
  listings.forEach((job) => {
    const isVisible = job.name.toLowerCase().includes(value);
    job.element.classList.toggle("hide", !isVisible);
  });
});

filterPT = addEventListener("click", function () {
  listings.forEach((job) => {
    const isVisible3 = job.nature.toLowerCase().includes("part time");
    job.element.classList.toggle("hide", !isVisible3);
  });
});

filterFT = addEventListener("click", function () {
  listings.forEach((job) => {
    const isVisible2 = job.nature.toLowerCase().includes("full time");
    job.element.classList.toggle("hide", !isVisible2);
  });
});



searchInputLocation = addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();
  listings.forEach((job) => {
    const isInCountry = job.location.toLowerCase().includes(value);
    job.element.classList.toggle("hide", !isInCountry);
  });
});

let listings = [];
let states = [];

fetch("jobs.json")
  .then((res) => res.json())
  .then((data) => {
    listings = data.map((job) => {
      const card = jobsCardTemplate.content.cloneNode(true).children[0];
      const name = card.querySelector("[data-name]");
      const location = card.querySelector("[data-location]");
      const company = card.querySelector("[data-company]");
      const nature = card.querySelector("[data-nature]");
      const overview = card.querySelector("[data-overview]");
      const requirements = card.querySelector("[data-req]");
      const work = card.querySelector("[data-work]");

      name.textContent = job.name;
      location.textContent = job.location;
      company.textContent = job.company;
      nature.textContent = job.nature;
      overview.textContent = job.overview;
      requirements.textContent = job.requirements;
      work.textContent = job.work;
      jobsCardContainer.append(card);
      return {
        name: job.name,
        location: job.location,
        company: job.company,
        nature: job.nature,
        overview: job.overview,
        requirements: job.requirements,
        work: job.work,
        element: card,
      };
    });
  });

// var headers = new Headers();
// headers.append("X-CSCAPI-KEY", "YTBLNHBHVkdvM2JWUEt2djhzWWZGN2ZZME5QcDZTcGtvblRlUTI2Qw==");

// var requestOptions = {
//   method: 'GET',
//   headers: headers,
//   redirect: 'follow'
// };

// // Pass Country Code -- Eg: Country Code : IN
// fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
// .then(res => res.json())
// .then(result => console.log(result))
// .then(data => {
//   states = data.forEach(loc => {
//     return{state: loc.name}
//   })
// })
