(() => {
  const scriptUrl = document.currentScript?.src;
  if (!scriptUrl) {
    throw new Error('Could not determine the site root for site search.');
  }

  const siteRoot = new URL('../', scriptUrl);
  let searchDialog = document.querySelector('#site-search-dialog');

  if (!searchDialog) {
    searchDialog = document.createElement('dialog');
    searchDialog.className = 'site-search';
    searchDialog.id = 'site-search-dialog';
    searchDialog.setAttribute('aria-labelledby', 'site-search-title');
    searchDialog.innerHTML = `
      <div class="site-search-panel">
        <div class="site-search-heading">
          <div>
            <span class="site-search-kicker">National Highway Authority</span>
            <h2 id="site-search-title">Search the website</h2>
          </div>
          <button class="site-search-close" type="button" aria-label="Close search"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
        </div>
        <form class="site-search-form" role="search">
          <label class="sr-only" for="site-search-input">Search NHA pages</label>
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <input id="site-search-input" type="search" placeholder="Search projects, tenders, services..." autocomplete="off">
          <button type="submit">Search</button>
        </form>
        <p class="site-search-status" data-site-search-status aria-live="polite">Enter a keyword to search NHA pages.</p>
        <ul class="site-search-results" data-site-search-results></ul>
      </div>`;
    document.body.append(searchDialog);
  }

  const closeButton = searchDialog.querySelector('.site-search-close');
  const searchForm = searchDialog.querySelector('.site-search-form');
  const searchInput = searchDialog.querySelector('#site-search-input');
  const status = searchDialog.querySelector('[data-site-search-status]');
  const resultsList = searchDialog.querySelector('[data-site-search-results]');
  const pages = [
    { path: 'index.html', title: 'Home' },
    { path: 'pages/about.html', title: 'About Us' },
    { path: 'pages/projects.html', title: 'Our Projects' },
    { path: 'pages/complaints.html', title: 'Complaints' },
    { path: 'pages/career.html', title: 'Careers' },
    { path: 'pages/contact.html', title: 'Contact Us' },
    { path: 'pages/travel-advisory.html', title: 'Travel Advisory' },
    { path: 'pages/toll-rates.html', title: 'Toll Rates' },
    { path: 'pages/road-safety.html', title: 'Road Safety' },
    { path: 'pages/right-to-information.html', title: 'Right to Information' },
    { path: 'pages/media.html', title: 'Media Center' },
    { path: 'pages/maintenance-works.html', title: 'Maintenance Works' },
    { path: 'pages/ebidding.html', title: 'E-Bidding' },
    { path: 'pages/downloads.html', title: 'Downloads' },
    { path: 'pages/tender-types.html', title: 'Active Tenders' },
  ];
  let searchIndex;
  let indexPromise;

  const normalize = (value) => value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const loadSearchIndex = async () => {
    const entries = await Promise.all(pages.map(async (page) => {
      const url = new URL(page.path, siteRoot);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Could not load ${url.pathname} for site search (${response.status}).`);

      const html = await response.text();
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      parsed.querySelectorAll('header, nav, footer, script, style, noscript, .topbar, .header, .footer, .nav, .site-search').forEach((element) => element.remove());
      const title = page.title === 'Home' ? page.title : parsed.querySelector('h1')?.textContent.trim() || parsed.title || page.title;
      const content = parsed.body.textContent.replace(/\s+/g, ' ').trim();

      return { ...page, url, title, content, normalizedContent: normalize(content), normalized: normalize(`${title} ${content}`) };
    }));

    return entries;
  };

  const renderResults = (query) => {
    resultsList.replaceChildren();
    const terms = normalize(query).trim().split(/\s+/).filter(Boolean);

    if (!terms.length) {
      status.textContent = 'Enter a keyword to search NHA pages.';
      return;
    }

    if (!Array.isArray(searchIndex)) {
      status.textContent = 'Loading pages...';
      return;
    }

    const matches = searchIndex
      .map((page) => {
        const title = normalize(page.title);
        const score = terms.reduce((total, term) => {
          if (title.includes(term)) return total + 5;
          if (page.normalized.includes(term)) return total + 1;
          return total;
        }, 0);
        return { ...page, score };
      })
      .filter((page) => page.score >= terms.length)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 8);

    if (!matches.length) {
      status.textContent = `No pages found for “${query.trim()}”. Try another keyword.`;
      return;
    }

    status.textContent = `${matches.length} ${matches.length === 1 ? 'page' : 'pages'} found.`;
    matches.forEach((page) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      const heading = document.createElement('strong');
      const snippet = document.createElement('span');
      const firstTermIndex = page.normalizedContent.indexOf(terms[0]);
      const snippetStart = Math.max(0, firstTermIndex - 60);
      const excerpt = page.content.slice(snippetStart, snippetStart + 180).trim();

      link.href = page.url.href;
      heading.textContent = page.title;
      snippet.textContent = `${snippetStart > 0 ? '…' : ''}${excerpt}${snippetStart + 180 < page.content.length ? '…' : ''}`;
      link.append(heading, snippet);
      item.append(link);
      resultsList.append(item);
    });
  };

  class SiteSearchButton extends HTMLElement {
    connectedCallback() {
      const searchButton = document.createElement('button');
      searchButton.className = 'search-btn';
      searchButton.type = 'button';
      searchButton.setAttribute('aria-label', 'Search the website');
      searchButton.setAttribute('aria-haspopup', 'dialog');
      searchButton.setAttribute('aria-controls', searchDialog.id);

      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-magnifying-glass';
      icon.setAttribute('aria-hidden', 'true');
      searchButton.append(icon);
      this.append(searchButton);

      searchButton.addEventListener('click', () => {
        searchDialog.showModal();
        searchInput.focus();
        if (!searchIndex && !indexPromise) {
          status.textContent = 'Loading pages...';
          indexPromise = loadSearchIndex();
          indexPromise.then((index) => {
            searchIndex = index;
            indexPromise = undefined;
            renderResults(searchInput.value);
          }).catch((error) => {
            indexPromise = undefined;
            status.textContent = 'Search could not load site pages. Please try again.';
            console.error(error);
          });
        }
      });

      searchDialog.addEventListener('close', () => searchButton.focus());
    }
  }

  customElements.define('site-search-button', SiteSearchButton);

  closeButton.addEventListener('click', () => searchDialog.close());
  searchDialog.addEventListener('click', (event) => {
    if (event.target === searchDialog) searchDialog.close();
  });
  searchInput.addEventListener('input', () => renderResults(searchInput.value));
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    resultsList.querySelector('a')?.click();
  });
})();
