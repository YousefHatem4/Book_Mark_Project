var bookmarkNameInput = document.getElementById('bookmarkName'); // input kolo 
var siteNameInput = document.getElementById('siteName'); // input kolo 
var bookContainer = [];

if (localStorage.getItem('website') !== null) {
    bookContainer = JSON.parse(localStorage.getItem('website'));
    display();
}


var style = document.createElement('style');
style.innerHTML = `
  .close-black {
    color: black !important;
  }
`;
document.head.appendChild(style);
function addWeb() {
  
    if (!bookmarkNameInput.classList.contains('is-valid') || !siteNameInput.classList.contains('is-valid')) {
        Swal.fire({
            html: `
            <div class="d-flex mb-5 mt-3">
            <div class="circle-box-1 mx-1 "></div>
            <div class="circle-box-2 mx-1"></div>
            <div class="circle-box-3 mx-1"></div>
            </div>
            <div class" container">
            <ol class=" list-unstyled d-flex  flex-column">
            <li><p class="fs-5 fw-bold text-start me-auto">Site Name or Url is not valid, Please follow the rules below :</p></li>
            <li class=" my-2 me-auto"><span><i class="fa-regular fa-circle-right text-danger text-bg-white"></i> <span class="fw-bolder"> Site name must contain at least 3 characters</span></span>
            </li>
            <li class="me-auto mt-2">
            <span><i class="fa-regular fa-circle-right text-danger text-bg-white"></i> <span class="fw-bolder"> Site URL must be a valid URL</span></span>
            </li>
            </ol>
            </div>
  `,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
            focusConfirm: false,
        customClass: {
         closeButton: 'close-black'
  }
  
});
        return;
    }

    var website = {
        websiteName: bookmarkNameInput.value,
        linkSite: siteNameInput.value,
    };
    bookContainer.push(website);
    localStorage.setItem('website', JSON.stringify(bookContainer));
    clearForm();
    display();
    bookmarkNameInput.classList.remove('is-valid');
    siteNameInput.classList.remove('is-valid');
}

function clearForm() {
    bookmarkNameInput.value = null;
    siteNameInput.value = null;
}

function display() {
    carton = '';
    for (var i = 0; i < bookContainer.length; i++){
        carton += ` 
            <tr>
                <td>${i+1}</td>
                <td>${bookContainer[i].websiteName}</td>
                <td><a target="_blank" href = "${bookContainer[i].linkSite}"><button class="btn-visit rounded px-3 py-2 border-0 font-family-pt"><i class="fa-solid fa-eye pe-1"></i> Visit</button></a></td>
                <td><button onclick="deleteElement(${i})" class="btn-delete rounded px-3 py-2 border-0 font-family-pt"><i class="fa-solid fa-trash-can"></i>
                Delete</button></td>
            </tr>
        `
    }
    document.getElementById('tableContent').innerHTML = carton;
}

function deleteElement(i) {
   

    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success mx-2",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
    if (result.isConfirmed) {
       bookContainer.splice(i, 1);
    display();
    localStorage.setItem('website', JSON.stringify(bookContainer));
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your imaginary file is safe :)",
      icon: "error"
    });
  }
});
}
function validate(element) {
    var regex = {
        bookmarkName: /^\w{3,}$/gi,
        siteName:/^.{3,}\.com$/gi
        // /^ (ht | f)tp(s?) \: \/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/gmi
    }
    if(regex[element.id].test(element.value)) {
        console.log('match');
        element.classList.remove("is-invalid");
        element.classList.add('is-valid');
        
    }
    else {
        console.log('not');
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
    }

}