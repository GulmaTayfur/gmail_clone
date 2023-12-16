//arayüz işlemlerini yaptığımız ve htmlden aldığımız elemanları çağırdığımız

//! HTML'den çağrılan elemanlar
export const ele = {
  menu: document.querySelector("#menu"),
  nav: document.querySelector("nav"),
  mailsArea: document.querySelector(".mails"),
  modal: document.querySelector(".modal-wrapper"),
  createBtn: document.querySelector(".create"),
  closeBtn: document.querySelector(".close-modal"),
  modalForm: document.querySelector(".modal"),
  searchInp: document.querySelector("form #search"),
};

//! Ekrana maillleri
// mailData: ekrana basılacak olan mailler
//mailData dizisindeki her bir mail için htmldeki bir mail bas
export const renderMails = (mailData) => {
  const mail_html = mailData.map((mail) => {
    return `
    <div class="mail" data-id="${mail.id}">
    <div class="info">
      <input type="checkbox"/>
      <i id="star" class="bi ${mail.isStared ? "bi-star-fill" : "bi-star"}"></i>
      <b> ${mail.sender} </b>
    </div>
    <div class="content">
      <p class="title">${mail.title}</p>
      <p class="desc">${mail.message}</p>
    </div>
    <p class="time">${mail.date}</p>
    <div id="button-wrapper">
    <button id="delete">Sil</button>
    </div>
  </div>`;
  });

  ele.mailsArea.innerHTML = mail_html.join("");
};

//! modalı göster gizle
//aldığı parametre true ise modalı göster false ise gizle
export const toggleModal = (willOpen) => {
  ele.modal.style.display = willOpen === true ? "grid" : "none";
};
