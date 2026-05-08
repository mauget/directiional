import React, {type ChangeEvent} from "react";
import './App.css'
import SimpleCompass from './components/SimpleCompass.tsx';

function App() {
    const [mapHeading, setMapHeading] = React.useState<number>(45);

    return (
        <section>
            <header>
                <h2>{
                    `Pointing to ${mapHeading.toFixed(0)} degrees`}
                </h2>
                <label>
                    New compass heading:&nbsp;
                    <input type="number" value={mapHeading.toFixed(0)}
                           onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                               setMapHeading((Number(evt.target.value) + 360) % 360);
                           }}/>
                </label>
            </header>
            <br/>
            <div>
                <SimpleCompass mapHeading={mapHeading} setMapHeading={setMapHeading}/>
            </div>
        </section>
    )
}

export default App
