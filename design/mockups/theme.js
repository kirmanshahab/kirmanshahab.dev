// ?theme=dark forces dark; otherwise follow the system.
const t = new URLSearchParams(location.search).get("theme");
if (t === "dark" || (!t && matchMedia("(prefers-color-scheme: dark)").matches)) document.documentElement.classList.add("dark");
