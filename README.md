# Igor Iasevych — portfolio

A Quarto website for https://iisvch.github.io, with a home page, an about page,
a Canarsie real estate case study, and placeholders for Projects 2 and 3.

## Preview and render

From this repository:

```sh
quarto preview
quarto render
```

Quarto writes the rendered website to `_site/`. The website uses saved project
results; rendering does not execute the original R notebook and does not require
installing Python, R, or notebook dependencies.

## Publish to GitHub Pages

The workflow in `.github/workflows/publish.yml` renders the website on each push
to `main` and publishes the output to the `gh-pages` branch. This retains the
repository's existing publishing approach.

In GitHub, open **Settings → Pages** and choose **Deploy from a branch**, then
**gh-pages / (root)**. If the branch is missing, run the publishing workflow first.
Keep this setting if it is already configured that way. Check the **Actions** tab
after pushing to confirm that publishing succeeded.

Before committing, review `git status` and any existing unrelated changes. To
stage only the portfolio and its required assets:

```sh
git add _quarto.yml _publish.yml index.qmd about.qmd styles.css site.js _includes assets projects .nojekyll .github/workflows/publish.yml README.md CV.pdf Canarsie images/Ich_a.png
git commit -m "Build portfolio and Canarsie case study"
git push origin main
```

Do not commit `_site/`, `.quarto/`, or a virtual environment. If your local branch
has conflicts or has diverged, resolve that Git state before pushing. Rendering
does not resolve Git conflicts.

## Edit the content

| File | Purpose |
| --- | --- |
| `index.qmd` | Home, photo, LinkedIn, and project cards |
| `about.qmd` | Biography, selected experience, and education |
| `projects/canarsie.qmd` | Case study and source downloads |
| `projects/project-2.qmd` | Project 2 placeholder |
| `projects/project-3.qmd` | Project 3 placeholder |
| `_quarto.yml` | Navigation, dropdown, metadata, and render settings |
| `_publish.yml` | Existing GitHub Pages publishing destination |
| `styles.css` | Colors, typography, responsive layout, and motion |
| `site.js` | Scenario selector, chart expansion, and reading progress |
| `CV.pdf` | Original CV linked from the website |
| `Canarsie/` | Original, unchanged project documents and notebook |
| `assets/` | Extracted project photographs and saved notebook charts |

Replace a placeholder page's content when a new project is ready, then update
the corresponding home-page card and dropdown label in `_quarto.yml`.

## Content notes

Professional information and the LinkedIn address come from the supplied CV.
Canarsie results and figures come from the saved notebook and presentation.
The case study uses saved numerical outputs where some narrative drafts differ:
for example, the A1 coefficient of variation is 0.46. Model coefficients are
described as associations, forecast ranges as prediction intervals, and the NPV
cases as academic outputs under assignment assumptions.

The interface includes responsive navigation, keyboard-accessible controls,
reduced-motion support, readable content without JavaScript, and print styles.
