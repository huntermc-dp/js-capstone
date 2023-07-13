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

  // function renderNames() {
  //   const renderLocation = document.getElementsById("people");
  //   const nameContainer = document.createElement("div");
  //   const studentName = document.createTextNode(`${firstNamesList[0]}`);
  //   renderLocation.appendChild(nameContainer);
  //   nameContainer.appendChild(studentName);
  // }
  // renderNames();

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
