import { ele, renderMails, toggleModal } from "./scripts/ui.js";
import { getDate } from "./scripts/helpers.js";

// * local storege'dan verileri al ve obje formatına çevir
//projede mail verisi olrak hep bunu kullan
//diziyi güncelleğinde locla storege ıda günceller
const strMail = localStorage.getItem("mails") || [];
let mailData = JSON.parse(strMail);

//1) navbar için açılma ve kapanma özelliği
//hamburger iconuna tıklanma olayını izle
//tıklanınca nav menüsünden hide class'ı ekle
//zaten kapalıyken tıklanırsa hide class'ını kaldır.
ele.menu.addEventListener("click", () => {
  ele.nav.classList.toggle("hide");
});

//2) listeleme özelliği
//kullanıcı projeye girme anında mailleri listele
document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailData);

  if (window.innerWidth < 1200) {
    ele.nav.classList.add("hide");
  }
});
// 3) Modal açma kapama özelliği
//oluştur butonuna tıklanınca modal'ı göster (display grid)
// x butonuna veya dışarıya basınca modal'ı kapat (display none)
ele.createBtn.addEventListener("click", () => toggleModal(true));
ele.closeBtn.addEventListener("click", () => toggleModal(false));

ele.modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-wrapper")) {
    toggleModal(false);
  }
});

//4) Mail atma ozelliği
//açılan modaldaki formun gönderilme olayını izleyeceğiz
//eğer bütün inputlar doluysa yeni mail oluştur
//değilse kullanıcıya uyarı ver

ele.modalForm.addEventListener("submit", (e) => {
  //sayfayı yenilemeyi engelle
  e.preventDefault();

  //formdaki inputların verilerine erişmek
  const receiver = e.target[1].value;
  const title = e.target[2].value;
  const message = e.target[3].value;

  // eğerki inputlar boşsa uyarı gönder
  if (!receiver || !title || !message) {
    alert("Lütfen bütün alanları doldurun.");
  } else {
    //diziye eklemek için mail objesi oluştur
    const newMail = {
      id: new Date().getTime(),
      sender: "Gülma",
      receiver: receiver,
      title: title,
      message: message,
      date: getDate(),
    };

    //yeni mailler dizisine ekledik
    mailData.unshift(newMail);

    //mailler dizinin son halini local storege kaydettik
    localStorage.setItem("mails", JSON.stringify(mailData));

    //mailler dizinin son halini ekrana bastık
    renderMails(mailData);

    toggleModal(false);
  }
});

// 5) Mail silme özelliği

const handleClick = (e) => {
  const mail = e.target.closest(".mail");
  const mailId = mail.dataset.id;
  //tıklanan elemanın ıdsi delete ise maili sil
  if (
    e.target.id === "delete" &&
    confirm("Silmek istediğinizden emin misiniz?")
  ) {
    //ıdisi sileceğimiz elemana eşit olmayan elemanları filtrele
    mailData = mailData.filter((mail) => mail.id !== Number(mailId));

    //loakli güncelle
    localStorage.setItem("mails", JSON.stringify(mailData));
    //maili htmlden kaldırma için
    mail.remove();
  }

  //tıklanan eleman yıldız ise mailli likla
  if (e.target.id === "star") {
    //1)idsini bildiğimiz mailin bütün bilgilerini al.
    const found = mailData.find((item) => item.id === Number(mailId));
    //2)mailin yıldızlı değerini tersine çevir.
    found.isStared = !found.isStared;
    //3)local storageı
    localStorage.setItem("mails", JSON.stringify(mailData));
    //4) arayüzü güncelle
    renderMails(mailData);
  }
};

ele.mailsArea.addEventListener("click", handleClick);

// 6) Navigasyon menüsü aktifliği

ele.nav.addEventListener("click", (e) => {
  if (e.target.id === "cat2") {
    const filtred = mailData.filter((mail) => mail.isStared === true);
    renderMails(filtred);
  } else {
    renderMails(mailData);
  }
});

//7) arama ozelliği

let timer;

ele.searchInp.addEventListener("input", (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => searchMail(e), 1000);
});

function searchMail(e) {
  const query = e.target.value;
  console.log("filtreleme yapıldı", query);

  const filtred = mailData.filter((mail) =>
    Object.values(mail)
      .slice(1, 6)
      .some((value) => value.toLowerCase().includes(query))
  );

  if (filtred.length === 0) {
    ele.mailsArea.innerHTML =
      '<div class="warn">Arattığınız terime uygun mail bulunamadı</div>';
  } else {
    renderMails(filtred);
  }
}
