const baseUrl = "https://api.shrtco.de/v2/";

const fetchDataApi = async (endpoint) => {
  const finalUrl = `${baseUrl}${endpoint}`;
  let res = await fetch(finalUrl);
  res = await res.json();
  return res.result;
};

// TARGET ELEMENT
const shortenBtn = document.getElementById("btn-shorten");
const inputUrl = document.getElementById("long-url-input");
const resultWrapper = document.querySelector(".wrapper_result");

// Submit a long url
const subtmitUrl = async (e) => {
  try {
    const value = inputUrl.value;
    shortenBtn.innerHTML = "Loading";
    const res = await fetchDataApi("shorten?url=" + value);
    displayResult(res.short_link3, value);
  } catch (e) {
    throw new Error(e.message);
  } finally {
    inputUrl.value = "";
    shortenBtn.innerHTML = "Shorten it !";
  }
};

shortenBtn.addEventListener("click", subtmitUrl);

const copyUrl = (url) => {
  const copyBtn = document.getElementById("copy-btn");
  copyBtn.innerHTML = "Copied !";
  copyBtn.style.backgroundColor = "hsl(257, 27%, 26%)";
  const elementTemp = document.createElement("textarea");
  elementTemp.value = url;
  document.body.appendChild(elementTemp);

  elementTemp.select();
  document.execCommand("copy");

  document.body.removeChild(elementTemp);
};

const displayResult = (shortUrl, longUrl) => {
  const div = document.createElement("div");
  div.classList.add("result-shorten");

  const content = `
      <div class="long-url">
        <p>${longUrl}</p>
      </div>

      <div class="short-url">
        <p>${shortUrl}</p>
        <button id="copy-btn" class="btn-secondary">
          Copy
        </button>
      </div>
  `;
  div.innerHTML = content;
  resultWrapper.appendChild(div);

  const copyBtn = div.querySelector("#copy-btn");
  copyBtn.addEventListener("click", () => {
    copyUrl(shortUrl);
  });

  localStorage.setItem("displayResult", resultWrapper.innerHTML);
};

const storedResult = localStorage.getItem("displayResult");
if (storedResult) {
  resultWrapper.innerHTML = storedResult;
}
