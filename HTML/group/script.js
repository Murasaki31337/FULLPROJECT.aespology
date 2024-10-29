
const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
    document.getElementById("theme-switcher").checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    document.getElementById("theme-switcher").checked = false;
  }

  function toggleTheme() {
    if (document.getElementById("theme-switcher").checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }

function toggleBio(bioId, button) {
    const bioDetails = document.getElementById(bioId);
    
    bioDetails.classList.toggle('expanded');
    
    button.classList.toggle('expanded');
}


document.addEventListener('keydown', function (event) {
    const members = document.querySelectorAll('.member');
    const currentIndex = Array.from(members).indexOf(document.activeElement);

    if (event.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % members.length;
        members[nextIndex].focus();
        members[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + members.length) % members.length;
        members[prevIndex].focus();
        members[prevIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        event.preventDefault();
    }
});
