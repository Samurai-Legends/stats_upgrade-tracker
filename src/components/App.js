import Progress from "./Progress";

import styles from "./App.module.css";

/**
 * A component which contains the layout of this page
 * @returns App Component
 */
function App() {
  return (
    <main className={styles.container}>
      <h1>Imperial Warlords</h1>
      <h2>view Upgrade Progress (live)</h2>
      <Progress />
    </main>
  );
}

export default App;
