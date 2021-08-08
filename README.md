Angular 10 and communication with RESTful API's.
Setup:
  Locate the main folder in terminal.
  Execute "npm install -g @angular/cli" command in terminal to Angular CLI.
  Execute "npm install" command in terminal to install all node_modules packages.
  Execute "ng serve -o" command in terminal to run the program.


Prie sistemos neprisijungusio svečio dalį sudaro du langai: prisijungimas ir registracija. Prisijungusio vartotojo dalį sudaro, jeigu jo teisės yra šeimininko, šie langai: gyvūno, vizito istorijos, vizito rezervacijos, konsultacijos. Prisijungusio vartotojo dalį sudaro, jeigu jo teisės yra specialisto, šie langai: kalendorius, rezervacijos priėmimas, rezervacijos peržiūra, konsultacijos. Prisijungusio vartotojo dalį sudaro, jeigu jo teisės yra administratoriaus, šie langai: paslaugos, rūšys, darbuotojai.
![image](https://user-images.githubusercontent.com/49523194/128635333-cb654b2b-4a3e-4e67-b095-9316c5543076.png)









Prisijungimo lango prototipe (žr. 1 pav.) įvedami reikalingi duomenys, kurie yra skirti prisijungimui prie sistemos. Šis langas yra skirtas neprisijungusiems svečiams. 

![image](https://user-images.githubusercontent.com/49523194/128635356-16fc55b0-bbff-4ac1-b6a5-a444b253f34c.png)

1 pav. Prisijungimo lango prototipas


Registracijos lango prototipe (žr. 2 pav.) įvedama registracijai reikalinga informacija: vardas, pavardė, telefono numeris, elektroninis paštas, slaptažodis, kurie yra skirti sukurti vartotojo paskyrą. Šis langas yra skirtas neregistruotam svečiui.

![image](https://user-images.githubusercontent.com/49523194/128635360-8b50d8f9-4b6e-49c2-a304-a42c0c5bc294.png)

2 pav. Registracijos lango prototipas 


Gyvūno lango prototipe (žr. 3 pav.) pateikta visa svarbi informacija apie šeimininko gyvūną: vardas, gimimo metai, veislė, lytis, rūšis, čipo numeris. Atliekant paieška yra išfiltruojamas sąrašas pagal pateiktą paieškos užklausą. Šis langas yra prieinamas šeimininkui, specialistui ir administratoriui.

![image](https://user-images.githubusercontent.com/49523194/128635384-9bffa73f-a4a6-477f-b754-74babffb13b3.png)

3 pav. Gyvūno lango prototipas


Pridėti gyvūną formos lango prototipe (žr. 4 pav.) įvedama svarbi informacija apie gyvūną: vardas, rūšis, lytis, gimimo metai, veislė, kurie yra skirti sukurti naują gyvūną šeimininkui. Šis langas yra prieinamas šeimininkui, specialistui ir administratoriui.

![image](https://user-images.githubusercontent.com/49523194/128635388-58217898-1ef0-43ff-a852-56fa03853800.png)

4 pav. Pridėti gyvūną formos lango prototipas
 
 
Redaguoti gyvūną formos lango prototipe (žr. 5 pav.) pateikiama informacija apie pasirinktą gyvūną, šeimininkas gali pakoreguoti gyvūno duomenis. Šis langas yra prieinamas šeimininkui, specialistui ir administratoriui.

![image](https://user-images.githubusercontent.com/49523194/128635396-b2395da0-23a5-4b54-a5e3-96bf2210dea6.png)

5 pav. Redaguoti gyvūną formos lango prototipas


Peržiūrėti gyvūno ligos istorijos įrašus formos lango prototipe (žr. 6 pav.) yra pateikiama visa pasirinkto šeimininko gyvūno ligos, bei suleistų skiepų įrašų istorija, bei joje užfiksuota informacija. Šis langas yra prieinamas šeimininkui, specialistui ir administratoriui.

![image](https://user-images.githubusercontent.com/49523194/128635398-e9185146-5297-4a7d-9ce0-a7ccb8ee0e14.png)

6 pav. Peržiūrėti gyvūno ligos istorijos įrašus formos lango prototipas 


Vizito istorijos lango prototipe (žr. 7 pav.) yra pateikiama informacija apie šeimininko asmeninius vizitus, yra išskiriama į artėjančius vizitus ir vizitų istorija. Juose pateikiama informacija: gyvūnas, paslauga, data, laikas, būsena. Šis langas yra prieinamas šeimininkui, specialistui ir administratoriui.

![image](https://user-images.githubusercontent.com/49523194/128635400-7ab2f343-b1cc-4af8-b0a8-aab228e3eed4.png)

7 pav. Vizito istorijos lango prototipas


Vizito rezervacijos lango prototipe (žr. 8 pav.) yra pateikiama rezervacijos forma, kurioje yra pasirenkamas šeimininko gyvūnas, paslauga, šie duomenys yra detalizuojami dešinėje lango pusėje, taip pat pasirenkamas pageidaujamas laikas, data ir aprašoma situacija. Šis langas yra prieinamas šeimininkui, specialistui ir administratoriui.

![image](https://user-images.githubusercontent.com/49523194/128635402-af3738cb-3511-4e04-9a94-af1807440d35.png)

8 pav. Vizito rezervacijos lango prototipas


Konsultacijos lango prototipe (žr. 9 pav.) pateikiama žinučių siuntimo forma. Kairėje pusėje pateikiamas sąrašas prieinamų specialistų, jei prisijungęs yra šeimininkas arba šeimininkų, jeigu prisijungęs yra specialistas. Leidžiama siųsti ir gauti žinutes iš abiejų pusių. Šis langas yra prieinamas šeimininkui, specialistui ir administratoriui, tačiau yra apribojamos funkcijos pagal rolę.

![image](https://user-images.githubusercontent.com/49523194/128635405-38a70648-4738-401d-9f32-151987b8b3a8.png)

9 pav. Konsultacijos lango prototipas


Paslaugos lango prototipe (žr. 10 pav.) pateikiami duomenys apie sistemoje teikiamas paslaugas, kuriame yra matomas pavadinimas ir kaina. Šis langas yra prieinamas administratoriui.

![image](https://user-images.githubusercontent.com/49523194/128635406-d6a986e9-5420-4a4b-8ee7-b7603380e74f.png)

10 pav. Paslaugos lango prototipas
 
 
Paslaugos pridėjimo formos lango prototipe (žr. 11 pav.) pateikiami duomenų įvedimo laukai: pavadinimas, kaina ir aprašymas, kuriuos reikia užpildyti norint sukurti naują paslaugą. Šis langas yra prieinamas administratoriui.

![image](https://user-images.githubusercontent.com/49523194/128635409-c9b54815-6a01-4e67-b5a7-d9bec5adc564.png)

11 pav. Paslaugos pridėjimo formos lango prototipas


Paslaugos redagavimo formos lango prototipe (žr. 12 pav.) pateikiama pasirinktos paslaugos informacija: pavadinimas, kaina, aprašymas. Administratorius gali pakoreguoti paslaugos informaciją. Šis langas yra prieinamas administratoriui.

![image](https://user-images.githubusercontent.com/49523194/128635410-5e5f4a8b-e2ae-41bb-8ad3-1e2e85812e08.png)

12 pav. Paslaugos redagavimo formos lango prototipas
 
 
Rūšys lango prototipe (žr. 13 pav.) pateikiama informacija apie sistemoje egzistuojančias rūšis, galima pridėti ir pakeisti pavadinimą pasitelkiant formos langus. Šis langas yra prieinamas administratoriui.

![image](https://user-images.githubusercontent.com/49523194/128635413-96e3edd6-a9e1-415d-9de7-ea93d5394826.png)

13 pav. Rūšys lango prototipas


Darbuotojai lango prototipe (žr. 14 pav.) atvaizduojami darbuotojai, kuriems yra suteikta teisė naudotis sistemos specialisto funkcijomis, pateikiama informacija: vardas, pavardė, telefono numeris, elektroninis paštas, pareigos. Šis langas yra prieinamas administratoriui.

![image](https://user-images.githubusercontent.com/49523194/128635416-e3509256-e225-4931-836c-02b679669c82.png)

14 pav. Darbuotojai lango prototipas
 
 
Darbuotojo pridėjimo formos lango prototipe (žr. 15 pav.) pasirenkamas darbuotojas, įvedamos pareigos, darbo laikas ir papildomo pastabos, pasirenkamos paslaugos, kurias darbuotojas atliks.  Šis langas yra prieinamas administratoriui.

![image](https://user-images.githubusercontent.com/49523194/128635417-7a87724b-9e7e-4788-8018-141e3c589e85.png)

15 pav. Darbuotojo pridėjimo/redagavimo formos lango prototipas
 
 
Kalendoriaus lango prototipe (žr. 16 pav.) pateikiama specialisto artėjančių vizitų darbotvarkė savaitės arba dienos formatu, taip pat galima peržiūrėti informaciją sąrašo formatu. Specialistas gali pasirinkti ir peržiūrėti informaciją pagal jo pasirinktą datą. Šis langas yra prieinamas specialistui.

![image](https://user-images.githubusercontent.com/49523194/128635551-b997e3b6-45d3-437a-b475-8cbb5f13248f.png)


16 pav. Kalendoriaus lango prototipas


Kalendoriaus lango prototipe (žr. 17 pav.) pateikiami pasirinkto vizito detalūs duomenys, taip pat specialistas įveda istorijos duomenis: savijauta, svoris, nustatyta, paskirtas gydymas ir komentarai, jeigu reikia įvedamas skiepo pavadinimas.

![image](https://user-images.githubusercontent.com/49523194/128635552-ad5abde0-9d55-4722-85d8-4718e1ccc32b.png)

17 pav. Kalendoriaus vizito patvirtinimo formos lango prototipas
 
 
Rezervacijų priėmimo lango prototipe (žr. 18 pav.) pateikiami visi naujai užregistruoti šeimininkų vizitai, kurie dar nėra patvirtinti jokio specialisto, ir jeigu šeimininko pasirinkta paslaugą gali atlikti specialistas.

![image](https://user-images.githubusercontent.com/49523194/128635557-ed9d09b1-0d30-4862-abf8-fb02a37cdef4.png)

18 pav. Rezervacijų priėmimo formos lango prototipas


Rezervacijų priėmimo patvirtinimo lango prototipe (žr. 19 pav.) pateikiami pasirinkto vizito detalūs duomenys, taip pat specialistas gali pakeisti susitikimo datą, laiką ir pridėti pastabas. Tuomet patvirtinama arba atšaukiama pagal poreikį.

![image](https://user-images.githubusercontent.com/49523194/128635559-4bd23688-7657-4ab2-a141-6b6a93a956b3.png)

19 pav. Rezervacijų priėmimo patvirtinimo formos lango prototipas
 
 
Rezervacijų peržiūros lango prototipe (žr. 20 pav.) pateikiami visi specialistui priklausantys patvirtinti ir atlikti vizitai.

![image](https://user-images.githubusercontent.com/49523194/128635566-07474225-0e97-4183-bf03-2812fe933353.png)

20 pav. Rezervacijų peržiūros formos lango prototipas


Rezervacijų peržiūros įrašo lango prototipe (žr. 21 pav.) pateikiami pasirinkto vizito detalūs duomenys: vardas, pavardė, telefono numeris, gyvūnas, čipas, paslauga, savijauta, svoris, nustatyta, paskirtas gydymas ir komentarai, skiepo pavadinimas.

![image](https://user-images.githubusercontent.com/49523194/128635569-13be7c93-6bc3-4864-9a06-696ee1b86a59.png)

21 pav. Rezervacijų peržiūros įrašo formos lango prototipas
