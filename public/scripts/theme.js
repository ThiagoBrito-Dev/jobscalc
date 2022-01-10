const htmlTag = document.querySelector("html");
const themeSwitcher = document.getElementById("theme-switcher");
const themeIcon = document.getElementById("theme-icon");
const appTheme = localStorage.getItem("jobscalc:appTheme");

if (appTheme) {
  htmlTag.classList.add(appTheme);
  themeSwitcher.classList.add(appTheme);
  themeIcon.src = "/images/moon.svg";
  themeIcon.alt = "Ícone de lua";
}

themeSwitcher.onclick = () => {
  htmlTag.classList.toggle("dark-theme");
  themeSwitcher.classList.toggle("dark-theme");

  if (htmlTag.classList.value.includes("dark-theme")) {
    localStorage.setItem("jobscalc:appTheme", "dark-theme");
    themeIcon.src = "/images/moon.svg";
    themeIcon.alt = "Ícone de lua";
  } else {
    localStorage.setItem("jobscalc:appTheme", "");
    themeIcon.src = "/images/sun.svg";
    themeIcon.alt = "Ícone de sol";
  }
};
