const htmlElement = document.documentElement;
const themeSwitcher = document.getElementById("theme-switcher");
const themeIcon = document.getElementById("theme-icon");
const helpIcons = document.querySelectorAll(".column span img");
const appTheme = localStorage.getItem("jobscalc:appTheme");

if (appTheme) {
  htmlElement.classList.add(appTheme);
  themeSwitcher.classList.add(appTheme);
  themeIcon.src = "/images/moon.svg";
  themeIcon.alt = "Lua. Ilustração";

  helpIcons.forEach((icon) => {
    icon.src = "/images/help-dark.svg";
  });
}

themeSwitcher.onclick = () => {
  htmlElement.classList.toggle("dark-theme");
  themeSwitcher.classList.toggle("dark-theme");

  if (htmlElement.classList.value.includes("dark-theme")) {
    localStorage.setItem("jobscalc:appTheme", "dark-theme");
    themeIcon.src = "/images/moon.svg";
    themeIcon.alt = "Lua. Ilustração";

    helpIcons.forEach((icon) => {
      icon.src = "/images/help-dark.svg";
    });
  } else {
    localStorage.setItem("jobscalc:appTheme", "");
    themeIcon.src = "/images/sun.svg";
    themeIcon.alt = "Sol. Ilustração";

    helpIcons.forEach((icon) => {
      icon.src = "/images/help.svg";
    });
  }
};
