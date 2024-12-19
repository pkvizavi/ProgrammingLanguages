document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("password-form");
    const passwordList = document.getElementById("passwords");
    const generateButton = document.getElementById("generate-password");

    const loadPasswords = () => {
        const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
        passwordList.innerHTML = passwords
            .map(
                (entry, index) =>
                    `<li>
                        <strong>${entry.url}</strong> (${entry.login}): 
                        <span>${entry.password}</span>
                        <button onclick="deletePassword(${index})">Удалить</button>
                    </li>`
            )
            .join("");
    };

    const savePassword = (url, login, password) => {
        const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
        passwords.push({ url, login, password });
        localStorage.setItem("passwords", JSON.stringify(passwords));
        loadPasswords();
    };

    const deletePassword = (index) => {
        const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
        passwords.splice(index, 1);
        localStorage.setItem("passwords", JSON.stringify(passwords));
        loadPasswords();
    };

    const generatePassword = () => {
        const length = 12;
        const charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        document.getElementById("password").value = password;
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const url = document.getElementById("url").value;
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;
        savePassword(url, login, password);
        form.reset();
    });

    generateButton.addEventListener("click", generatePassword);

    window.deletePassword = deletePassword; // Make it globally accessible
    loadPasswords();
});

// Register service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(() => {
        console.log("Service Worker Registered");
    });
}
