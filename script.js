// const searchInput = document.querySelector("[data-search]")

// if(searchInput.addEventListener != null){
// searchInput.addEventListener("input", e => {
//     const value = e.target.value
//     console.log(value)
// })}

// const jobListingTemplate = document.querySelector("[joblisting]")

// let jobs = [];

$(document).ready(function() {
    $('.searchbox').on('input', function() {
      var searchText = $(this).val().toLowerCase();
  
      $('.jobbox').each(function() {
        var cardText = $(this).text().toLowerCase();
        if (cardText.indexOf(searchText) !== -1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
  });

  $(document).ready(function() {
    $('.searchbox').on('input', function(){
      var filter = $(this).val().toLowerCase();
  
      $('.jobbox').each(function() {
        var cardText = $(this).text().toLowerCase();
        if (cardText.indexOf(filter) !== -1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
  });
  
