const scrollableDiv = document.getElementById("scrollableDiv");
scrollableDiv.style.overflow = "scroll";
scrollableDiv.style.height = "100vh";
scrollableDiv.style.width = "30vw";

const email = "hunter@devpipeline.com";
const pass = "One2threesf@1";
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

      studentName.textContent = `${i}`;
      btnOne.textContent = "+";
      btnTwo.textContent = "-";
      btnCount.textContent = "1";

      nameContainer.appendChild(studentName);
      studentName.appendChild(btnOne);
      studentName.appendChild(btnCount);
      studentName.appendChild(btnTwo);
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
        if (nameCounts[name] > 0) {
          nameCounts[name] = nameCounts[name] - 1;
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
    pickRandom();
  });

  function pickRandom() {
    let randomName = Math.floor(Math.random() * firstNamesList.length);
    let result = firstNamesList[randomName];

    let resultLocation = document.getElementById("random-result");
    resultLocation.innerHTML = result;
    console.log(result);
  }
}
load();
