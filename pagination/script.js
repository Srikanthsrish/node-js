let currentPage = 1;

async function fetchUsers(page) {
    try {
        const response = await fetch(`http://localhost:3003/users?page=${page}`);
        const result = await response.json();

        // Display records
        const recordsDiv = document.getElementById("records");
        recordsDiv.innerHTML = result.data.map(user => `
            <div class="record">
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Date of Birth:</strong> ${user.date_of_birth}</p>
                <p><strong>Address:</strong> ${user.address}</p>
                <p><strong>Created At:</strong> ${user.created_at}</p>
            </div>
        `).join("");

        // Update pagination controls
        document.getElementById("prev").disabled = !result.hasPrevPage;
        document.getElementById("next").disabled = !result.hasNextPage;
        document.getElementById("page-info").innerText = `Page ${result.currentPage}`;

        currentPage = result.currentPage;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// Handle button clicks
document.getElementById("prev").addEventListener("click", () => {
    if (currentPage > 1) fetchUsers(currentPage - 1);
});

document.getElementById("next").addEventListener("click", () => {
    fetchUsers(currentPage + 1);
});

// Initial fetch
fetchUsers(currentPage);
