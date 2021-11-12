const htmlTag = document.querySelector("html");
const themeSwitcher = document.getElementById("theme-switcher");
const appTheme = localStorage.getItem("jobscalc:appTheme");

if (appTheme) {
  htmlTag.classList.add(appTheme);
  themeSwitcher.classList.add(appTheme);
}

themeSwitcher.onclick = () => {
  htmlTag.classList.toggle("dark-theme");
  themeSwitcher.classList.toggle("dark-theme");

  htmlTag.classList.value.includes("dark-theme")
    ? localStorage.setItem("jobscalc:appTheme", "dark-theme")
    : localStorage.setItem("jobscalc:appTheme", "");
};
