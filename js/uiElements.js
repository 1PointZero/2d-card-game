export async function loadUiElements() {
  const aPromise = [loadFooter()];
  await Promise.all(aPromise);
}

async function loadFooter() {
  const response = await fetch("../pages/footer.html");
  const footerHTML = await response.text();
  document.getElementById("footer-container").innerHTML = footerHTML;
  updateFooterVisibility();
}

function updateFooterVisibility() {
  const footer = document.querySelector("footer");
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;

  if (documentHeight > windowHeight) {
    if (scrollTop + windowHeight >= documentHeight - 5) {
      footer.style.opacity = "1";
    } else {
      footer.style.opacity = "0";
    }
  } else {
    footer.style.opacity = "1";
  }
}

window.addEventListener("scroll", updateFooterVisibility);
window.addEventListener("resize", updateFooterVisibility);
