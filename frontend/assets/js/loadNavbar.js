document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then((response) => {
      if (!response.ok) throw new Error("Gagal memuat navbar.html");
      return response.text();
    })
    .then((html) => {
      document.getElementById("navbar-container").innerHTML = html;

      function setActiveNav(id) {
        document.querySelectorAll(".nav-item").forEach((item) => {
          item.classList.remove("active");
        });
        const el = document.getElementById(id);
        if (el) el.classList.add("active");
      }

      const navMap = {
        navHome: "dashboard.html",
        navLocations: "location.html",
        navStatistics: "statistics.html",
        navFeedback: "feedback.html",
        navProfile: "profile.html",
      };

      Object.entries(navMap).forEach(([navId, url]) => {
        const el = document.getElementById(navId);
        if (el) {
          el.addEventListener("click", () => {
            setActiveNav(navId);
            window.location.href = url;
          });
        }
      });

      const page = window.location.pathname.split("/").pop();
      switch (page) {
        case "dashboard.html":
          setActiveNav("navHome");
          break;
        case "location.html":
          setActiveNav("navLocations");
          break;
        case "statistics.html":
          setActiveNav("navStatistics");
          break;

        case "feedback.html":
          setActiveNav("navFeedback");
          break;
        case "profile.html":
          setActiveNav("navProfile");
          break;
        default:
          setActiveNav("navHome");
      }
    })
    .catch((error) => {
      console.error("Error memuat navbar:", error);
    });
});
