function focusNav(elementTag) {
  let navigasi = document.querySelectorAll('.nav-link');

  for (const nav of navigasi) {
    nav.classList.remove('aktif');
  }

  elementTag.classList.add('aktif');
}
