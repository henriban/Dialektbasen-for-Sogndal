import React from 'react';

import '../../styles/home.scss';

let style = {
    color: "red"
};

class Sociolinguistics extends React.Component {

    redWord(word){
        return <span style={style}>{word}</span>
    }

    bracketWord(word){
        let bracketWord = "<" + word + ">";
        return this.redWord(bracketWord);
    }

    render(){
        return (
            <div>
                <div className="about">
                    <h1>Kva er sosiolingvistikk?</h1>
                    <p>I sosiolingvistikken er ein oppteken av språket (jf. -lingvistikk) og korleis det
                        varierer sosialt (jf sosio-) i eit samfunn. Ein prøver såleis å forklara variasjonen
                        i språket med ulike faktorar som ligg utanfor sjølve språket.</p>
                    
                    <h2>Lydverk</h2>
                    <p>I dei aller fleste samfunn er det vanleg at ein finn språkleg variasjon.
                        Når du høyrer folk som bur på same staden som du sjølv, vil du fort 
                        oppdaga at ikkje alle snakkar akkurat på same måten. Du legg kanskje 
                        merke til at de uttalar ord eller lydar ulikt? Kanskje naboen din har {this.redWord("skarre-r")},
                        medan du har {this.redWord("rulle-r")}? Eller kanskje du seier {this.bracketWord("baot")} med ein diftong,
                        medan naboen din seier {this.bracketWord("båt")} med ein monoftong? I begge desse døma,
                        er skilnadene knytte til lydverket (fonologien) i språket.</p>

                    <h2>Bøyingsverk</h2>
                    <p>Språkskilnader kan også vera knytte til bøyingssystemet (morfologien). Kanskje du seier {this.bracketWord("boki")} og {this.bracketWord("husi")},
                        medan naboen din seier {this.bracketWord("boka")} og {this.bracketWord("husa")}? Då viser språkskilnadene til at de har ulike bøyingsendingar,
                        dvs. ulike bøyingssystem innanfor talemålet.</p>

                    <h2>Ordstilling</h2>
                    <p>Også i ordstillinga (syntaksen) kan ein finna språklege skilnader, dvs. at rekkefølgja på ledd i ei setning, kan variera. Viss du t.d. seier {this.bracketWord("Ke du heite?")},
                        og ein annan seier {this.bracketWord("Ke heite du?")}, ser du at hjå deg kjem subjektet {this.bracketWord("du")} før verbalet {this.bracketWord("heiter")}, medan den andre har verbalet før subjektet.</p>

                    <h2>Ordtilfang</h2>
                    <p>Stundom legg ein også merke til at folk på same staden brukar ulike ord (leksem).
                        Ja, kanskje er det meir vanleg for deg å seia {this.bracketWord("av og til")} enn {this.bracketWord("stundom")}, som du
                        nettopp såg i denne teksten? Då er variasjonen knytt til ordtilfanget i språket.</p>

                    <p>Alle desse ulike nivåa i språket kan ein undersøkja og kopla mot ulike sosiale faktorar
                        som t.d. alder, kjønn, utdanning, yrke, område, foreldrebakgrunn, haldningar,
                        pendlemønster, nettverk, identitet og mykje meir. Nettopp denne koplinga mellom
                        det språklege og det sosiale, og det at ein prøver å finna forklaringar til den
                        språklege variasjonen i samfunnet eller sosiale forhold, kallar me altså for sosiolingvistikk.</p>


                    <h2>Kva særmerkjer  dialekten i Sogn og i Sogndal?</h2>
                    <p>{`Sidan alle språk som er i bruk, endrar seg, vil ein også oppdaga nettopp det i den språklege variasjonen. 
                        Det ser ein lettast om ein undersøkjer språket til ulike generasjonar. Når ein ny generasjon veks opp, 
                        er det ikkje sikkert at alle språktrekka dei vaksne på staden har, vert vidareførte til neste generasjon, 
                        og dialekten vil såleis endra seg over tid. I samtida vil dermed både det eldre og det yngre språket leva 
                        jamsides og koma fram i den samla variasjonen. Slik vil det også vera i Sogndal. Spørsmålet er då kva som 
                        skal vera utgangspunktet vårt viss me skal beskriva dialekten? Dei trekka som dominerer på eit tidspunkt, 
                        kan me seia kjenneteiknar språket på staden på det aktuelle tidspunktet. Karta nedanfor viser ei idealisert 
                        form av nokre trekk som kjenneteiknar dei tradisjonelle sognemåla i høve til fjordamålet, og deretter noko 
                        som skil sogndalsdialekten frå andre sognemål.`}</p>
                    <img className="startPageImage" src="fjordamål_og_sognemål.png" alt="fjordamål_og_sognemål" style={{width: '100%'}}/>
                    <span>Figur 1: Figuren viser nokre skilje mellom tradisjonelt fjordamål og sognemål i eit kart over Nordfjord, Sunnfjord og Sogn. <a href="https://www.statistikknett.no/reiseliv/OmProfilen/regioner/14_sogn_fjordane_regioner.aspx">https://www.statistikknett.no/reiseliv/OmProfilen/regioner/14_sogn_fjordane_regioner.aspx</a></span>

                    <h2>Fjordamål</h2>
                    <p>På venstre sida av den raude streken på kartet i figur 1 ser ein nokre tradisjonelle trekk for fjordamål, dvs.
                        Ytre Sogn frå Høyanger og utover, for Sunnfjord, Nordfjord og delvis også for Jostedalen. 
                        Der vil ein finna e-infinitiv som for eksempel {this.bracketWord("vere")} og {this.bracketWord("sykle")}. Dei fleste stadene her har
                        også tradisjonelt sett hatt palatalisering (j-klang) i {this.redWord("lang l")} og {this.redWord("n")} (ll og nn i skrift)  både
                        i trykksterk og trykklett stilling, t.d.  i ord som {this.bracketWord("alle")} og {this.bracketWord("mennene")}. Både dei sterke og
                        dei svake hokjønnsorda får i dette området ending på {this.redWord("-a")} i bunden form eintal, t.d. {this.bracketWord("boka")}
                        (sterkt) og {this.bracketWord("stova")} (svakt).</p>
                    
                    <h2>Sognemål</h2>
                    <p>På høgre sida av den raude streken på kartet i figur 1 ser ein nokre trekk som er tradisjonelle for sognemål, dvs.
                        Midtre Sogn med Balestrand, Vik og Sogndal og Indre Sogn med Luster, Lærdal og Årdal. Tradisjonelt har alle desse 
                        talemåla hatt a-infinitiv som for eksempel {this.bracketWord("vera")} og {this.bracketWord("sykla")}. Her finn ein ikkje palatalisering, men derimot segmentering
                        og differensiering. Når ein segmenterer, vert éin lang konsonant til to konsonantar (altså segment). I Sogn er det den 
                        lange konsonanten {this.redWord("-ll")}, som vert segmentert til {this.redWord("-dl")}. Såleis vil dette gjelda for ord som for eksempel {this.bracketWord("alle, kalla, ball")}.
                        Differensiering gjer to ulike konsonantar endå meir ulike. I Sogn blir difor {this.redWord("-rn")} uttala  som {this.redWord("-dn")} – for {this.redWord("d-en")} er meir
                        ulik {this.redWord("n-en")} enn {this.redWord("r-en")} er ulik {this.redWord("n")}. Eksempelvis vil dette skje i ord som {this.bracketWord("horn, korn, garn")}. Det same fenomenet vil også råka
                        fleirtalsbøyingane i bunden form av substantiv i hokjønn og hankjønn. Sjølv om desse i moderne norsk endar på {this.redWord("-ane")} eller {this.redWord("-ene")},
                        fanst det i gamalnorsk ein {this.redWord("r")} framom {this.redWord("n-en")} også her, slik at sogningane differensierer i ord som {this.bracketWord("mennene")} og {this.bracketWord("damene")} og uttalar
                        dei {this.bracketWord("mennedn")} og {this.bracketWord("damedn")}.</p>

                    <img className="startPageImage" src="talemålet.png" alt="talemålet" style={{width: '100%'}}/>
                    <span>Figur 2: Figuren viser kart over Ytre Sogn (lilla), Midtre Sogn (grøn) og Indre Sogn (oransje).</span>

                    <h2>Talemålet i Midtre Sogn</h2>
                    <p>Kommunane Balestrand, Vik, Aurland, Leikanger og Sogndal har ein del språktrekk sams som gjer at me kan skilja desse områda ut
                        som midtresognsmål. For det første har dei tradisjonelt hatt diftonguttale av {this.bracketWord("i, u, y, o")}. Me kan då høyra ei vokalisk gliding
                        mellom to vokalar i ord som {this.bracketWord("bil, bur, syr, stor")}, slik at uttalen vert nærast {this.bracketWord("beil, biur, søyr, stour")}. For det andre har dei
                        i dette området ulik ending i bunden form av sterke og svake hokjønnssubstantiv. Bunden form eintal av det sterke substantivet {this.bracketWord("bok")},
                        får ending på {this.redWord("-i")}, men med diftongert uttale høyrest det ut som {this.redWord("-ei")} og blir til {this.bracketWord("boukei")}. Dei svake hokjønnssubstantiva
                        endar derimot på ein ao-lyd. Eksempel på dette er substantivet {this.bracketWord("ei stova")} som då vert uttala {this.bracketWord("stovao")} i bunden form eintal. Når
                        endingane er ulike alt etter om hokjønnsorda er sterke eller svake, snakkar me om delt hokjønnsbøying. Det tredje målmerket ein 
                        kan seia skil midtresognsmål frå indresognsmål, er at ein i Midtre Sogn uttalar 1. person personleg pronomen i eintal som {this.bracketWord("eg")}
                        med ein tydeleg {this.redWord("g-lyd")} og fleirtal som {this.bracketWord("mi")} med ein trong {this.redWord("i-lyd")}.</p>

                    <h2>Talemålet i Indre Sogn</h2>
                    <p>Dei tre kommunane Lærdal, Årdal og Luster (med unntak av Jostedalen), står då att som indresognsmål. Dei har i motsetnad til
                        midtresognsmåla monoftongisk uttale av {this.bracketWord("i, u, y, o")}, og då vert orda {this.bracketWord("bil, bur, syr, stor")} uttala med dei lydane me skriv. Desse
                        talemåla har også delt bøying i bunden form eintal av hokjønnssubstantiv, men dei sterke endar på monoftongen {this.redWord("-i")}, t.d. {this.bracketWord("boki")}, og
                        dei svake på monoftongen {this.redWord("-a")}, t.d. {this.bracketWord("stova")}. Luster er her eit unntak ved at også lustringane  brukar ein {this.redWord("ao-lyd")} i dei svake {this.bracketWord("stovao")}
                        slik det er i midtresognsmåla.  Når det gjeld dei personlege pronomena, vert første person eintal i Indre Sogn uttala som {this.bracketWord("e")} og
                        fleirtal som {this.bracketWord("me")}.</p>

                    <h2>Sogndalsdialekten</h2>
                    <p>Finst det oppi alle desse fellestrekka noko som er særeige for talemålet i Sogndal? Nokre sogndalstrekk er sams for fleire bygder,
                        men skil seg frå andre. Tradisjonelt har det vore ein del meir palatalisering av {this.redWord("k-lydar")} og {this.redWord("g-lydar")} (velarar) i dei andre
                        midtresognskommunane enn i Sogndal. Medan dei andre kommunane kan ha {this.bracketWord("bokji")} og {this.bracketWord("ingjen")}, vil ein i Sogndal helst
                        høyra {this.bracketWord("boki")} og {this.bracketWord("ingen")} utan ein {this.redWord("j-haldig")} (palatalisert) lyd. I Sogndal er det elles typisk
                        at ein høyrer ein {this.redWord("ø-lyd")} frå det som i norrønt var ein kort {this.redWord("y-lyd")}. Såleis vil ein t.d. i Sogndal kunna seia {this.bracketWord("søste, bøgd")},
                        medan ein i Vik høyrer {this.bracketWord("syste, bygd")} og {this.bracketWord("suste, bugd")} på
                        Leikanger. I sogndalsdialekten er formene {this.bracketWord("heure, kjeure")} vanlege der ein gjerne i Aurland, Vik og Balestrand høyrer {this.bracketWord("høyrde, køyrde")} i
                        preteritum av verba {this.bracketWord("køyra")} og {this.bracketWord("høyra")}. Medan Balestrand og Vik også har {this.redWord("-adne")} og {this.redWord("-edne")} som i {this.bracketWord("baotadne")} og {this.bracketWord("elvadne")},
                        lèt ein desse endingane ha berre éi staving, dvs. {this.redWord("-adn")} og {this.redWord("-edn")} som i {this.bracketWord("baotadn")} og {this.bracketWord("elvadn")}, i Leikanger, Aurland og Sogndal.
                        Til sist kan me nemna at sogndalsdialekten tradisjonelt sett har ein trong i-lyd i supinum av ein del sterke verb der dei andre 
                        midtresognsmåla får {this.redWord("-e")}. Sogndølene vil såleis kunna seia at dei har {this.bracketWord("ite middag")}, {this.bracketWord("lise ei bok")}, {this.bracketWord("dripe ein veps")} og {this.bracketWord("lige i ro")}.</p>

                </div>
            </div>
        );
    }
}

export default Sociolinguistics;