const scrollableDiv = document.getElementById("scrollableDiv");
scrollableDiv.style.overflow = "scroll";
scrollableDiv.style.height = "100vh";
scrollableDiv.style.width = "30vw";

const email = "-enter here-";
const pass = "-enter here-";
const userData = {
  email: email,
  password: pass,
};

async function load() {
  let resObject = [];
  let firstNamesList = [];
  let selectedNames = [];

  async function auth() {
    try {
      const res = await fetch("https://api.devpipeline.org/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const resObject = await res.json();
      const authToken = resObject.auth_info.auth_token;
      return authToken;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async function getAll() {
    try {
      const getAuth = await auth();
      const res = await fetch("https://api.devpipeline.org/users", {
        headers: { auth_token: getAuth },
      });
      const allUsers = await res.json();
      resObject = allUsers.users;
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  await getAll();
  console.log("this is resObj", resObject);

  function firstNames() {
    for (let i = 0; i < resObject.length; i++) {
      firstNamesList.push(
        resObject[i].first_name + " " + resObject[i].last_name.charAt(0)
      );
    }
  }
  firstNames();
  console.log(firstNamesList);

  function renderNames() {
    const renderLocation = document.getElementById("people");
    const nameCounts = {};

    firstNamesList.forEach((i) => {
      const nameContainer = document.createElement("div");
      const studentName = document.createElement("h1");
      const btnOne = document.createElement("button");
      const btnCount = document.createElement("button");
      const btnTwo = document.createElement("button");
      const line = document.createElement("hr");

      studentName.textContent = `${i}`;
      btnOne.textContent = "+";
      btnOne.style.backgroundColor = "yellow";
      btnOne.style.borderColor = "yellow";
      btnOne.style.marginLeft = "36%";
      btnOne.style.borderRadius = "40px";

      btnTwo.textContent = "-";
      btnTwo.style.backgroundColor = " red";
      btnTwo.style.borderColor = "red";
      btnTwo.style.borderRadius = "40px";

      btnCount.textContent = "1";
      btnCount.style.border = " 1px transparent";
      btnCount.style.borderRadius = "40px";

      nameContainer.appendChild(studentName);
      nameContainer.appendChild(btnOne);
      nameContainer.appendChild(btnCount);
      nameContainer.appendChild(btnTwo);
      nameContainer.appendChild(line);
      renderLocation.appendChild(nameContainer);

      btnOne.addEventListener("click", () => {
        firstNamesList.push(i);
        nameCounts[i] = (nameCounts[i] || 1) + 1;
        btnCount.textContent = nameCounts[i].toString();

        console.log(firstNamesList);
      });
      btnTwo.addEventListener("click", () => {
        const index = firstNamesList.indexOf(i);
        nameCounts[i] = (nameCounts[i] || 1) - 1;
        btnCount.textContent = nameCounts[i].toString();
        if (nameCounts[i] > 0) {
          nameCounts[i] = nameCounts[i] - 1;
        }

        if (index !== -1) {
          firstNamesList.splice(index, 1);
        }
        console.log(firstNamesList);
      });
    });
  }
  renderNames();
  console.log(renderNames);

  let button = document.getElementById("random-button");
  button.addEventListener("click", () => {
    blinker();
  });

  function pickRandom() {
    let randomName = Math.floor(Math.random() * firstNamesList.length);
    let result = firstNamesList[randomName];

    let resultLocation = document.getElementById("random-result");
    resultLocation.innerHTML = result;

    const h1Elements = document.querySelectorAll("#people h1");
    h1Elements.forEach((h1) => {
      if (h1.textContent === result) {
        h1.style.backgroundColor = "#0284C7";
        h1.style.color = "white";
      } else {
        h1.style.backgroundColor = "transparent";
        h1.style.color = "black";
      }
    });
  }

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async function blinker() {
    let sleeptime = 60;
    const time = 15;
    for (let i = 0; i < time; i++) {
      const randomPicker = Math.floor(Math.random() * firstNamesList.length);
      const div = document.getElementById("random-result");
      div.innerHTML = firstNamesList[randomPicker];
      sleeptime = sleeptime * 1.1;
      await sleep(sleeptime);
    }
    pickRandom();
  }
}
load();
