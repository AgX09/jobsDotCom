const jobsCardTemplate = document.querySelector("[jobs-template]");
const jobsCardContainer = document.querySelector("[jobs-cards-container]");
const searchInputName = document.querySelector("[data-search-name]");
const searchInputLocation = document.querySelector("[data-search-location]");
const searchInputLocationSimple = document.querySelector("[data-search-location-simple]");
const filterFT = document.getElementById("ft");
const filterPT = document.getElementById("pt");
const clearFilters = document.getElementById("clr")


//search based on title of the jobs
searchInputName.addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();
  listings.forEach((job) => {
    const isVisible = job.name.toLowerCase().includes(value)
    job.element.classList.toggle("hide", !isVisible)
  });
});

//search by using api, is jobs are in same country say India then on entering any Indian state all jobs
//in India will be shown
searchInputLocation.addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();
  console.log("input: ", value)
  listings.forEach((job) => {
    console.log(job.location)
    const isVisible = job.location.toLowerCase().includes(value)
    job.element.classList.toggle("hide", !isVisible)

    StateNames.forEach((state) => {
      if (state.name.toLowerCase().includes(value)) {
        StateNames.forEach((state) => {
          if (state.name.toLowerCase() == job.location.toLowerCase()) {
            console.log("match is ", job.location)
            job.element.classList.remove("hide");
          }
        })
    }
  })
  })

});

//simple location search
// searchInputLocationSimple.addEventListener("input", function (e) {
//   const value = e.target.value.toLowerCase();
//   listings.forEach((job) => {
//     const isVisible = job.location.toLowerCase().includes(value)
//     job.element.classList.toggle("hide", !isVisible)
//   });
// });


//code for filter buttons
filterPT.addEventListener("click", () => {
  listings.forEach((job) => {
    const isVisible = job.nature.toLowerCase() == ("part time");
    job.element.classList.toggle("hide", !isVisible);
    document.getElementById("pt").classList.add("button-clicked");
    document.getElementById("ft").classList.remove("button-clicked");
    document.getElementById("clr").classList.remove("button-clicked");

    console.log("PT clicked")
  });
});


filterFT.addEventListener("click", () => {
  listings.forEach((job) => {
    const isVisible = job.nature.toLowerCase() == ("full time");
    job.element.classList.toggle("hide", !isVisible);
    document.getElementById("ft").classList.add("button-clicked");
    document.getElementById("pt").classList.remove("button-clicked");
    document.getElementById("clr").classList.remove("button-clicked");
    console.log("FT clicked")
  });
});

clearFilters.addEventListener("click", () => {
  listings.forEach((job) => {
    job.element.classList.remove("hide");
    document.getElementById("pt").classList.remove("button-clicked");
    document.getElementById("ft").classList.remove("button-clicked");
    // document.getElementById("clr").classList.add("button-clicked");
    console.log("clear button clicked")
  })
})


let listings = [];
let StateNames = [];


//codes for fetching data from API's
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

var headers = new Headers();
headers.append("X-CSCAPI-KEY", "YTBLNHBHVkdvM2JWUEt2djhzWWZGN2ZZME5QcDZTcGtvblRlUTI2Qw==");

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};


fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
  .then(response => response.json())
  .then(data => {
    StateNames = data.map(state => {
      return { name: state.name }
    });
  })


  //code to add a job pop-up
  //pending








