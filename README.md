# Start

1. Zainstaluj [nodejs](https://nodejs.org/en/)
1. Stwórz konto na [Github](https://github.com/join)
   * i daj mi znać jaki masz nick
1. Zainstaluj [Github Desktop](https://desktop.github.com/)

   * zaloguj się do Github Desktop
1. Sciągnij najnowszą wersję strony:
   ![Sciagnij repo](https://raw.githubusercontent.com/fotodam/fotodam.github.io/source/tutorial/nowe-repo.PNG)
   Następnie upewnij się, ze ogladasz `source`.
   ![Branc source](https://raw.githubusercontent.com/fotodam/fotodam.github.io/source/tutorial/source-branch.PNG)

   Pamietaj w jakim folderze zapisałeś stronę.
1. Otwórz Wiersz Poleceń/Command Prompt/Terminal
   * przejdź do katalogu ze stroną (np. `cd fotodam.github.io`)
   * zainstaluj wymagane pakiety przez `npm install`
   ![Sciagnij repo](https://raw.githubusercontent.com/fotodam/fotodam.github.io/source/tutorial/npm-install.PNG)
1. Zainstaluj [Visual Studio Code](https://code.visualstudio.com/Download)
   * Otwórz stronę w Visual Studio Code poprzez `File->Open Folder` i wybór folderu ze stroną

# Jak to dziala

Strona jest umieszczona na [Github Pages](https://pages.github.com/) i jest to statyczny html. Html jest generowany przez narzędzie [Hexo](https://hexo.io/) co ułatawia dodawanie nowych treści. Po dokonaniu zmian nalezy wywołać generator aby uzyskac nowy html. **Nigdy nie edytujemy wygenerowanego html, bo przy kolejnych wywołaniach generatora nasze zmiany zostaną utracone.**

# Nowa galeria
Kazda galeria ma swoj folder i plik z rozszrezeniem `.md`
![Struktura](https://raw.githubusercontent.com/fotodam/fotodam.github.io/source/tutorial/tree.PNG)

Zeby dodac nowa galerie trzeba stworzyc nowy folder i plik. Mozna to zrobic przez Kopiuj Wklej lub z Command Promptu/Lini polecen `npm run new-gallery`. **Wazne zeby nie uzywac spacji w nazwach**

Jak juz mamy nowy folder i plik to w pliku `nazwa_galerii.md` nadajemy tytuł i nazwe pliku z katalogu `nazwa_galerii`, który ma zostać wyświetlony na głównej stronie.
![Nowa galeria](https://raw.githubusercontent.com/fotodam/fotodam.github.io/source/tutorial/new-gallery.PNG)

W katalgu `nazwa_galerii` umieszczamy zdjęcia - przez explorera lub jak kto woli, wazne zeby byly w katalogu `nazwa_galerii` i nie miały pod folderów. 
![Obrazki](https://raw.githubusercontent.com/fotodam/fotodam.github.io/source/tutorial/gallery-images.PNG)

Zeby przyspieszyc ladowanie mozna dla danego zdjecia np. `foto1.jpg` stworzyc miniaturke i nazwac ja `foto1_thumb.jpg`.

# Publikowanie zmian

1. Uruchom lokalny podgląd przez wywołanie `npm run server` z wiersza polecen (Command Prompt). Otworzy się przeglądarka z lokalną wersja strony. 
1. Wygeneruj nowego htmla poprzez wywołanie komendy `npm run generate` z wiersza polecen. Spowoduje to aktualizację folderu `public`. 
1. Jeśli wszystko jest ok to czas wgrać zmiany na serwer
   ![Obrazki](https://raw.githubusercontent.com/fotodam/fotodam.github.io/source/tutorial/open-shell.PNG)
   Otworzy sie okiekno [powershell](https://pl.wikipedia.org/wiki/Windows_PowerShell) w którym wywołujemy kolejno:
   
   `git add .`

   `git commit -m "Opis zmian jakich dokonales"`

   `git pull --rebase`

   `git push origin source`

   `git subtree push --prefix public origin master`

   Wysyłanie zdjęć moze troche potrwać. Po wszystkim zmiany powinny pojawić sie na stronie po kilkunastu seknudach.