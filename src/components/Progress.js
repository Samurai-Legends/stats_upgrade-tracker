import { useCallback, useEffect, useMemo, useState } from "react";
import { Progress as ProgressBar } from "antd";
import axios from "axios";

import list from "../list.json";

import styles from "./Progress.module.css";

/**
 * A component that shows the progress in a circular display
 * @returns Progress Component
 */
function Progress() {
    const [actualGenerated, setActualGenerated] = useState([]);

    /**
     * A function that gets the actual generated nfts
     */
    const getActualGenerated = useCallback(async () => {
        const { data } = await axios.get(`https://api.samurailegends.io/v3/metadata/samurai?ids=${list.join(",")}`);
        const generated = data.filter((d) => d.attributes.some((a) => a.trait_type === "Generation" && a.value === "imperialWarlord"));
        setActualGenerated(generated);
    }, []);

    /** A variable that gets the last 9 nfts */
    const lastNfts = useMemo(() => actualGenerated.slice(actualGenerated.length - 10, actualGenerated.length - 1).reverse(), [actualGenerated])

    /** A variable that calculates the percentage based on the actual generated nfts compared to their maximum */
    const percentage = useMemo(() => Math.round((100 / 500) * actualGenerated.length), [actualGenerated]);

    /** A variable that determines the width of the progress bar to fit the screen */
    const width = useMemo(() => Math.min(Math.round((window.innerWidth / 100) * 75), 400), []);

    /** A hook that calls the function on load and every 60 seconds */
    useEffect(() => {
        getActualGenerated();
        const interval = setInterval(getActualGenerated, 60000)
        return () => clearInterval(interval);
    }, [getActualGenerated]);


    return (
        <>
            <ProgressBar
                type="circle"
                percent={percentage}
                strokeColor="#ffddae"
                trailColor="rgba(255,221,174,0.2)"
                width={width}
                className={styles.progressCircle}
            />
            <div className={styles.display}>
                {lastNfts.map(n => (
                    <div key={n.id}>
                        <span>{n.id}</span>
                        <img src={n.image} alt={n.id} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Progress;
