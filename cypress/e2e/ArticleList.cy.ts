import { Article } from "../../src/pages/articles/types/articles";


describe('ArticleList with Dynamic Test IDs and Period Selection', () => {
  const API_BASE = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/';
  const API_KEY = 'WXCeZS4dUG4fZCDY9LGeodhswo9dKKax';

  beforeEach(() => {
    cy.intercept('GET', `${API_BASE}1.json?api-key=${API_KEY}`).as('getArticles1Day');
    cy.intercept('GET', `${API_BASE}7.json?api-key=${API_KEY}`).as('getArticles7Days');
    cy.intercept('GET', `${API_BASE}30.json?api-key=${API_KEY}`).as('getArticles30Days');
    cy.visit('http://localhost:5173');
  });

  context('Initial Load', () => {
    it('should render with default 1-day period', () => {
      cy.wait('@articlesRequest1Day');
      cy.get('[data-testid="heading"]').should('contain', 'NY Times Most Popular Articles');
      cy.get('select').should('have.value', '1');
    });
  });

  context('Period Selection', () => {
    it('should fetch articles when period changes', () => {
      cy.intercept('GET', `${API_BASE}/7.json?api-key=${API_KEY}`).as('articlesRequest7Days');
      cy.intercept('GET', `${API_BASE}/30.json?api-key=${API_KEY}`).as('articlesRequest30Days');

      cy.get('select').select('7');
      cy.wait('@articlesRequest7Days').then((interception) => {
        cy.get(interception.request.url).should('contain.text', '7.json');
        cy.get('select').should('have.value', '7');
      });

      cy.get('select').select('30');
      cy.wait('@articlesRequest30Days').then((interception) => {
        cy.get(interception.request.url).should('contain.text', '30.json');
        cy.get('select').should('have.value', '30');
      });
    });
    it('should fetch articles when period changes', () => {
      cy.wait('@getArticles1Day');
      cy.get('select').should('have.value', '1');

      cy.wait(10000);
      cy.get('select').select('7');
      cy.wait('@getArticles7Days');
      cy.get('select').should('have.value', '7');

      cy.wait(10000);
      cy.get('select').select('30');
      cy.wait('@getArticles30Days');
      cy.get('select').should('have.value', '30');
      cy.wait(10000);
    });
  });

  context('Article Rendering', () => {
    it('should render all articles dynamically', () => {
      cy.wait('@getArticles1Day').then((interception) => {
        const articles = interception.response?.body.results || [];
        articles.forEach((article: Article, index: number) => {
          const cardTestId = `article-card-${index}`;
          cy.get(`[data-testid="${cardTestId}"]`).should('exist');
          cy.get(`[data-testid="${cardTestId}"]`).within(() => {
            cy.contains(article.title).should('be.visible');
            cy.contains(article.published_date).should('be.visible');
          });
        });
      });
    });
  });

  context('Detail Toggling', () => {
    it('should toggle article details when clicked', () => {
      cy.wait('@getArticles1Day').then((interception) => {
        const articles = interception.response?.body.results || [];
        // Open first 3 articles
        articles.slice(0, 3).forEach((_: Article, index: number) => {
          const cardTestId = `article-card-${index}`;
          const detailTestId = `article-detail-${index}`;
          const chevronTestId = `chevron-${index}`;
          cy.get(`[data-testid="${detailTestId}"]`).should('not.exist');
          cy.get(`[data-testid="${chevronTestId}"]`).should('contain', '▼');
          cy.get(`[data-testid="${cardTestId}"]`).click();
          cy.get(`[data-testid="${detailTestId}"]`).should('be.visible');
          cy.get(`[data-testid="${chevronTestId}"]`).should('contain', '▲');
        });

        // Close all except first article
        articles.slice(1, 3).forEach((_: Article, index: number) => {
          const cardTestId = `article-card-${index + 1}`;
          const detailTestId = `article-detail-${index + 1}`;
          const chevronTestId = `chevron-${index + 1}`;
          cy.get(`[data-testid="${detailTestId}"]`).should('be.visible');
          cy.get(`[data-testid="${chevronTestId}"]`).should('contain', '▲');
          cy.get(`[data-testid="${cardTestId}"]`).click();
          cy.get(`[data-testid="${detailTestId}"]`).should('not.exist');
          cy.get(`[data-testid="${chevronTestId}"]`).should('contain', '▼');
        });

        cy.get('[data-testid="article-detail-0"]').should('be.visible');
        cy.get('[data-testid="read-more-0"]')
          .should('exist')
          .click();
      });
    });
  });
});