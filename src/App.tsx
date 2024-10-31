/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./App.css";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [des, setDes] = useState<any>(null);
  const readData = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true });
      chrome.scripting
        .executeScript<string[], void>({
          target: { tabId: tab.id! },
          args: [des],
          func: () => {
            try {
              const element = document.querySelector(
                "body > div.air3-fullscreen-element > div > div.air3-fullscreen-container.is-scrolled-bottom > div > div > div.air3-slider-body > div > div > div > div.job-details-card.d-flex.gap-0.air3-card.air3-card-outline.p-0.slider > div > section:nth-child(2) > div > p.text-body-sm"
              ) as HTMLElement;
              console.log(element);
              return element ? element.innerHTML : "no Data";
            } catch (err: any) {
              setDes(err.message);
            }
          },
        })
        .then((res) => {
          setDes(res[0].result);
        });
    } catch (err: any) {
      setDes(err.message);
    }
  };

  // const readData = () => {
  //   chrome.runtime.sendMessage({ action: "getDescription" }, (response) => {
  //     setDes(response.description);
  //   });
  // };

  return (
    <>
      <button onClick={readData}>Read Description</button>
      <p>{des}</p>
    </>
  );
}

export default App;
