// DOM Elements
const openFormButton = document.getElementById("open-form-button");
const closeFormButton = document.getElementById("close-form-button");
const addPageForm = document.getElementById("add-page-form");
const pageForm = document.getElementById("page-form");
const latestGrid = document.getElementById("latest-grid");
const loadJsonButton = document.getElementById("load-json-button");
const exportJsonButton = document.getElementById("export-json-button");
const clearButton = document.getElementById("clear-button");
const jsonFileInput = document.getElementById("json-file-input");
const formTitle = document.getElementById("form-title");
const paginationContainer = document.getElementById("pagination");
const zoomButton = document.getElementById("zoom-button");
const sortButton = document.getElementById("sort-button");
const saveButton = document.getElementById("save-button");
const overlay = document.getElementById("expanded-overlay");

let pages = [];
let currentEditIndex = null;
let expandedPageId = null;
let expandedScrollPosition = 0;
const imageCache = new Map();
const itemsPerPage = 10;
let currentPage = 1;
let totalPages = 1;
const zoomLevels = [100, 125, 150];
let currentZoomLevelIndex = 0;
const sortOrder = ["🚫", "date", "name", "color"];
let currentSortIndex = 0;
let currentSort = sortOrder[currentSortIndex];
let nextPageId = 1;

// Function to preload images
function preloadImage(url) {
  if (!imageCache.has(url)) {
    const img = new Image();
    img.src = url;
    imageCache.set(url, true);
  }
}

// Load pages from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const storedPages = localStorage.getItem("pages");
  if (storedPages) {
    try {
      pages = JSON.parse(storedPages);
      pages.forEach((page) => {
        if (!page.id) {
          page.id = nextPageId++;
        } else {
          nextPageId = Math.max(nextPageId, page.id + 1);
        }
        if (page.Picture) {
          preloadImage(page.Picture);
        }
      });
      totalPages = Math.ceil(pages.length / itemsPerPage);
      displayPages();
      setupPagination();
    } catch (error) {
      pages = [];
      displayPages();
    }
  } else {
    displayPages();
  }
});

// Event listener for opening the form
if (openFormButton) {
  openFormButton.addEventListener("click", () => {
    showForm();
  });
}

// Function to show the form
function showForm() {
  addPageForm.style.display = "block";
  formTitle.textContent = "Add New Page";
  pageForm.reset();
  currentEditIndex = null;
  addOverlay();
  addPageForm.scrollIntoView({ behavior: "smooth" });
}

// Event listener for closing the form
if (closeFormButton) {
  closeFormButton.addEventListener("click", () => {
    hideForm();
  });
}

// Function to hide the form
function hideForm() {
  addPageForm.style.display = "none";
  pageForm.reset();
  currentEditIndex = null;
  // Only remove overlay if no expanded post is open
  if (expandedPageId === null) {
    removeOverlay();
  }
}

// Event listener for clicking the overlay
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeAllModals();
  }
});

// Function to close both the form and the expanded post
function closeAllModals() {
  // Close the edit form if it's open
  if (addPageForm.style.display === "block") {
    hideForm(false); // We can remove the parameter as it's no longer used
  }
  // Close the expanded post if it's open
  if (expandedPageId !== null) {
    expandedPageId = null;
    displayPages();
    setupPagination();
    window.scrollTo({ top: expandedScrollPosition, behavior: "smooth" });
  }
  // Remove the overlay after closing modals
  removeOverlay();
}

// Event listener for the clear button
if (clearButton) {
  clearButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all configurations?")) {
      localStorage.removeItem("pages");
      pages = [];
      imageCache.clear();
      expandedPageId = null;
      currentPage = 1;
      totalPages = 1;
      displayPages();
      setupPagination();
    }
  });
}

// Event listener for form submission
pageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const picture = document.getElementById("picture").value.trim();
  const bgColor = document.getElementById("bg-color").value;
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const date = document.getElementById("date").value.trim();
  const body = document.getElementById("body").value.trim();

  if (!title || !description || !body) {
    alert("Please fill in all required fields.");
    return;
  }

  if (picture) {
    preloadImage(picture);
  }

  const pageData = {
    id: currentEditIndex !== null ? pages[currentEditIndex].id : nextPageId++,
    Picture: picture,
    BgColor: bgColor,
    Title: title,
    Description: description,
    Date: date || "No Date Provided",
    Body: body
  };

  if (currentEditIndex === null) {
    pages.push(pageData);
  } else {
    pages[currentEditIndex] = pageData;
  }

  localStorage.setItem("pages", JSON.stringify(pages));
  totalPages = Math.ceil(pages.length / itemsPerPage);
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  displayPages();
  setupPagination();

  saveButton.textContent = "✅";
  saveButton.disabled = true;
  setTimeout(() => {
    saveButton.textContent = "💾";
    saveButton.disabled = false;
  }, 2000);
});

// Event listener for loading JSON
if (loadJsonButton) {
  loadJsonButton.addEventListener("click", () => {
    jsonFileInput.click();
  });
}

jsonFileInput.addEventListener("change", handleFileSelect, false);

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) {
    alert("No file selected!");
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const json = JSON.parse(e.target.result);
      if (Array.isArray(json)) {
        const invalidPages = json.filter((page) => !isValidPage(page));
        if (invalidPages.length > 0) {
          alert("Some pages are missing required fields.");
          return;
        }
        pages = json;
        pages.forEach((page) => {
          if (!page.id) {
            page.id = nextPageId++;
          } else {
            nextPageId = Math.max(nextPageId, page.id + 1);
          }
          if (page.Picture) {
            preloadImage(page.Picture);
          }
        });
        localStorage.setItem("pages", JSON.stringify(pages));
        expandedPageId = null;
        currentPage = 1;
        totalPages = Math.ceil(pages.length / itemsPerPage);
        displayPages();
        setupPagination();
      } else {
        alert("Invalid JSON format! Expected an array of pages.");
      }
    } catch (error) {
      alert("Invalid JSON file!");
    }
  };
  reader.readAsText(file);
}

function isValidPage(page) {
  return (
    page.Title && page.Description && page.Body && page.Date && page.BgColor
  );
}

// Event listener for exporting JSON
if (exportJsonButton) {
  exportJsonButton.addEventListener("click", () => {
    if (pages.length === 0) {
      alert("No data to export!");
      return;
    }
    const dataStr = JSON.stringify(pages, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pages.json";
    a.click();
    URL.revokeObjectURL(url);
  });
}

// Function to display pages
function displayPages() {
  latestGrid.innerHTML = "";

  if (pages.length === 0) {
    const noPagesMessage = document.createElement("p");
    noPagesMessage.textContent = "No pages available. Please add a new page.";
    latestGrid.appendChild(noPagesMessage);
    paginationContainer.innerHTML = "";
    return;
  }

  const sortedPages = [...pages].sort((a, b) => {
    if (currentSort === "date") {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      return dateB - dateA;
    } else if (currentSort === "name") {
      return a.Title.localeCompare(b.Title);
    } else if (currentSort === "color") {
      return a.BgColor.localeCompare(b.BgColor);
    }
    return 0;
  });

  if (expandedPageId !== null) {
    const expandedPageIndex = sortedPages.findIndex(
      (page) => page.id === expandedPageId
    );
    if (expandedPageIndex > -1) {
      const pageOfExpandedPage =
        Math.floor(expandedPageIndex / itemsPerPage) + 1;
      currentPage = pageOfExpandedPage;
    }
  }

  totalPages = Math.ceil(sortedPages.length / itemsPerPage);
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sortedPages.length);
  const currentPages = sortedPages.slice(startIndex, endIndex);

  currentPages.forEach((page) => {
    const item = document.createElement("div");
    item.className = "latest-grid-item";
    item.id = `page-${page.id}`;

    if (expandedPageId === page.id) {
      item.classList.add("expanded");
      item.addEventListener("scroll", () => handleCardScroll(item));
    }

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    const title = document.createElement("h2");
    title.textContent = page.Title;
    title.setAttribute("title", page.Title);
    cardHeader.appendChild(title);
    item.appendChild(cardHeader);

    const imgContainer = document.createElement("div");
    imgContainer.className = "image-container";
    imgContainer.style.backgroundColor = page.BgColor || "#FFFF00";
    if (page.Picture) {
      const img = document.createElement("img");
      img.src = page.Picture;
      img.alt = page.Title;
      img.onerror = function () {
        this.style.display = "none";
      };
      imgContainer.appendChild(img);
    }
    item.appendChild(imgContainer);

    const desc = document.createElement("h4");
    desc.className = "description";
    desc.textContent = page.Description;
    item.appendChild(desc);

    const date = document.createElement("h5");
    date.className = "date";
    date.textContent = page.Date || "No Date Provided";
    item.appendChild(date);

    const body = document.createElement("div");
    body.className = "body-content";
    const rawHTML = marked.parse(page.Body);
    body.innerHTML = DOMPurify.sanitize(rawHTML);
    item.appendChild(body);

    const cardActions = document.createElement("div");
    cardActions.className = "card-actions";

    const actualIndex = pages.findIndex((p) => p.id === page.id);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerHTML = "🗑️";
    deleteButton.title = "Delete Page 🗑️";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      deletePage(actualIndex);
    });
    cardActions.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.innerHTML = "✏️";
    editButton.title = "Edit Page ✏️";
    editButton.addEventListener("click", (e) => {
      e.stopPropagation();
      editPage(actualIndex);
    });
    cardActions.appendChild(editButton);

    item.appendChild(cardActions);

    cardHeader.addEventListener("click", () => {
      if (expandedPageId === page.id) {
        expandedPageId = null;
        removeOverlay();
        displayPages();
        setupPagination();
        window.scrollTo({ top: expandedScrollPosition, behavior: "smooth" });
      } else {
        expandedScrollPosition = window.scrollY || window.pageYOffset;
        expandedPageId = page.id;
        addOverlay();
        displayPages();
        setupPagination();

        setTimeout(() => {
          const expandedCard = document.getElementById(`page-${page.id}`);
          if (expandedCard) {
            expandedCard.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest"
            });
          }
        }, 100);
      }
    });

    latestGrid.appendChild(item);
  });
}

// Function to handle card scroll
function handleCardScroll(expandedCard) {
  const isAtBottom =
    expandedCard.scrollHeight - expandedCard.scrollTop <=
    expandedCard.clientHeight + 1;

  expandedCard.style.boxShadow = isAtBottom
    ? "none"
    : "inset 0px -10px 10px -10px rgba(0, 0, 0, 1)";
}

// Function to delete a page
function deletePage(index) {
  if (confirm("Are you sure you want to delete this page?")) {
    const deletedPageId = pages[index].id;
    pages.splice(index, 1);
    localStorage.setItem("pages", JSON.stringify(pages));
    if (expandedPageId === deletedPageId) {
      expandedPageId = null;
    }
    totalPages = Math.ceil(pages.length / itemsPerPage);
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    displayPages();
    setupPagination();
  }
}

// Function to edit a page
function editPage(index) {
  const page = pages[index];
  if (!page) {
    alert("Page not found!");
    return;
  }
  expandedScrollPosition = window.scrollY || window.pageYOffset;
  addPageForm.style.display = "block";
  formTitle.textContent = "Edit Page";
  document.getElementById("picture").value = page.Picture || "";
  document.getElementById("bg-color").value = page.BgColor || "#FFFF00";
  document.getElementById("title").value = page.Title;
  document.getElementById("description").value = page.Description;
  document.getElementById("date").value = page.Date;
  document.getElementById("body").value = page.Body;
  currentEditIndex = index;
  addOverlay();
  addPageForm.scrollIntoView({ behavior: "smooth" });
}

// Function to set up pagination
function setupPagination() {
  paginationContainer.innerHTML = "";
  if (totalPages <= 1) return;

  const prevButton = document.createElement("button");
  prevButton.textContent = "⬅️";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      expandedPageId = null;
      displayPages();
      setupPagination();
      scrollToTop();
    }
  });
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    if (i === currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.addEventListener("click", () => {
      currentPage = i;
      expandedPageId = null;
      displayPages();
      setupPagination();
      scrollToTop();
    });
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "➡️";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      expandedPageId = null;
      displayPages();
      setupPagination();
      scrollToTop();
    }
  });
  paginationContainer.appendChild(nextButton);
}

// Function to scroll to the top
function scrollToTop() {
  latestGrid.scrollIntoView({ behavior: "smooth" });
}

// Event listener for the zoom button
if (zoomButton) {
  zoomButton.addEventListener("click", () => {
    document.body.classList.remove("zoom-100", "zoom-125", "zoom-150");
    currentZoomLevelIndex = (currentZoomLevelIndex + 1) % zoomLevels.length;
    const zoomClass = `zoom-${zoomLevels[currentZoomLevelIndex]}`;
    document.body.classList.add(zoomClass);
  });
}

// Event listener for the sort button
if (sortButton) {
  sortButton.addEventListener("click", () => {
    currentSortIndex = (currentSortIndex + 1) % sortOrder.length;
    currentSort = sortOrder[currentSortIndex];

    let icon = "";
    let titleText = "";

    if (currentSort === "date") {
      icon = "🗓️";
      titleText = "Sort by Date Posted 🗓️";
    } else if (currentSort === "name") {
      icon = "🔡";
      titleText = "Sort by Name 🔡";
    } else if (currentSort === "color") {
      icon = "🎨";
      titleText = "Sort by Color 🎨";
    } else {
      icon = "🚫";
      titleText = "No sorting applied";
    }

    sortButton.innerHTML = icon;
    sortButton.title = titleText;
    expandedPageId = null;
    displayPages();
    setupPagination();
  });
}

// Function to add the overlay
function addOverlay() {
  overlay.style.display = "block";
  overlay.style.pointerEvents = "auto";
  document.body.classList.add("no-scroll");
}

// Function to remove the overlay
function removeOverlay() {
  overlay.style.display = "none";
  overlay.style.pointerEvents = "none";
  document.body.classList.remove("no-scroll");
}
