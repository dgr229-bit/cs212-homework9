$(document).ready(function () {

    let skills = [];

    function renderSkills(filteredSkills = skills) {
        $("#skillsList").empty();

        filteredSkills.forEach((skill) => {
            let originalIndex = skills.indexOf(skill);

            $("#skillsList").append(`
                <li>
                    <span>${skill}</span>
                    <button class="editBtn" data-index="${originalIndex}">Edit</button>
                    <button class="deleteBtn" data-index="${originalIndex}">Delete</button>
                </li>
            `);
        });
    }

    $("#addSkillBtn").click(function () {
        let skill = $("#skillInput").val().trim();

        if (skill === "") {
            alert("Please enter a skill");
            return;
        }

        if (skills.includes(skill)) {
            alert("Skill already exists!");
            return;
        }

        skills.push(skill);
        $("#skillInput").val("");
        renderSkills();
    });

    $("#skillsList").on("click", ".deleteBtn", function () {
        let index = $(this).data("index");
        skills.splice(index, 1);
        renderSkills();
    });

    $("#skillsList").on("click", ".editBtn", function () {
        let index = $(this).data("index");
        let newSkill = prompt("Edit skill:", skills[index]);

        if (newSkill && newSkill.trim() !== "") {
            skills[index] = newSkill.trim();
            renderSkills();
        }
    });

    $("#skillInput").keydown(function (event) {
        if (event.key === "Enter") {
            $("#addSkillBtn").click();
        }

        if (event.key === "Escape") {
            $("#skillInput").val("");
        }
    });

    $("#skillSearch").on("input", function () {
        let searchValue = $(this).val().toLowerCase();

        let filteredSkills = skills.filter(skill =>
            skill.toLowerCase().includes(searchValue)
        );

        renderSkills(filteredSkills);
    });

    const menuItems = ["Skills", "Projects", "Education"];

    function renderMenu() {
        $("#navMenu").empty();

        menuItems.forEach(item => {
            $("#navMenu").append(`
                <a href="#">${item}</a> |
            `);
        });
    }

    renderMenu();

    let projects = [
        {
            title: "Portfolio Website",
            description: "My personal portfolio site",
            deadline: new Date("2026-03-30")
        },
        {
            title: "Cybersecurity Lab",
            description: "Security analysis project",
            deadline: new Date("2026-03-23")
        },
        {
            title: "Web App",
            description: "Interactive web application",
            deadline: new Date("2026-04-08")
        }
    ];

    function renderProjects() {
        $("#projectsContainer").empty();

        projects.forEach(project => {
            $("#projectsContainer").append(`
                <div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <p><strong>Deadline:</strong> ${project.deadline.toDateString()}</p>
                </div>
            `);
        });
    }

    $("#sortProjectsBtn").click(function () {
        projects.sort((a, b) => a.deadline - b.deadline);
        renderProjects();
    });

    renderProjects();

});