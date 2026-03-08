console.log('Home connected.');

const tabBtnClasses = `w-[7.5rem] btn bg-white text-text-secondary text-base font-medium hover:bg-[#4a00ffcc] hover:text-white border border-[#e4e4e7FF] transition-all duration-300 rounded-[.25rem] px-4 py-3`;
const tabActiveBtnClasses = `w-[7.5rem] btn bg-theme-primary text-white text-base font-semibold hover:bg-[#4a00ffcc] border-none transition-all duration-300 rounded-[.25rem] px-4 py-3`;



const getIssues = async () => {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const result = await response.json();

    return result.data;
};

const showIssues = async () => {
    const issues = await getIssues();
    console.log(issues);

    const issueCardsContainer = document.querySelector('#issue-cards-container');
    issueCardsContainer.innerHTML = '';

    issues.forEach(issue => {
        console.log(issue);

        const card = document.createElement('div');
        card.classList.add('bg-surface', 'rounded-[6px]', 'shadow-sm', 'border-t-[4px]', 
            `border-${issue.status === 'open' ? 'theme-green' : 'theme-purple'}`, 'flex', 'flex-col');

        card.innerHTML = `
          <div class="p-4">
            <!-- top badges -->
            <div class="flex items-center justify-between mb-3">
              <div class="w-6 h-6">
                <img src="${issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png'}" alt="issue status" />
              </div>

              <div
                class="bg-[#ef444446] rounded-full w-[5rem] h-[1.5rem] flex justify-center items-center p-2"
              >
                <span class="text-theme-red text-xs font-medium">HIGH</span>
              </div>
            </div>
            <h3 class="text-text-primary text-sm font-semibold capitalize mb-2 line-clamp-2">
              ${issue.title}
            </h3>
            <p class="text-text-secondary text-xs font-normal mb-3 line-clamp-2">
              ${issue.description}
            </p>
            <!-- badges 2 -->
            <div class="flex gap-1 items-center">
              <div
                class="bg-[#ef444446] rounded-full h-[1.5rem] flex justify-center items-center p-2 border-1 border-theme-red"
              >
                <div class="w-3 h-3 mr-[2px]">
                  <img src="./assets/BugDroid.png" alt="" />
                </div>
                <span class="text-theme-red text-xs font-medium">BUG</span>
              </div>

              <div
                class="bg-[#ef444446] rounded-full h-[1.5rem] flex justify-center items-center p-2 border-1 border-theme-red"
              >
                <div class="w-3 h-3 mr-[2px]">
                  <img src="./assets/vector.png" alt="" />
                </div>
                <span class="text-theme-red text-xs font-medium"
                  >HELP WANTED</span
                >
              </div>
            </div>
          </div>
          <!-- hr line -->
          <div class="border-t border-[#e4e4e7FF]"></div>
          <div class="p-4">
            <!-- posted by -->
            <p class="text-text-secondary text-xs font-normal mb-2">
              #1 by ${issue.author}
            </p>
            <!-- date -->
            <p class="text-text-secondary text-xs font-normal">1/15/2024</p>
          </div>
    `;
        issueCardsContainer.appendChild(card);
    });
};


showIssues();