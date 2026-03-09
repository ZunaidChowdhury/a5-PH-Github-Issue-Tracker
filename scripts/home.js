console.log('Home connected.');

// DOM Element References
const issueCardsContainer = document.querySelector('#issue-cards-container');

const tabBtnClasses = `w-[7.5rem] btn bg-white text-text-secondary text-base font-medium hover:bg-[#4a00ffcc] hover:text-white border border-[#e4e4e7FF] transition-all duration-300 rounded-[.25rem] px-4 py-3`;
const tabActiveBtnClasses = `w-[7.5rem] btn bg-theme-primary text-white text-base font-semibold hover:bg-[#4a00ffcc] border-none transition-all duration-300 rounded-[.25rem] px-4 py-3`;


// Functions Definitions
const isoToLocalDate = (isoString) => {
  // const isoDate = "2024-01-19T15:30:00Z";
  const dateObj = new Date(isoString);

  // Formats to 1/19/2024 (M/D/YYYY)
  const formattedDate = dateObj.toLocaleDateString('en-US');
  // console.log(formattedDate);
  return formattedDate;
}

const formatName = (str) => {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getIssues = async () => {
  const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
  const result = await response.json();

  return result.data;
};

const showIssues = async () => {
  const issues = await getIssues();
  // console.log(issues);

  issueCardsContainer.innerHTML = '';

  issues.forEach(issue => {
    // console.log(issue);

    const card = document.createElement('div');
    card.classList.add('bg-surface', 'rounded-[6px]', 'shadow-sm', 'border-t-[4px]',
      `border-${issue.status === 'open' ? 'theme-green' : 'theme-purple'}`, 'flex', 'flex-col', 'justify-between', 'hover:shadow-md', 'hover:scale-102', 'transition-all', 'duration-300');

    card.innerHTML = `
          <div class="p-4">
            <!-- top badges -->
            <div class="flex items-center justify-between mb-3">
              <div class="w-6 h-6">
                <img src="${issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png'}" alt="issue status" />
              </div>

              <div
                class="${issue.priority === 'high' ? 'bg-[#feececFF]' : issue.priority === 'medium' ? 'bg-[#fff6d1FF]' : issue.priority === 'low' ? 'bg-[#eeeff2FF]' : 'bg-[#eeeff2FF]'} rounded-full w-[5rem] h-[1.5rem] flex justify-center items-center p-2"
              >
                <span class="${issue.priority === 'high' ? 'text-theme-red' : issue.priority === 'medium' ? 'text-[#f59e0bFF]' : issue.priority === 'low' ? 'text-[#9ca3afFF]' : 'text-[#9ca3afFF]'} text-xs font-medium">${issue.priority === 'high' ? 'HIGH' : issue.priority === 'medium' ? 'MEDIUM' : 'LOW'}</span>
              </div>
            </div>
            <h3 data-issue-id="${issue.id}" class="text-text-primary text-sm font-semibold capitalize mb-2 line-clamp-2 cursor-pointer hover:text-theme-primary transition-colors duration-300">
              ${issue.title}
            </h3>
            <p class="text-text-secondary text-xs font-normal mb-3 line-clamp-2">
              ${issue.description}
            </p>
            <!-- badges 2 -->
            <div class="flex gap-1 items-center flex-wrap">
              ${issue.labels.map(label => `
                              <div
                class="${label === 'bug' ? 'bg-[#feececFF]' : label === 'help wanted' ? 'bg-[#fff6d1FF]' : label === 'enhancement' ? 'bg-[#defce8FF]' : 'bg-[#eeeff2FF]'} rounded-full h-[1.5rem] flex justify-center items-center p-2 border-1 
                ${label === 'bug' ? 'border-[#fecacaFF]' : label === 'help wanted' ? 'border-[#fde68aFF]' : label === 'enhancement' ? 'border-[#bbf7d0FF]' : 'border-[#e2e2e2]'}"
              >

                <span class="${label === 'bug' ? 'text-theme-red' : label === 'help wanted' ? 'text-[#f59e0bFF]' : label === 'enhancement' ? 'text-[#059669FF]' : 'text-[#9ca3afFF]'} text-xs font-medium uppercase">${label}</span>  
              </div>
                `).join('')}
            </div>
          </div>
          <div>
            <!-- hr line -->
          <div class="border-t border-[#e4e4e7FF]"></div>
          <div class="p-4">
            <!-- posted by -->
            <p class="text-text-secondary text-xs font-normal mb-2">
              #1 by ${issue.author}
            </p>
            <!-- date -->
            <p class="text-text-secondary text-xs font-normal">${isoToLocalDate(issue.createdAt)}</p>
          </div>
</div>
    `;
    issueCardsContainer.appendChild(card);
  });
};

const getIssue = async (issueId) => {
  const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
  const result = await response.json();

  // console.log(result.data);
  
  return result.data;
};

const showIssue = async (issueId) => {
  const issue = await getIssue(issueId);
  console.log(issue);

  const issueModal = document.querySelector('#issue_modal');
  issueModal.innerHTML = '';
  issueModal.innerHTML = `
          <div class="modal-box p-8 w-full max-w-[43.75rem]">
        <h3 class="text-text-primary text-2xl font-bold mb-2">
          ${issue.title}
        </h3>
        <ul
          class="flex items-center list-disc marker:text-[#64748b] gap-7 mb-[1.625rem]"
        >
          <li class="list-none">
            <div
              class="${issue.status === 'open' ? 'bg-theme-green' : 'bg-theme-red'} rounded-full h-[1.5rem] flex justify-center items-center p-2"
            >
              <span class="text-white text-xs font-medium">${issue.status === 'open' ? 'Open' : 'Closed'}</span>
            </div>
          </li>
          <li>
            <p class="text-text-secondary text-xs font-normal">
            ${issue.status === 'open' ? `Opened by ${formatName(issue.author)}` : `Last Updated by ${formatName(issue.author)}`}
            </p>
          </li>
          <li>
            <p class="text-text-secondary text-xs font-normal">${issue.status === 'open' ? isoToLocalDate(issue.createdAt) : isoToLocalDate(issue.updatedAt)}</p>
          </li>
        </ul>

        <!-- badges 2 -->
        <div class="flex gap-1 items-center mb-[1.5rem]">

              ${issue.labels.map(label => `
                              <div
                class="${label === 'bug' ? 'bg-[#feececFF]' : label === 'help wanted' ? 'bg-[#fff6d1FF]' : label === 'enhancement' ? 'bg-[#defce8FF]' : 'bg-[#eeeff2FF]'} rounded-full h-[1.5rem] flex justify-center items-center p-2 border-1 
                ${label === 'bug' ? 'border-[#fecacaFF]' : label === 'help wanted' ? 'border-[#fde68aFF]' : label === 'enhancement' ? 'border-[#bbf7d0FF]' : 'border-[#e2e2e2]'}"
              >

                <span class="${label === 'bug' ? 'text-theme-red' : label === 'help wanted' ? 'text-[#f59e0bFF]' : label === 'enhancement' ? 'text-[#059669FF]' : 'text-[#9ca3afFF]'} text-xs font-medium uppercase">${label}</span>  
              </div>
                `).join('')}
        </div>

        <p class="text-text-secondary text-base font-normal mb-[1.75rem]">
                ${issue.description}
        </p>

        <!-- bottom -->
        <div
          class="bg-background rounded-lg p-4 w-full text-text-secondary text-base font-normal grid grid-cols-2 mb-[1.562rem]"
        >
          <div>
            <p>Assignee:</p>
            <p class="text-text-primary text-base font-semibold">${formatName(issue.author)}</p>
          </div>

          <div>
            <p>Priority:</p>
              <div
                class="${issue.priority === 'high' ? 'bg-theme-red' : issue.priority === 'medium' ? 'bg-[#f59e0bFF]' : issue.priority === 'low' ? 'bg-[#9ca3afFF]' : 'bg-[#9ca3afFF]'} rounded-full w-[5rem] h-[1.5rem] flex justify-center items-center p-2"
              >
                <span class="${issue.priority === 'high' ? 'text-white' : issue.priority === 'medium' ? 'text-white' : issue.priority === 'low' ? 'text-white' : 'text-[#9ca3afFF]'} text-xs font-medium">${issue.priority === 'high' ? 'HIGH' : issue.priority === 'medium' ? 'MEDIUM' : 'LOW'}</span>
              </div>
          </div>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button
              class="btn bg-theme-primary text-white text-base font-semibold hover:bg-[#4a00ffcc] border-none transition-all duration-300 rounded-[.25rem] px-4 py-3"
            >
              Close
            </button>
          </form>
        </div>
      </div>
  `;

    issueModal.showModal();
};

issueCardsContainer.addEventListener('click', (e) => {
  const cardTitle = e.target.closest('h3');
  const issueId = cardTitle?.dataset.issueId;  
  // console.log(cardTitle, issueId);
  showIssue(issueId);
  
});


// Execution
showIssues();


