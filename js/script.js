hide_on_scroll({
  nav_id : 'demo1Navbar',
  hide_onscroll_mobile : true,
  nav_offset : 256,
});



$(document).ready(function(){
  $('.header').height($(window).height());
 
  $(".navbar a").click(function(){
      $("body,html").animate({
          scrollTop:$("#" + $(this).data('value')).offset().top
      },1000)
   
  })
})



const inputSug = document.getElementById('inputSug');
const btnAdd = document.getElementById('btnAdd');
const parentTodo = document.querySelector('.list-group');


let listItem = []

function generateUniqSerial() {  
  return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {  
      const r = Math.floor(Math.random() * 16);  
      return r.toString(16);  
  });  
}

function template_todo(item, checkfn, delfn) {

  const newIdTodo = item?.id

  if (newIdTodo) {

    const listGroup = document.createElement("li")
    listGroup.classList.add("list-group-item", "d-flex", "justify-content-between", "shadow-sm", "mb-2")
    const content = document.createElement("div")
    const checkedEl = document.createElement("input")
    checkedEl.classList.add("form-check-input", "me-1")
    checkedEl.setAttribute("type", "checkbox")
    checkedEl.setAttribute("id", newIdTodo)
  
    const context = document.createElement("label")
    context.classList.add("form-check-label")
    context.setAttribute("for", newIdTodo)
    content.appendChild(checkedEl)
    content.appendChild(context)
  
    if (item?.checked) {
    
      checkedEl.setAttribute("checked", "")
      context.classList.add("text-decoration-line-through")
    }
  
    context.textContent = item?.text || "unknown"
  
    const badge = document.createElement("span")
    badge.classList.add("badge")
    const ibadge = document.createElement("i")
    ibadge.classList.add("fa-solid", "fs-6", "fa-circle-xmark", "text-danger", "hvr-icon", "hvr-buzz-out")
    badge.appendChild(ibadge)
    listGroup.appendChild(content)
    listGroup.appendChild(badge)
  
    const data = {
      group: listGroup,
      checked: checkedEl,
      context
    }

    listGroup.addEventListener("click", () => checkfn(data))
    ibadge.addEventListener("click", () => delfn(data))
  
    return data
  }

  return null
}

const manageLocaleStorage = (action, id, message = "") => {
  switch (action) {
    case 'add':
      listItem.push(
        {
          "id": id,
          "text": (message || "unknown"),
          "checked": false
        }
      );
      break;
    case 'delete':
      listItem = listItem.filter(function (item) {
        return item.id != id
      });
      break;
    case 'checked':
      
      for (let item of listItem) {
        if (item.id == id) { 
          item.checked = true
        }
      }
      break;
      case 'unchecked':
        
        for (let item of listItem) {
          if (item.id == id) {
            item.checked = false
          }
        }
        break;
  }

  localStorage.setItem('Suggestion List', JSON.stringify(listItem));
}


if (localStorage.getItem("Suggestion List")) {
  listItem = JSON.parse(localStorage.getItem("Suggestion List")) || [];
  listItem && listItem.forEach((item) => {

    const todoel = template_todo(item, (data) => {

      const checked = data && data?.checked
      const context = data && data?.context

      if (checked && context) {
        const itemId = checked.getAttribute("id")
        if (itemId) {
          if (!context.classList.contains("text-decoration-line-through")) {
            checked.setAttribute("checked", "")
            context.classList.add("text-decoration-line-through")
            manageLocaleStorage("checked", itemId)
          } else {
            checked.removeAttribute("checked")
            context.classList.remove("text-decoration-line-through")
            manageLocaleStorage("unchecked", itemId)
          }
        }
      }

    }, (data) => {
      const group = data && data?.group;
      const checked = data && data?.checked

      if (group && checked) {
        const itemId = checked.getAttribute("id")

        if (itemId) {
          manageLocaleStorage("delete", itemId)
          group.remove()
        }        
      }
    });

    if (todoel?.group) {
      parentTodo.appendChild(todoel.group)
    }

  });
}

// todolist
btnAdd.addEventListener('click', function () {

  if (inputSug.value != "") {
    item = { 
      "id": "todo-" + generateUniqSerial(),
      "text": inputSug.value,
      "checked": false
    }
  
    manageLocaleStorage("add", item?.id, item?.text)
  
    const todoel = template_todo(item, (data) => {
      const checked = data && data?.checked
      const context = data && data?.context

      if (checked && context) {
        const itemId = checked.getAttribute("id")
        if (itemId) {
          if (!context.classList.contains("text-decoration-line-through")) {
            checked.setAttribute("checked", "")
            context.classList.add("text-decoration-line-through")
            manageLocaleStorage("checked", itemId)
          } else {
            checked.removeAttribute("checked")
            context.classList.remove("text-decoration-line-through")
            manageLocaleStorage("unchecked", itemId)
          }
        }
      }
    }, (data) => {

      const group = data && data?.group;
      const checked = data && data?.checked

      if (group && checked) {
        const itemId = checked.getAttribute("id")
        if (itemId) {
          manageLocaleStorage("delete", itemId)
          group.remove()
        }        
      }
    });

    if (todoel?.group) {
      parentTodo.appendChild(todoel.group)
      inputSug.value = ""
    }
  }
});
  

var getFirstName = document.getElementById('firstName');
var getLastName = document.getElementById('lastName');
var getEmail = document.getElementById('email');
var getMessage = document.getElementById('message');
var btnSubmit = document.getElementById('btn-submit');

btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  var setFirstName = getFirstName.value;
  var setLastName = getLastName.value;
  var setEmail = getEmail.value;
  var setMessage = getMessage.value;

  if (setFirstName == '' && setLastName == '' && setEmail == '' && setMessage == '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Input field can't be empty!"
    });
  } else if (setFirstName == '' || setLastName == '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Name field can't be empty!"
    });
  } else if (setEmail == '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Email field can't be empty!"
    });
  } else if (setMessage == '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Message field can't be empty!"
    });
  } else {
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Message sent successfully',
      showConfirmButton: false,
      timer: 1500
    })
  }
})


$(document).ready(function(){
  $('.header').height($(window).height());
 
  $(".footer a").click(function(){
      $("body,html").animate({
          scrollTop:$("#" + $(this).data('value')).offset().top
      },1000)
   
  })
})