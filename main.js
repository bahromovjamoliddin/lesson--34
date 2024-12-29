let limit = 10;
let skip = 0;
let isLoading = false;

const selectList = document.querySelector(".select__list");
const loadingText = document.querySelector(".loading-list");

async function fetchUsers() {
    isLoading = true;
    loadingText.style.display = "flex";
      const { data } = await axios.get(
     `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
    );
    loadingText.style.display = "none";
    const list = data.users;

    if (list.length == 0) {
        return;
    }
     
    for (const el of list) {
        const div = document.createElement("div");
        div.className = "select-item ";
        div.innerText = `${el.id}-${el.firstName}-${el.lastName}`;
        selectList.append(div);
    }

    skip += limit;
    isLoading = false;
}

(() => {
    fetchUsers();
})();

selectList.addEventListener("scroll", async (event) => {
    const scroll =
        selectList.scrollHeight - selectList.clientHeight - selectList.scrollTop;
    if (scroll < 30) {
        if (isLoading === false) {
            await fetchUsers();
        }
    }
});
