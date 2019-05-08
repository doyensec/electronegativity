The following page contains instructions on how to generate the official Electronegativity User Manual.

Install *github-wikito-converter* and *wkhtmltopdf*.

```sh
sudo npm install -g github-wikito-converter
sudo apt-get install wkhtmltopdf
```

Note that sometimes the version of wkhtmltopdf in apt is not sufficient to render PDFs correctly. Consider installing the latest stable static release from [the official site](https://wkhtmltopdf.org/downloads.html) if you experience some issues.

Clone the github wiki
```sh
git clone https://github.com/doyensec/electronegativity.wiki.git
```

From within the ```docs/resources``` folder, convert the wiki to the User Manual PDF
```sh
gwtc -f pdf -n ../manual/ElectronegativityUserManual_v1.x.x -t "<b>Electronegativity<b><br><p class="manual">User Manual - March 2019</p>" --logo-img ./img/logo.svg --footer "Electronegativity © 2017-2019 Doyensec LLC" --toc ../../electronegativity.wiki/Home.md --css ./electronegativitywiki.css --pdf-page-count ../../electronegativity.wiki/
 ```
