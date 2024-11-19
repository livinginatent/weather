/* 'use client'
import Image from "next/image";
import React, { useEffect } from "react";

const TomorrowWidget = () => {
     
  useEffect(() => {
    const scriptId = "tomorrow-sdk";

    const loadScript = () => {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";
      script.async = true;

      // Once the script is loaded, initialize the widget
      script.onload = () => {
        if (window.__TOMORROW__) {
          window.__TOMORROW__.renderWidget();
        }
      };

      document.body.appendChild(script);
        const pollutantTitle = document.querySelector(
          ".air-pollution-widget-base__title--D6wL"
        );
        console.log(pollutantTitle, "123");
    };

    // Check if the script is already loaded
    if (!document.getElementById(scriptId)) {
      loadScript();
    } else if (window.__TOMORROW__) {
      window.__TOMORROW__.renderWidget();
    }
  }, []);

  return (
    <div
      className="tomorrow"
      data-location-id="008052"
      data-language="EN"
      data-unit-system="METRIC"
      data-skin="light"
      data-widget-type="aqiPollutant"
      style={{ paddingBottom: "22px", position: "relative" }}
    >
      <a
        href="https://www.tomorrow.io/weather-api/"
        rel="nofollow noopener noreferrer"
        target="_blank"
        style={{
          position: "absolute",
          bottom: 0,
          transform: "translateX(-50%)",
          left: "50%",
        }}
      >
        <Image
          alt=""
          src="https://weather-website-client.tomorrow.io/img/powered-by.svg"
          width="250"
          height="18"
        />
      </a>
    </div>
  );
};

export default TomorrowWidget;
 */