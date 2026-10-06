# Igor Iasevych — portfolio

A Quarto website with a Canarsie neighborhood explorer built in R.

## Files

- `index.qmd`: About Me homepage.
- `projects.qmd` and `projects/`: project pages and the Canarsie dashboard.
- `cv.qmd`, `contact.qmd`: CV and contact pages.
- `_quarto.yml`: website settings and navigation.
- `styles.scss`: theme and layout.
- `assets/`, `images/`, `CV.pdf`: website media.
- `scripts/prepare-canarsie.R`: creates the neighborhood summary table from the original NYC sales CSV.
- `data/README.md`: data source, cleaning steps and validation checks.

## Render locally

Install Quarto and R, then install the R packages once:

```r
install.packages(c("knitr", "rmarkdown", "ggplot2", "dplyr", "scales", "plotly", "readr"))
```

From this folder, run:

```sh
quarto render
```

The finished HTML website is in `_site/`. Open `_site/index.html` or run `quarto preview`.

GitHub Actions renders the site from `main` and publishes it to `gh-pages`.

## Data and submission

The live project reads `data/canarsie-neighborhoods.csv`. The source submission excludes data files. To render from that source ZIP, restore the original `all_nyc_2026.csv` and create the summary table:

```sh
Rscript scripts/prepare-canarsie.R /path/to/all_nyc_2026.csv
quarto render
```

See `data/README.md` for the source dataset and checks. The static submission already includes the rendered dashboard, so it can be viewed without R or the external CSV.
