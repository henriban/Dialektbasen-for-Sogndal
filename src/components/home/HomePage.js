import React from 'react';

import '../../styles/home.scss';

class Home extends React.Component {

    playAudio(urlString){
        let url = require("../../static/" + urlString);
        let audio = new Audio(url);
        audio.play();
    }

    generateAudioSpan(word, url){
        return( <span className="playAudio" onClick={() => this.playAudio(url)}> {word} <img src="./volume-icon.svg" alt="#"/></span> );
    }

    render(){

        return(
            <div>
                <div className="startPageImageContainer">
                    <img className="startPageImage" src="logo_gjennomsiktig.png" alt="sogndal_by_night" />
                    {/*<img className="logo" src="#" alt="logo"/>*/}
                </div>

                <div className="about" >

                    <h2 name="kva">Kva finn du i denne basen?</h2>

                    <ul>
                        <li>Her er samtalesnuttar med sogndøler i ulike aldrar frå opptak gjorde i
                            1996, 2001, 2016 og 2017.</li>
                        <li>Opptaka er redigerte og lagra som lydsnuttar på mellom 2 – 4 minutt.</li>
                        <li>Kvart lydopptak er som oftast ein samtale mellom to personar og ein
                            intervjuar.</li>
                        <li>Personane på opptaka snakkar om fortid, notid og framtid i Sogndal, men
                            også om kva som etter deira syn kjenneteiknar bygda.</li>
                    </ul>

                    <h2 name="kvifor">Kvifor finst denne basen?</h2>

                    <ul>
                        <li>Etter å ha gjort mange dialektopptak med mange sogndøler er det eit
                            ønskemål å gje noko tilbake til innbyggjarane i bygda.</li>
                        <li>Alle som vil kan lytta til og bruka basen, men han er også utforma med
                            tanke på pedagogisk bruk og som ein liten forskingsbase for elevar som
                            arbeider med talemål.</li>
                        <li>Elevar på vidaregåande har vore ei særleg tilsikta målgruppe, og eit
                            ønskemål er å kunna gje dei eit lite språkdykk i talemålet i Sogndal i eit
                            100-årsperspektiv.</li>
                    </ul>

                    <h2 name="korleis">Korleis kan du bruka denne basen?</h2>

                    <ul>
                        <li>Du kan berre kosa deg og lytta til opptaka.</li>
                        <li>Du kan leggja merke til kva personane seier og samanlikna utviklinga i
                            skule, fritid og oppvekst i Sogndal gjennom ca. 100 år (kulturhistorie).</li>
                        <li>Du kan sortera personane ut frå sosiale bakgrunnsvariablar.</li>
                        <li>Du kan gjera analysar av språklege trekk og kombinera desse med dei
                            sosiale bakgrunnsvariablane (sosiolingvistikk).</li>
                        <li>Du kan laga enkel statistikk.</li>
                    </ul>

                    <p>
                        Alle lydopptaka er transkriberte, dvs. at lyden er overført til tekst. Lydopptaka
                        er nedteikna på nynorsk. Bøyingsformer og ordval er difor så langt det let seg
                        gjera på nynorsk. Det vil likevel finnast avvik frå nynorsknorma, t.d. vil uttrykket <i>i hvert fall</i>,
                        og bruken av <i>då</i> og <i>når</i> avvika frå norma.
                    </p>

                    <h2 name="eksempel">Eksempel på trekk du kan analysera:</h2>

                    <p>
                        I dei aller fleste dialektsnuttane vil du finna seks språklege trekk (på
                        fagspråket kalla <i>språklege variablar</i>) som går att. Viss du klikkar på eit ord
                        som har dette språktrekket, vil du få opp ein boks der du sjølv må lytta deg
                        fram til det rette alternativet, (dvs. kva <i>variant</i> av <i>variabelen</i>) du høyrer. Du
                        kan stoppa og høyra om att mange gonger viss du er usikker.
                    </p>

                    <p>Dei seks merkte språklege variablane er:</p>

                    <ol>
                        <li>Infinitiv</li>
                        <li>Diftongering av gamalnorsk lang a, <i>á</i></li>
                        <li>Bunden form eintal av sterke hokjønnsord og bunden form fleirtal av
                            inkjekjønnsord</li>
                        <li>Bunden form fleirtal av hankjønnsord og hokjønnsord <i>–ane/ene</i></li>
                        <li>Segmentering av <i>dl</i></li>
                        <li>Differensiering av <i>rn</i></li>
                    </ol>

                    <p>Her er ei hjelpeliste med lyttedøme til alternativa:</p>

                    <ol>
                        <li>
                            Infinitiv <br/>
                            Eksempelord: å finna <br/>
                            Variantar: a-infinitiv {this.generateAudioSpan("<finna>", "a-infinitiv.mp3" )} – e-infinitiv {this.generateAudioSpan("<finne>", "e-infinitiv.mp3" )} – anna
                        </li>
                        <li>
                            Diftongering av gamalnorsk lang a, <i>á</i> <br/>
                            Eksempelord: båt <br/>
                            Variantar: {this.generateAudioSpan("<ao-lyd>", "ao-lyd.mp3" )} – {this.generateAudioSpan("<å-lyd>", "å-lyd.mp3" )} – anna
                        </li>
                        <li>
                            Bunden form eintal av sterke hokjønnsord og bunden form fleirtal av
                            inkjekjønnsord <br/>
                            Eksempelord: bygda, husa <br/>
                            Variantar: i-ending {this.generateAudioSpan("<bygdi>", "i-ending hokjønn.mp3" )} {this.generateAudioSpan("<husi>", "i-ending inkjekjønn.mp3" )}  - a-ending {this.generateAudioSpan("<bygda>", "a-ending hokjønn.mp3" )} {this.generateAudioSpan("<husa>", "a-ending inkjekjønn.mp3" )} - anna
                        </li>
                        <li>
                            Bunden form fleirtal av hankjønnsord og hokjønnsord <i>–ane/ene</i><br/>
                            Eksempelord: stolane, bøkene <br/>
                            Variantar: {this.generateAudioSpan("-adn", "adn-ending.mp3" )}/{this.generateAudioSpan("edn", "edn-ending.mp3" )} – {this.generateAudioSpan("-ane", "ane-ending.mp3" )}/{this.generateAudioSpan("ene", "ene-ending.mp3" )} – anna
                        </li>
                        <li>
                            Segmentering av <i>dl</i> <br/>
                            Eksempelord: kalla <br/>
                            Variantar: {this.generateAudioSpan("-dl", "dl.mp3" )} – {this.generateAudioSpan("-ll", "ll.mp3" )} - anna
                        </li>
                        <li>
                            Differensiering av <i>rn</i> <br/>
                            Eksempelord: gjerne <br/>
                            Variantar: {this.generateAudioSpan("-dn", "dn.mp3" )} – {this.generateAudioSpan("-rn", "rn.mp3" )} - anna
                        </li>
                    </ol>
                    <p>
                        For alle dei seks språklege variablane vil det altså vera tre variantar (alternativ)
                        å velja mellom. Alternativet <i>anna</i> kan du velja dersom du anten ikkje oppfattar
                        kven av dei to alternativa det er, dvs. er usikker, eller språkbrukaren har brukt
                        eit alternativ som avvik frå dei to andre variantane. For variabel 1 kan det t.d.
                        tenkjast at verbet ikkje får noka ending (t.d. å seia &gt; å sei), for variabel 2 kan
                        det tenkjast at språkbrukaren brukar a (t.d, skap). For variabel 3 kan det henda
                        språkbrukaren har endinga <i>-en</i> (t.d. tiden). For dei andre variablane vil <i>anna</i>
                        vera mest aktuelt som alternativ viss du ikkje oppfattar kva språkbrukarane
                        seier.
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;