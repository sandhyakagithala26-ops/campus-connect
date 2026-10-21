const $ = (selector) => document.querySelector(selector);
const sidebar = $('#sidebar');
const toast = $('#toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2800);
}

$('#todayDate').textContent = new Intl.DateTimeFormat('en-IN', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
}).format(new Date()).toUpperCase();
$('#year').textContent = new Date().getFullYear();

$('#menuBtn').addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.side-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.side-nav a').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
    sidebar.classList.remove('open');
  });
});

$('#themeBtn').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  showToast(document.body.classList.contains('dark') ? 'Dark theme enabled' : 'Light theme enabled');
});

$('#exportBtn').addEventListener('click', () => {
  const content = [
    'CAMPUSCONNECT — STUDENT OVERVIEW',
    'Name: Kagithala Sandhya Rani',
    'Degree: B.Tech — Computer Science & Engineering (AI & ML)',
    'Institution: Mohan Babu University',
    'CGPA: 8.6 / 10',
    'Graduation year: 2027',
    'Intermediate: Sri Chaitanya Junior College — 7.4 CGPA (2023)',
    'SSC: Sri Chaitanya Techno School — 9.9 CGPA (2021)',
    'Skills: Python, HTML, CSS, Machine Learning, Prompt Engineering, LLM Fundamentals, OpenAI API, Hugging Face Transformers',
    'Internship: AICTE–EduSkills Virtual Internship — Prompt Engineering for AI (Aug 2026–Oct 2026)',
    'Projects: News Spam Detection; Smart Sensor-Based Forest Fire Detection; AI-powered content generation capstone',
    'Location: Tirupati, Andhra Pradesh',
    'Email: sandhyakagithala26@gmail.com',
    'Phone: 9849055076',
    'Languages: English, Telugu'
  ].join('\\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Sandhya_Rani_Student_Overview.txt';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Overview exported as a text file');
});

$('#searchInput').addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  if (!query) {
    document.querySelectorAll('.panel, .stat-card').forEach(card => card.classList.remove('search-hidden'));
    return;
  }
  document.querySelectorAll('.panel, .stat-card').forEach(card => {
    card.classList.toggle('search-hidden', !card.innerText.toLowerCase().includes(query));
  });
});

$('#linkedinLink').addEventListener('click', (event) => {
  event.preventDefault();
  showToast('Add your actual LinkedIn profile URL to index.html before publishing.');
});
