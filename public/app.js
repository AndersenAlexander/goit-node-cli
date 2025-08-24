const API = "/api/contacts";

const els = {
  tbody: document.getElementById("tbody"),
  search: document.getElementById("search"),
  status: document.getElementById("status"),
  exportCsv: document.getElementById("exportCsv"),
  table: document.getElementById("table"),
  addForm: document.getElementById("addForm"),
};

let all = [];
let filtered = [];
let sortKey = "name";
let sortDir = "asc";

function setStatus(msg) {
  els.status.textContent = msg ?? "";
}

function compare(a, b) {
  const va = (a[sortKey] ?? "").toString().toLowerCase();
  const vb = (b[sortKey] ?? "").toString().toLowerCase();
  if (va < vb) return sortDir === "asc" ? -1 : 1;
  if (va > vb) return sortDir === "asc" ? 1 : -1;
  return 0;
}

function applyFilter() {
  const q = els.search.value.trim().toLowerCase();
  if (!q) {
    filtered = [...all];
  } else {
    filtered = all.filter((c) =>
      [c.name, c.email, c.phone].some((v) =>
        (v ?? "").toString().toLowerCase().includes(q)
      )
    );
  }
  filtered.sort(compare);
  render();
}

function render() {
  els.tbody.innerHTML = "";
  if (!filtered.length) {
    els.tbody.innerHTML = `<tr><td colspan="4" class="px-3 py-4 text-gray-500">No contacts found.</td></tr>`;
    setStatus(`0 of ${all.length}`);
    return;
  }
  const frag = document.createDocumentFragment();
  for (const c of filtered) {
    const tr = document.createElement("tr");
    tr.className = "border-b hover:bg-gray-50";
    tr.innerHTML = `
      <td class="px-3 py-2">${escapeHtml(c.name)}</td>
      <td class="px-3 py-2">${escapeHtml(c.email)}</td>
      <td class="px-3 py-2">${escapeHtml(c.phone)}</td>
      <td class="px-3 py-2">
        <button data-id="${c.id}" class="delete px-2 py-1 border rounded-lg hover:bg-red-50">Delete</button>
      </td>
    `;
    frag.appendChild(tr);
  }
  els.tbody.appendChild(frag);
  setStatus(`${filtered.length} of ${all.length}`);
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function load() {
  const res = await fetch(API);
  if (!res.ok) {
    setStatus("Failed to load contacts.");
    return;
  }
  all = await res.json();
  applyFilter();
}

async function remove(id) {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!res.ok) return alert("Delete failed.");
  all = all.filter((c) => c.id !== id);
  applyFilter();
}

async function add(contact) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  if (!res.ok) return alert("Add failed.");
  const created = await res.json();
  all.push(created);
  applyFilter();
}

// events
els.search.addEventListener("input", applyFilter);

els.tbody.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete");
  if (!btn) return;
  const id = btn.dataset.id;
  if (confirm("Delete this contact?")) remove(id);
});

els.addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(els.addForm);
  const name = fd.get("name")?.toString().trim();
  const email = fd.get("email")?.toString().trim();
  const phone = fd.get("phone")?.toString().trim();
  if (!name || !email || !phone) return alert("All fields are required.");
  add({ name, email, phone });
  els.addForm.reset();
});

// sorting by clicking on headers
document.querySelectorAll("th[data-key]").forEach((th) => {
  th.addEventListener("click", () => {
    const key = th.dataset.key;
    if (sortKey === key) {
      sortDir = sortDir === "asc" ? "desc" : "asc";
    } else {
      sortKey = key;
      sortDir = "asc";
    }
    applyFilter();
  });
});

// export CSV
els.exportCsv.addEventListener("click", () => {
  const headers = ["name", "email", "phone"];
  const rows = [headers.join(",")];
  for (const c of filtered) {
    rows.push(
      headers
        .map((h) => `"${(c[h] ?? "").toString().replaceAll('"', '""')}"`)
        .join(",")
    );
  }
  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contacts.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

load();
