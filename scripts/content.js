document.addEventListener('DOMContentLoaded', async function () {
    try {
        const [skillsResponse, experienceResponse, educationResponse, worksResponse] = await Promise.all([
            fetch('data/skills.json'),
            fetch('data/experience.json'),
            fetch('data/education.json'),
            fetch('data/works.json')
        ]);

        const [skills, experience, education, works] = await Promise.all([
            skillsResponse.json(),
            experienceResponse.json(),
            educationResponse.json(),
            worksResponse.json()
        ]);

        renderSkills(skills);
        renderExperience(experience);
        renderEducation(education);
        renderWorks(works);
    } catch (error) {
        // Silently fail if running locally via file:// without a server
        console.warn('Failed to load content JSON files:', error);
    }
});

function renderSkills(skills) {
    const container = document.getElementById('skills-list');
    if (!container) return;
    container.innerHTML = '';
    for (const skill of skills) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = skill.name;
        li.appendChild(span);
        li.insertAdjacentHTML('beforeend', `<br>${skill.detail || ''}`);
        container.appendChild(li);
    }
}

function renderExperience(experiences) {
    const container = document.getElementById('experience-list');
    if (!container) return;
    container.innerHTML = '';
    for (const exp of experiences) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = exp.period;
        li.appendChild(span);
        li.insertAdjacentHTML('beforeend', `<br>${exp.title}${exp.company ? ' at ' + exp.company : ''}`);
        container.appendChild(li);
    }
}

function renderEducation(educationItems) {
    const container = document.getElementById('education-list');
    if (!container) return;
    container.innerHTML = '';
    for (const ed of educationItems) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = ed.year;
        li.appendChild(span);
        li.insertAdjacentHTML('beforeend', `<br>${ed.degree} from ${ed.institution}`);
        container.appendChild(li);
    }
}

function renderWorks(works) {
    const container = document.getElementById('work-list');
    if (!container) return;
    container.innerHTML = '';
    for (const work of works) {
        const workDiv = document.createElement('div');
        workDiv.className = 'work';

        const img = document.createElement('img');
        img.src = work.image;
        img.alt = work.title;
        workDiv.appendChild(img);

        const layer = document.createElement('div');
        layer.className = 'layer';
        layer.innerHTML = `
            <h3>${work.title}</h3>
            <p>${work.description || ''}</p>
            ${work.link ? `<a href="${work.link}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-up-right-from-square"></i></a>` : ''}
        `;
        workDiv.appendChild(layer);

        container.appendChild(workDiv);
    }
}

