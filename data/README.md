# Canarsie neighborhood dashboard data

`canarsie-neighborhoods.csv` reproduces `nbhd_agg` in cells 15, 24, 26 and 28 of the supplied `iigor_A1-5_CANARSIE.ipynb` notebook.

- Source: `all_nyc_2026.csv`, Google Drive file ID `1O50aJVzyV1s3zMpVqG0rKmN1fCfFPhz8`, linked in the notebook.
- Source snapshot: 2,083,757 rows; 643,835 qualifying cleaned residential rows across all years.
- Dashboard period: 2009–2025. It contains 256 neighborhood aggregates and no property addresses.
- Cleaning: `TYPE` contains `RESIDENTIAL`, positive sale price, and positive gross square footage.
- Aggregate: neighborhood median sale price, sales count, median sale price / gross square feet, and sample standard deviation of sale prices; at least two sales.
- Clustering: four z-score standardized measures, R `kmeans`, k = 3, nstart = 25, seed = 42.
- Validation against saved notebook results: Canarsie = 5,955 sales, $503,500 median sale price, $268.4049 median price / sq ft, cluster 2. Cluster counts = 167, 50, 39.
- The dashboard uses these exact aggregates; it does not recompute clusters when a viewer hides a legend category.

Recreate from the original source file, from the repository root:

```sh
Rscript scripts/prepare-canarsie.R /path/to/all_nyc_2026.csv
```

Requires R, readr and dplyr. The website additionally uses ggplot2, scales, plotly and knitr. Only the small aggregate CSV is included in the website repository.

Source CSV SHA-256: `12dc3959be3ca52292c0ae1c1af9aba04f65b90ee985bb4b6972dfb038d4cd53`
