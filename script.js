
// SMART HIRE - JOB PORTAL

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Chennai",
    salary: "₹3-5 LPA",
    type: "Full Time",
    category: "IT & Software",
    icon: "fa-code",
    description: "Develop responsive websites using HTML, CSS and JavaScript.",
    skills: "HTML, CSS, JavaScript, React"
  },
  {
    id: 2,
    title: "Web Developer Intern",
    company: "Digital World",
    location: "Bangalore",
    salary: "₹12,000/month",
    type: "Internship",
    category: "IT & Software",
    icon: "fa-laptop-code",
    description: "Work on real-world website development projects.",
    skills: "HTML, CSS, JavaScript"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Chennai",
    salary: "₹4-6 LPA",
    type: "Full Time",
    category: "Design",
    icon: "fa-pen-nib",
    description: "Create user-friendly and attractive website interfaces.",
    skills: "Figma, UI Design, UX Research"
  },
  {
    id: 4,
    title: "Digital Marketing Executive",
    company: "Growth Media",
    location: "Hyderabad",
    salary: "₹3-4 LPA",
    type: "Full Time",
    category: "Marketing",
    icon: "fa-chart-line",
    description: "Manage digital marketing campaigns and social media.",
    skills: "SEO, Social Media, Analytics"
  },
  {
    id: 5,
    title: "JavaScript Developer",
    company: "Code Factory",
    location: "Remote",
    salary: "₹5-7 LPA",
    type: "Remote",
    category: "IT & Software",
    icon: "fa-file-code",
    description: "Build interactive web applications with JavaScript.",
    skills: "JavaScript, APIs, HTML, CSS"
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "Data Vision",
    location: "Mumbai",
    salary: "₹4-6 LPA",
    type: "Full Time",
    category: "Finance",
    icon: "fa-chart-pie",
    description: "Analyze business data and prepare useful reports.",
    skills: "Excel, SQL, Data Analysis"
  },
  {
    id: 7,
    title: "Junior Web Designer",
    company: "Pixel Studio",
    location: "Coimbatore",
    salary: "₹2-4 LPA",
    type: "Part Time",
    category: "Design",
    icon: "fa-palette",
    description: "Design creative web pages and landing pages.",
    skills: "HTML, CSS, Photoshop"
  },
  {
    id: 8,
    title: "Software Developer Intern",
    company: "Innovate Tech",
    location: "Chennai",
    salary: "₹15,000/month",
    type: "Internship",
    category: "IT & Software",
    icon: "fa-terminal",
    description: "Assist the software development team in building applications.",
    skills: "JavaScript, Programming, Git"
  }
];

const getData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

let savedJobs = getData("smartHireSaved");
let appliedJobs = getData("smartHireApplied");
let currentTab = "applied";

const jobList = document.getElementById("jobList");
const applicationList = document.getElementById("applicationList");
const modal = document.getElementById("jobModal");
const modalBody = document.getElementById("modalBody");

function storeData() {
  localStorage.setItem("smartHireSaved", JSON.stringify(savedJobs));
  localStorage.setItem("smartHireApplied", JSON.stringify(appliedJobs));
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 2500);
}

// DISPLAY JOBS

function displayJobs(list = jobs) {
  jobList.innerHTML = "";

  document.getElementById("emptyMessage").hidden = list.length > 0;
  document.getElementById("jobCount").textContent = list.length + "+";

  list.forEach(job => {
    const isSaved = savedJobs.includes(job.id);

    const card = document.createElement("article");
    card.className = "job-card";

    card.innerHTML = `
      <div class="job-top">
        <div class="company-icon">
          <i class="fa-solid ${job.icon}"></i>
        </div>
        <button class="save-btn ${isSaved ? "saved" : ""}"
          onclick="toggleSave(${job.id})" aria-label="Save job">
          <i class="fa-${isSaved ? "solid" : "regular"} fa-heart"></i>
        </button>
      </div>

      <h3>${job.title}</h3>
      <p class="company">${job.company}</p>

      <div class="job-meta">
        <span><i class="fa-solid fa-location-dot"></i>${job.location}</span>
        <span><i class="fa-solid fa-money-bill"></i>${job.salary}</span>
      </div>

      <span class="job-tag">${job.type}</span>

      <div class="job-actions">
        <button class="details-btn" onclick="showDetails(${job.id})">
          View Details
        </button>
        <button class="apply-btn" onclick="openApply(${job.id})">
          Apply Now
        </button>
      </div>
    `;

    jobList.appendChild(card);
  });
}

// SEARCH AND FILTER

function filterJobs() {
  const keyword = document.getElementById("filterKeyword")
    .value.toLowerCase().trim();

  const category = document.getElementById("categoryFilter").value;
  const type = document.getElementById("typeFilter").value;
  const location = document.getElementById("location")
    .value.toLowerCase().trim();

  const filtered = jobs.filter(job => {
    const text = `${job.title} ${job.company} ${job.skills}`.toLowerCase();

    return (
      text.includes(keyword) &&
      job.category.includes(category) &&
      job.type.includes(type) &&
      job.location.toLowerCase().includes(location)
    );
  });

  displayJobs(filtered);
}

document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("filterKeyword").value =
    document.getElementById("keyword").value;
  filterJobs();
  document.getElementById("jobs").scrollIntoView();
});

document.getElementById("filterKeyword")
  .addEventListener("input", filterJobs);

document.getElementById("categoryFilter")
  .addEventListener("change", filterJobs);

document.getElementById("typeFilter")
  .addEventListener("change", filterJobs);

document.getElementById("clearFilters").addEventListener("click", () => {
  document.getElementById("filterKeyword").value = "";
  document.getElementById("categoryFilter").value = "";
  document.getElementById("typeFilter").value = "";
  document.getElementById("keyword").value = "";
  document.getElementById("location").value = "";
  displayJobs();
});

// CATEGORY SELECTION

document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById("categoryFilter").value =
      card.dataset.category;
    filterJobs();
    document.getElementById("jobs").scrollIntoView();
  });
});

// SAVE / UNSAVE JOB

function toggleSave(id) {
  if (savedJobs.includes(id)) {
    savedJobs = savedJobs.filter(jobId => jobId !== id);
    showToast("Job removed from saved list");
  } else {
    savedJobs.push(id);
    showToast("Job saved successfully!");
  }

  storeData();
  filterJobs();
  displayApplications();
}

// VIEW JOB DETAILS

function showDetails(id) {
  const job = jobs.find(item => item.id === id);
  if (!job) return;

  modalBody.innerHTML = `
    <span class="job-tag">${job.category}</span>
    <h2>${job.title}</h2>
    <p><strong>Company:</strong> ${job.company}</p>
    <p><strong>Location:</strong> ${job.location}</p>
    <p><strong>Salary:</strong> ${job.salary}</p>
    <p><strong>Job Type:</strong> ${job.type}</p>
    <h3>Job Description</h3>
    <p>${job.description}</p>
    <h3>Required Skills</h3>
    <p>${job.skills}</p>
    <button class="apply-btn" onclick="openApply(${job.id})">
      Apply for this Job
    </button>
  `;

  modal.classList.add("show");
}

// APPLY FOR JOB

function openApply(id) {
  const job = jobs.find(item => item.id === id);
  if (!job) return;

  if (appliedJobs.some(item => item.id === id)) {
    showToast("You have already applied for this job");
    return;
  }

  modalBody.innerHTML = `
    <h2>Apply for ${job.title}</h2>
    <p>Company: ${job.company}</p>

    <form id="applyForm">
      <input type="text" id="applicantName"
        placeholder="Your Full Name" required>

      <input type="email" id="applicantEmail"
        placeholder="Your Email Address" required>

      <input type="tel" id="applicantPhone"
        placeholder="Your Phone Number"
        pattern="[0-9]{10}" maxlength="10" required>

      <textarea id="applicantSkills"
        placeholder="Your Skills" required></textarea>

      <button type="submit">Submit Application</button>
    </form>
  `;

  modal.classList.add("show");

  document.getElementById("applyForm")
    .addEventListener("submit", e => {
      e.preventDefault();

      const application = {
        id: job.id,
        title: job.title,
        company: job.company,
        name: document.getElementById("applicantName").value.trim(),
        email: document.getElementById("applicantEmail").value.trim(),
        phone: document.getElementById("applicantPhone").value.trim(),
        skills: document.getElementById("applicantSkills").value.trim(),
        status: "Application Submitted",
        date: new Date().toLocaleDateString()
      };

      appliedJobs.push(application);
      storeData();

      modal.classList.remove("show");
      displayApplications();

      showToast("Application submitted successfully!");
    });
}

// APPLICATIONS AND SAVED JOBS

function displayApplications() {
  applicationList.innerHTML = "";

  const list = currentTab === "applied"
    ? appliedJobs
    : jobs.filter(job => savedJobs.includes(job.id));

  if (list.length === 0) {
    applicationList.innerHTML =
      `<p class="empty-list">No ${currentTab} jobs yet.</p>`;
    return;
  }

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "application-item";

    const status = currentTab === "applied"
      ? `<p>${item.status} • ${item.date}</p>`
      : `<p>Saved job • ${item.location}</p>`;

    div.innerHTML = `
      <div>
        <h3>${item.title}</h3>
        <p>${item.company}</p>
        ${status}
      </div>
      <button onclick="${
        currentTab === "applied"
          ? `showDetails(${item.id})`
          : `toggleSave(${item.id})`
      }">
        ${currentTab === "applied" ? "View Job" : "Remove"}
      </button>
    `;

    applicationList.appendChild(div);
  });
}

// APPLICATION TABS

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(btn =>
      btn.classList.remove("active")
    );

    tab.classList.add("active");
    currentTab = tab.dataset.tab;
    displayApplications();
  });
});

// CLOSE MODAL

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("show");
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.classList.remove("show");
});

// MOBILE MENU

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("navMenu").classList.toggle("show");
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("show");
  });
});

// INITIALIZE WEBSITE

displayJobs();
displayApplications();
