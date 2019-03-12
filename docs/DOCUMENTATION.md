The following page contains instructions on how to generate the official Electronegativity User Manual.

Install *github-wikito-converter* and *wkhtmltopdf*.

```sh
sudo npm install -g github-wikito-converter
sudo apt-get install wkhtmltopdf
```

Clone the github wiki
```sh
git clone https://github.com/doyensec/electronegativity.wiki.git
```

From within this folder, convert the wiki to the User Manual PDF
```sh
gwtc -f pdf -n ./manual/ElectronegativityUserManual_March2019 -t "<b>Electronegativity<b><br><p class="manual">User Manual - March 2019</p>" --logo-img ./img/logo.svg --footer "Electronegativity © 2017-2019 Doyensec LLC" --toc ../electronegativity.wiki/Home.md --css ./electronegativitywiki.css --pdf-page-count ../electronegativity.wiki/
 ```
